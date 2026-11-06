/**
 * Pre-renders every route to static HTML after `vite build`.
 *
 * Input:  dist/index.html (client build template) and dist-ssr/entry-server.js
 *         (server build of src/entry-server.tsx).
 * Output: dist/<route>/index.html for every page, dist/404.html,
 *         dist/admin/index.html, dist/index.html (redirects to /en/),
 *         dist/sitemap.xml, dist/robots.txt and dist/llms.txt.
 *
 * Content comes from the CMS API when VITE_API_URL is set at build time,
 * otherwise from the built-in defaults. Pages edited in the admin after a
 * deploy still update for visitors immediately, but search engines see the
 * new text only after the next build + deploy.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const ssrEntry = (await fs.readdir(ssrDir)).find((f) =>
  /^entry-server\.m?js$/.test(f)
);
const server = await import(pathToFileURL(path.join(ssrDir, ssrEntry)).href);

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
for (const marker of [
  '<!--app-head-->',
  '<!--app-html-->',
  '<!--app-seed-->',
]) {
  if (!template.includes(marker)) throw new Error(`index.html lacks ${marker}`);
}

// Search engines index exactly what is rendered here, so never silently fall
// back to the built-in sample content when the live CMS cannot be reached.
const cms = await server.checkCms();
if (cms === 'failed' && process.env.ALLOW_DEFAULT_CONTENT !== '1') {
  throw new Error(
    `Could not load content from the CMS API (${server.API_BASE}). ` +
      'Check the internet connection and VITE_API_URL in .env.local, then build again. ' +
      '(Set ALLOW_DEFAULT_CONTENT=1 to build with the built-in content anyway.)'
  );
}
if (cms === 'unconfigured') {
  console.warn(
    '\n⚠  VITE_API_URL is not set: pages are pre-rendered from the built-in default content, not the live CMS.\n'
  );
} else {
  console.log(
    `content: ${cms === 'ok' ? `live CMS (${server.API_BASE})` : 'built-in defaults (ALLOW_DEFAULT_CONTENT=1)'}`
  );
}
if (
  server.API_BASE.includes('localhost') ||
  server.API_BASE.includes('127.0.0.1')
) {
  console.warn(
    `\n⚠  VITE_API_URL points at ${server.API_BASE}. Do not deploy this build: set the live API URL in .env.local.\n`
  );
}

// OG_EXPORT=<file>: write guide titles for scripts/og-images.py, then stop.
if (process.env.OG_EXPORT) {
  await fs.writeFile(
    process.env.OG_EXPORT,
    JSON.stringify(await server.guideTitles(), null, 2)
  );
  console.log(`guide titles written to ${process.env.OG_EXPORT}`);
}

const legacy = await server.legacyIdMap();
const baseTemplate = template.replace(
  /\/\*ICM_LEGACY\*\/\s*\{\s*p:\s*\{\},\s*a:\s*\{\}\s*\}/,
  server.safeJson(legacy)
);
if (baseTemplate === template)
  throw new Error('legacy map placeholder not found');

const fill = ({ lang, head, html = '', seed = '' }) =>
  baseTemplate
    .replace('<html lang="en">', `<html lang="${lang}">`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', () => html)
    .replace('<!--app-seed-->', () => seed);

const write = async (urlPath, content) => {
  const file = urlPath.endsWith('.html')
    ? path.join(dist, urlPath)
    : path.join(dist, urlPath, 'index.html');
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, content);
};

const today = new Date().toISOString().slice(0, 10);
const sitemapEntries = [];
const pages = await server.listSitePaths();
const seen = new Set();
for (const { path: p } of pages) {
  if (seen.has(p)) {
    throw new Error(
      `Two pages share the address ${p}. Give one of them a different "Web address (slug)" in the admin.`
    );
  }
  seen.add(p);
}
let count = 0;

for (const { path: urlPath, lastmod } of pages) {
  const page = await server.renderPage(urlPath);
  if (page.status !== 200) {
    throw new Error(`${urlPath} resolved to ${page.status}`);
  }
  await write(
    urlPath,
    fill({
      lang: page.lang,
      head: page.head,
      html: page.html,
      seed: page.seedScript,
    })
  );
  count += 1;
  if (!page.noindex && page.canonical) {
    sitemapEntries.push({
      loc: server.SITE_ORIGIN + page.canonical,
      lastmod:
        lastmod && /^\d{4}-\d{2}-\d{2}/.test(lastmod)
          ? lastmod.slice(0, 10)
          : today,
      alternates: page.alternates,
    });
  }
}

// 404 page: GitHub Pages serves it, with status 404, for any unknown path.
const notFound = await server.renderPage('/th/404/');
await write(
  '404.html',
  fill({
    lang: notFound.lang,
    head: notFound.head,
    html: notFound.html,
    seed: notFound.seedScript,
  })
);

// Admin: client-only, never indexed.
const admin = await server.renderHeadOnly('/admin/');
await write('admin', fill({ lang: admin.lang, head: admin.head }));

// Bare domain: the inline script redirects to /th/ (or the visitor's saved
// language); meta refresh to /th/ as a fallback without JavaScript.
const rootHead = await server.renderHeadOnly('/');
await write(
  'index.html',
  fill({
    lang: rootHead.lang,
    head: `${rootHead.head}\n    <meta http-equiv="refresh" content="0; url=/th/" />`,
    html: '<p style="font-family:sans-serif;padding:24px"><a href="/th/">Infinity CoolMaster (ไทย)</a> · <a href="/en/">English</a></p>',
  })
);

// sitemap.xml with hreflang alternates.
const xmlEsc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...sitemapEntries.map((entry) => {
    const links = Object.entries(entry.alternates).map(
      ([lang, p]) =>
        `    <xhtml:link rel="alternate" hreflang="${lang}" href="${xmlEsc(server.SITE_ORIGIN + p)}"/>`
    );
    if (entry.alternates.en) {
      links.push(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEsc(server.SITE_ORIGIN + entry.alternates.en)}"/>`
      );
    }
    return [
      '  <url>',
      `    <loc>${xmlEsc(entry.loc)}</loc>`,
      `    <lastmod>${entry.lastmod}</lastmod>`,
      ...links,
      '  </url>',
    ].join('\n');
  }),
  '</urlset>',
  '',
].join('\n');
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);

// robots.txt: open to search engines and to AI assistants we want citing us.
const bots = [
  'Googlebot',
  'Bingbot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
];
const robots = [
  ...bots.flatMap((bot) => [
    `User-agent: ${bot}`,
    'Allow: /',
    'Disallow: /admin/',
    '',
  ]),
  'User-agent: *',
  'Allow: /',
  'Disallow: /admin/',
  '',
  `Sitemap: ${server.SITE_ORIGIN}/sitemap.xml`,
  '',
].join('\n');
await fs.writeFile(path.join(dist, 'robots.txt'), robots);

// llms.txt (index) and llms-full.txt (all text) for AI assistants.
const llms = await server.buildLlmsFiles();
await fs.writeFile(path.join(dist, 'llms.txt'), llms.short);
await fs.writeFile(path.join(dist, 'llms-full.txt'), llms.full);

await fs.rm(ssrDir, { recursive: true, force: true });
console.log(
  `prerendered ${count} pages, ${sitemapEntries.length} in sitemap.xml`
);
