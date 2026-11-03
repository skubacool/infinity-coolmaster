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
