import { Locale } from '../models/_commons/localized';
import { PageKey } from '../config/routes';
import { SiteMeta } from './types';
import metaEn from './meta.en';
import metaTh from './meta.th';

export const siteMeta = (locale: Locale): SiteMeta =>
  locale === 'th' ? metaTh : metaEn;

/**
 * Pages whose copy is written and which are ready for search engines.
 * Every other page in PAGE_KEYS is a TODO scaffold: reachable by URL, but
 * served with noindex, left out of the sitemap and not linked from menus.
 * Add a key here once both its English and Thai copy are final.
 */
export const PUBLISHED_PAGES: PageKey[] = ['savings-calculator', 'contact'];

export const isDraftPage = (key: PageKey): boolean =>
  !PUBLISHED_PAGES.includes(key);

/** Sector pages get Service structured data. */
export const SECTOR_PAGES: PageKey[] = [
  'hotels',
  'hospitals',
  'shopping-malls',
  'factories',
  'office-buildings',
  'data-centers',
];
