import { Locale } from '../models/_commons/localized';
import { SITE_ORIGIN } from '../config/routes';

/** Everything that goes into a page's <head> besides the static basics. */
export interface Head {
  lang: Locale;
  title: string;
  description: string;
  /** Path of the canonical URL (null for pages that are not indexed). */
  canonical: string | null;
  /** Same page in each language, for hreflang (path per locale). */
  alternates: Partial<Record<Locale, string>>;
  /** Language the x-default alternate points to. */
  xDefault?: Locale;
  noindex: boolean;
  ogType: 'website' | 'article';
  ogImage: string;
  jsonLd: Record<string, unknown>[];
}

const OG_LOCALE: Record<Locale, string> = { en: 'en_US', th: 'th_TH' };

const esc = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/** JSON for a <script> block: "</script" and U+2028/2029 can't break out. */
export const safeJson = (value: unknown): string =>
  JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

export const absoluteUrl = (path: string): string =>
  /^https?:\/\//.test(path) ? path : `${SITE_ORIGIN}${path}`;

/**
 * The <head> tags managed per page. Every tag carries data-seo so the browser
 * can swap them on client-side navigation (see applyHead).
 */
export const headToHtml = (head: Head): string => {
  const tags: string[] = [
    `<title data-seo>${esc(head.title)}</title>`,
    `<meta data-seo name="description" content="${esc(head.description)}" />`,
  ];
  if (head.noindex) {
    tags.push(`<meta data-seo name="robots" content="noindex, follow" />`);
  }
  if (head.canonical) {
    tags.push(
      `<link data-seo rel="canonical" href="${esc(absoluteUrl(head.canonical))}" />`
    );
    for (const [locale, path] of Object.entries(head.alternates)) {
      tags.push(
        `<link data-seo rel="alternate" hreflang="${locale}" href="${esc(absoluteUrl(path))}" />`
      );
    }
    const xDefault = head.alternates[head.xDefault ?? 'en'];
    if (xDefault) {
      tags.push(
        `<link data-seo rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(xDefault))}" />`
      );
    }
  }
  const url = head.canonical ? absoluteUrl(head.canonical) : null;
  tags.push(
    `<meta data-seo property="og:site_name" content="Infinity CoolMaster" />`,
    `<meta data-seo property="og:type" content="${head.ogType}" />`,
    `<meta data-seo property="og:title" content="${esc(head.title)}" />`,
    `<meta data-seo property="og:description" content="${esc(head.description)}" />`,
    `<meta data-seo property="og:locale" content="${OG_LOCALE[head.lang]}" />`,
    `<meta data-seo property="og:image" content="${esc(head.ogImage)}" />`,
    `<meta data-seo property="og:image:width" content="1200" />`,
    `<meta data-seo property="og:image:height" content="630" />`,
    `<meta data-seo name="twitter:card" content="summary_large_image" />`,
    `<meta data-seo name="twitter:title" content="${esc(head.title)}" />`,
    `<meta data-seo name="twitter:description" content="${esc(head.description)}" />`,
    `<meta data-seo name="twitter:image" content="${esc(head.ogImage)}" />`
  );
  if (url)
    tags.push(`<meta data-seo property="og:url" content="${esc(url)}" />`);
  for (const [locale, path] of Object.entries(head.alternates)) {
    if (locale !== head.lang && path) {
      tags.push(
        `<meta data-seo property="og:locale:alternate" content="${OG_LOCALE[locale as Locale]}" />`
      );
    }
  }
  for (const block of head.jsonLd) {
    tags.push(
      `<script data-seo type="application/ld+json">${safeJson(block)}</script>`
    );
  }
  return tags.join('\n    ');
};

/** Updates the live document after a client-side route change. */
export const applyHead = (head: Head): void => {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = head.lang;
  document.head
    .querySelectorAll('[data-seo]')
    .forEach((element) => element.remove());
  const template = document.createElement('template');
  template.innerHTML = headToHtml(head);
  document.head.appendChild(template.content);
};
