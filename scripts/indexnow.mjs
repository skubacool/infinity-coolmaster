/**
 * Tells Bing (and other IndexNow engines) that the site's pages changed, so
 * new and edited pages are recrawled within hours instead of weeks.
 *
 * Run it a few minutes AFTER `npm run deploy`, once GitHub Pages has
 * published the new build:   npm run indexnow
 *
 * It reads dist/sitemap.xml from the last build. The key below is public by
 * design: the same value is served at https://infinitycoolmaster.com/<key>.txt
 * (public/<key>.txt), which proves we own the domain.
 */
import fs from 'node:fs/promises';

const HOST = 'infinitycoolmaster.com';
const KEY = '659415b3d611d32b253f59f76a576232';

const sitemap = await fs.readFile(
  new URL('../dist/sitemap.xml', import.meta.url),
  'utf8'
);
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length)
  throw new Error('No URLs in dist/sitemap.xml — run npm run build first.');

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});
console.log(
  `IndexNow: submitted ${urlList.length} URLs -> HTTP ${response.status}`
);
if (response.status >= 400) {
  console.log(await response.text());
  process.exitCode = 1;
}
