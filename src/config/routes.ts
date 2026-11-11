import { Locale } from '../models/_commons/localized';
import { Project } from '../models/project';
import { Activity } from '../models/activity';

/**
 * Every public URL of the site is built here, so links, canonical tags,
 * hreflang alternates and the sitemap always agree. All paths end with "/":
 * GitHub Pages serves /en/about/ from dist/en/about/index.html.
 */

export const LOCALES: Locale[] = ['en', 'th'];

export const SITE_ORIGIN = 'https://infinitycoolmaster.com';

/**
 * Standalone pages (sector pages, explainers, contact, team). Pages marked
 * `draft` in src/seo/pages.ts are reachable but carry noindex and stay out of
 * the sitemap and menus until their copy is written.
 */
export const PAGE_KEYS = [
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
  'team',
  'glossary',
  'chiller-efficiency-check',
  'eastern-economic-corridor',
  'cooling-contract-calculator',
  'cost-of-waiting-calculator',
  'carbon-calculator',
  'engineer-downloads',
  'privacy-policy',
] as const;

export type PageKey = (typeof PAGE_KEYS)[number];

export const isPageKey = (value: string): value is PageKey =>
  (PAGE_KEYS as readonly string[]).includes(value);

export const paths = {
  home: (locale: Locale) => `/${locale}/`,
  about: (locale: Locale) => `/${locale}/about/`,
  caseStudies: (locale: Locale) => `/${locale}/case-studies/`,
  caseStudy: (
    locale: Locale,
    project: Pick<Project, 'id' | 'slug' | 'title'>
  ) => `/${locale}/case-studies/${projectSlug(project)}/`,
  insights: (locale: Locale) => `/${locale}/insights/`,
  insight: (
    locale: Locale,
    activity: Pick<Activity, 'id' | 'slug' | 'title'>
  ) => `/${locale}/insights/${activitySlug(activity)}/`,
  page: (locale: Locale, key: PageKey) => `/${locale}/${key}/`,
  contact: (locale: Locale) => `/${locale}/contact/`,
};

/** Lower-case ASCII slug: "Grade-A Office Tower, Sathorn" -> "grade-a-office-tower-sathorn". */
export const slugify = (text: string): string =>
  text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/%/g, '-percent')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '');

const itemSlug = (item: {
  id: number;
  slug?: string;
  title: { en: string };
}) => {
  const explicit = slugify(item.slug ?? '');
  if (explicit) return explicit;
  return slugify(item.title?.en ?? '') || String(item.id);
};

export const projectSlug = (project: Pick<Project, 'id' | 'slug' | 'title'>) =>
  itemSlug(project);

export const activitySlug = (
  activity: Pick<Activity, 'id' | 'slug' | 'title'>
) => itemSlug(activity);

/** Finds an item by its slug, or by its numeric id (old /project/1 links). */
export const findBySlug = <
  T extends { id: number; slug?: string; title: { en: string } },
>(
  items: T[],
  slugOrId: string
): T | null => {
  const wanted = slugOrId.replace(/\/+$/, '');
  return (
    items.find((item) => itemSlug(item) === wanted) ??
    (/^\d+$/.test(wanted)
      ? (items.find((item) => item.id === Number(wanted)) ?? null)
      : null)
  );
};

/** Same page in the other language: /en/about/ <-> /th/about/. */
export const switchLocalePath = (pathname: string, locale: Locale): string =>
  pathname.replace(/^\/(en|th)(?=\/|$)/, `/${locale}`);

/**
 * Resolves a menu entry (stored as e.g. "/about" or "/contact") to a full,
 * trailing-slash path in the given language.
 */
export const menuPath = (locale: Locale, url: string): string => {
  const [pathPart, anchor] = url.split('#');
  const clean = pathPart.split('?')[0].replace(/^\/+|\/+$/g, '');
  const path = clean ? `/${locale}/${clean}/` : `/${locale}/`;
  return anchor ? `${path}#${anchor}` : path;
};
