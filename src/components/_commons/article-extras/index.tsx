import { useState } from 'react';

import { Locale } from '../../../models/_commons/localized';
import { siteMeta } from '../../../seo/pages';
import { trackEvent } from '../../../utils/analytics';
import { sectionId } from '../rich-text';

/** The article's answer in a few sentences: what readers and AI quote first. */
export const KeyPointsBox = (props: { locale: Locale; text?: string }) => {
  const { locale, text } = props;
  const points = (text ?? '')
    .split('\n')
    .map((line) => line.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean);
  if (!points.length) return null;
  return (
    <aside
      aria-label={siteMeta(locale).keyPointsTitle}
      className="mb-10 rounded-2xl border border-sep-pale bg-gradient-caas-soft p-6 lg:p-7 gap-y-3 flex flex-col"
    >
      <span className="text-sm font-semibold uppercase tracking-wider text-brand-green">
        {siteMeta(locale).keyPointsTitle}
      </span>
      <ul className="gap-y-2 flex flex-col pl-5 list-disc text-base lg:text-lg text-text-main">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </aside>
  );
};

/** Clickable list of the article's "## " sections (shown for 3+ sections). */
export const TableOfContents = (props: {
  locale: Locale;
  headings: string[];
}) => {
  const { locale, headings } = props;
  if (headings.length < 3) return null;
  return (
    <nav
      aria-label={siteMeta(locale).tocTitle}
      className="mb-10 rounded-2xl border border-sep-pale p-6 gap-y-3 flex flex-col"
    >
      <span className="text-sm font-semibold uppercase tracking-wider text-title-light">
        {siteMeta(locale).tocTitle}
      </span>
      <ol className="gap-y-2 flex flex-col pl-5 list-decimal text-base text-text-muted">
        {headings.map((heading, index) => (
          <li key={heading}>
            <a
              className="hover:text-brand-blue underline-offset-4 hover:underline"
              href={`#${sectionId(index)}`}
            >
              {heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

/** Share to LINE (most used in Thailand), LinkedIn, Facebook, or copy link. */
export const ShareBar = (props: {
  locale: Locale;
  url: string;
  title: string;
}) => {
  const { locale, url, title } = props;
  const meta = siteMeta(locale);
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const targets = [
    {
      method: 'line',
      label: 'LINE',
      href: `https://social-plugins.line.me/lineit/share?url=${encoded}`,
    },
    {
      method: 'linkedin',
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    },
    {
      method: 'facebook',
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
    },
  ];
  const buttonClass =
    'rounded-full border border-sep-light px-4 py-2 text-sm font-medium text-text-main hover:border-brand-blue hover:text-brand-blue transition-colors';
  return (
    <div className="mt-10 gap-3 flex flex-row flex-wrap items-center">
      <span className="text-sm font-semibold uppercase tracking-wider text-title-light mr-1">
        {meta.shareTitle}
      </span>
      {targets.map((target) => (
        <a
          key={target.method}
          className={buttonClass}
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('share', {
              method: target.method,
              item_id: url,
              content_type: 'article',
            })
          }
        >
          {target.label}
        </a>
      ))}
      <button
        type="button"
        className={buttonClass}
        onClick={() => {
          trackEvent('share', {
            method: 'copy_link',
            item_id: url,
            content_type: 'article',
          });
          navigator.clipboard?.writeText(`${title} ${url}`).then(
            () => setCopied(true),
            () => setCopied(false)
          );
        }}
      >
        {copied ? meta.linkCopied : meta.copyLink}
      </button>
    </div>
  );
};
