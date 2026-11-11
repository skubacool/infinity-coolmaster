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
export const PUBLISHED_PAGES: PageKey[] = [
  'hotels',
  'hospitals',
  'shopping-malls',
  'factories',
  'office-buildings',
  'data-centers',
  'pricing-model',
  'caas-vs-buying-chiller',
  'chiller-replacement',
  'savings-calculator',
  'measurement-verification',
  'contact',
  'glossary',
  'chiller-efficiency-check',
  'eastern-economic-corridor',
  'cooling-contract-calculator',
  'cost-of-waiting-calculator',
  'carbon-calculator',
  'engineer-downloads',
  'privacy-policy',
  'caas-fit-check',
  // 'team' — needs real names, photos, licences and LinkedIn profiles.
];

/** Explainer pages linked from the footer's resources column. */
/** Nav "Resources" dropdown: interactive tools first, then explainers. */
export const RESOURCE_TOOL_PAGES: PageKey[] = [
  'caas-fit-check',
  'savings-calculator',
  'cooling-contract-calculator',
  'chiller-efficiency-check',
  'cost-of-waiting-calculator',
  'carbon-calculator',
];
export const RESOURCE_GUIDE_PAGES: PageKey[] = [
  'pricing-model',
  'caas-vs-buying-chiller',
  'chiller-replacement',
  'measurement-verification',
  'glossary',
  'engineer-downloads',
];

export const RESOURCE_PAGES: PageKey[] = [
  'cooling-contract-calculator',
  'cost-of-waiting-calculator',
  'carbon-calculator',
  'engineer-downloads',
  'chiller-efficiency-check',
  'glossary',
  'pricing-model',
  'caas-vs-buying-chiller',
  'chiller-replacement',
  'measurement-verification',
  'savings-calculator',
];

/** Case-study sector key -> sector page. */
export const SECTOR_PAGE_BY_KEY: Record<string, PageKey> = {
  commercial: 'office-buildings',
  industrial: 'factories',
  healthcare: 'hospitals',
  hospitality: 'hotels',
  retail: 'shopping-malls',
  'data-center': 'data-centers',
};

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
  'eastern-economic-corridor',
];
