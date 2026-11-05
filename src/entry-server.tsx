import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { createStore, Provider } from 'jotai';

import App from './App';
import { applySeed, PageSeed } from './lib/seed';
import { headToHtml, safeJson } from './seo/head';
import { resolvePage, listSitePaths } from './seo/resolve';
import {
  LOCALES,
  SITE_ORIGIN,
  projectSlug,
  activitySlug,
} from './config/routes';
import { listProjects } from './apis/project';
import { listActivities } from './apis/activity';
import { loadBuiltInGuides } from './content/articles/load';
import { checkCms } from './apis/_commons/cms';
import { API_BASE } from './lib/apiClient';

export { checkCms, API_BASE };

/**
 * Build-time renderer, used by scripts/prerender.mjs (never shipped to the
 * browser). Renders one URL to HTML together with its head tags and the
 * state the browser needs to hydrate it.
 */
export const renderPage = async (url: string) => {
  const resolved = await resolvePage(url, { withSeed: true });
  const store = createStore();
  applySeed(store, resolved.seed);
  const html = renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  );
  const seed: PageSeed = { path: url, state: resolved.seed };
  return {
    html,
    status: resolved.status,
    lang: resolved.head.lang,
    noindex: resolved.head.noindex,
    canonical: resolved.head.canonical,
    alternates: resolved.head.alternates,
    head: headToHtml(resolved.head),
    seedScript: `<script>window.__ICM_SEED__=${safeJson(seed)}</script>`,
  };
};

/** Head for pages that are not pre-rendered with content (root, admin). */
export const renderHeadOnly = async (url: string) => {
  const resolved = await resolvePage(url);
  return { lang: resolved.head.lang, head: headToHtml(resolved.head) };
};

export { listSitePaths, LOCALES, SITE_ORIGIN, safeJson };

/** Built-in guide titles, for scripts/og-images.py (share images). */
export const guideTitles = async () =>
  (await loadBuiltInGuides()).map((g) => ({
    slug: g.slug,
    en: g.title.en,
    th: g.title.th,
  }));

/** Old numeric ids -> slugs, for redirecting /#/en/project/1 style links. */
export const legacyIdMap = async () => {
  const [projects, activities] = await Promise.all([
    listProjects(),
    listActivities(),
  ]);
  return {
    p: Object.fromEntries(projects.map((p) => [p.id, projectSlug(p)])),
    a: Object.fromEntries(activities.map((a) => [a.id, activitySlug(a)])),
  };
};

// ------------------------------------------------------------ llms.txt ----

const strip = (text: string): string =>
  text
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/g, '$2 ($1)')
    .replace(/<[^>]+>/g, '')
    .trim();

/**
 * llms.txt (an index for AI assistants) and llms-full.txt (every published
 * page and article as plain text, English then Thai), built from the same
 * content the site renders.
 */
export const buildLlmsFiles = async () => {
  const { siteMeta, PUBLISHED_PAGES } = await import('./seo/pages');
  const { loadPageBody } = await import('./content');
  const { paths } = await import('./config/routes');
  const { ORGANIZATION } = await import('./seo/organization');
  const activities = await listActivities();
  const facts = [
    `${ORGANIZATION.legalName} (${ORGANIZATION.legalNameTh}), DBD registration no. ${ORGANIZATION.registrationNumber}, registered January 2023, Bangkok, Thailand.`,
    `Office: ${ORGANIZATION.address.streetAddress}, ${ORGANIZATION.address.addressLocality}, ${ORGANIZATION.address.addressRegion} ${ORGANIZATION.address.postalCode}, Thailand. Phone: ${ORGANIZATION.telephone}. Email: ${ORGANIZATION.email}.`,
    'Business: Cooling-as-a-Service (chiller-as-a-service). Infinity CoolMaster designs, finances, installs, owns and operates chiller plants; clients pay for efficient cooling from the savings, with a minimum 10% energy saving guaranteed in writing and measured monthly to IPMVP. Contracts typically run 5–10 years.',
    'First project: Platinum Pro Plastic, Nikhom Phatthana, Rayong; in testing and commissioning in November 2026.',
  ];
  const short: string[] = [
    '# Infinity CoolMaster',
    '',
    '> Chiller-as-a-service (Cooling-as-a-Service) provider in Bangkok, Thailand. Website in Thai (default) and English.',
    '',
    ...facts,
    '',
    `Full text of every page and article: ${SITE_ORIGIN}/llms-full.txt`,
  ];
  const full: string[] = [
    '# Infinity CoolMaster: full site text',
    '',
    ...facts,
  ];
  for (const locale of LOCALES) {
    const meta = siteMeta(locale);
    short.push(
      '',
      `## ${locale === 'th' ? 'Thai pages' : 'English pages'}`,
      ''
    );
    full.push('', `# ${locale === 'th' ? 'ภาษาไทย' : 'English'}`, '');
    short.push(`- [${meta.home.title}](${SITE_ORIGIN}${paths.home(locale)})`);
    short.push(`- [${meta.about.title}](${SITE_ORIGIN}${paths.about(locale)})`);
    for (const key of PUBLISHED_PAGES) {
      const text = meta.pages[key];
      const url = `${SITE_ORIGIN}${paths.page(locale, key)}`;
      short.push(`- [${text.h1}](${url}): ${text.description}`);
      const body = await loadPageBody(locale, key);
      full.push(`## ${text.h1}`, `URL: ${url}`, '', text.intro, '');
      for (const section of body?.sections ?? []) {
        full.push(`### ${section.heading}`, '');
        for (const p of section.paragraphs ?? []) full.push(p, '');
        for (const b of section.bullets ?? []) full.push(`- ${b}`);
        if (section.bullets?.length) full.push('');
        if (section.table) {
          full.push(`| ${section.table.headers.join(' | ')} |`);
          for (const row of section.table.rows)
            full.push(`| ${row.join(' | ')} |`);
          full.push('');
        }
      }
      for (const term of body?.terms ?? [])
        full.push(`- **${term.term}**: ${term.definition}`);
      if (body?.terms?.length) full.push('');
      for (const faq of body?.faqs ?? [])
        full.push(`Q: ${faq.question}`, `A: ${faq.answer}`, '');
    }
    short.push(
      '',
      `## ${locale === 'th' ? 'Thai articles' : 'English articles'}`,
      ''
    );
    for (const a of activities) {
      const url = `${SITE_ORIGIN}${paths.insight(locale, a)}`;
      short.push(`- [${a.title[locale]}](${url}): ${a.excerpt[locale]}`);
      full.push(
        `## ${a.title[locale]}`,
        `URL: ${url}`,
        `Published: ${a.publishedAt}`,
        ''
      );
      if (a.keyPoints?.[locale]) {
        full.push(
          ...a.keyPoints[locale]
            .split('\n')
            .filter(Boolean)
            .map((k) => `- ${k}`),
          ''
        );
      }
      full.push(strip(a.details[locale]), '');
    }
  }
  return { short: short.join('\n') + '\n', full: full.join('\n') + '\n' };
};
