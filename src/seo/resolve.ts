import { Locale } from '../models/_commons/localized';
import { Project } from '../models/project';
import { Activity } from '../models/activity';
import { Faq } from '../models/faq';
import { Contact } from '../models/contact';
import { Seed } from '../lib/seed';
import {
  isPageKey,
  PAGE_KEYS,
  LOCALES,
  PageKey,
  paths,
  projectSlug,
  activitySlug,
  SITE_ORIGIN,
} from '../config/routes';
import { listLocalizations } from '../apis/localization';
import { listMedia } from '../apis/media';
import { findMenu } from '../apis/menu';
import { listContacts } from '../apis/contact';
import { listBenefits } from '../apis/benefit';
import { listHeroBanners } from '../apis/hero-banner';
import { listSectors } from '../apis/sector';
import {
  listLatestProjects,
  listProjects,
  findProjectSummary,
} from '../apis/project';
import { listLatestActivities, listActivities } from '../apis/activity';
import { listPartners } from '../apis/partner';
import { listProcessSteps } from '../apis/process-step';
import { listFaqs } from '../apis/faq';
import { resolveProject } from '../stores/vm-screen-project';
import { resolveActivity } from '../stores/vm-screen-activity';
import { Head, absoluteUrl } from './head';
import { siteMeta, isDraftPage, SECTOR_PAGES } from './pages';
import { pageBody } from '../content';
import { ORGANIZATION, DEFAULT_SHARE_IMAGE } from './organization';

export type RouteMatch =
  | { kind: 'root' }
  | { kind: 'admin' }
  | { kind: 'notFound'; locale: Locale }
  | { kind: 'home'; locale: Locale }
  | { kind: 'about'; locale: Locale }
  | { kind: 'caseStudies'; locale: Locale }
  | { kind: 'caseStudy'; locale: Locale; slug: string }
  | { kind: 'insights'; locale: Locale }
  | { kind: 'insight'; locale: Locale; slug: string }
  | { kind: 'page'; locale: Locale; page: PageKey };

/** Maps a pathname to the page it shows (mirrors the <Routes> in App.tsx). */
export const matchRoute = (pathname: string): RouteMatch => {
  const segments = pathname.split('/').filter(Boolean).map(decodeURIComponent);
  if (segments.length === 0) return { kind: 'root' };
  if (segments[0] === 'admin' && segments.length === 1)
    return { kind: 'admin' };
  const [first, section, slug, ...rest] = segments;
  if (first !== 'en' && first !== 'th')
    return { kind: 'notFound', locale: 'en' };
  const locale: Locale = first;
  if (rest.length) return { kind: 'notFound', locale };
  if (!section) return { kind: 'home', locale };
  if (section === 'about' && !slug) return { kind: 'about', locale };
  if (section === 'case-studies') {
    return slug
      ? { kind: 'caseStudy', locale, slug }
      : { kind: 'caseStudies', locale };
  }
  if (section === 'insights') {
    return slug
      ? { kind: 'insight', locale, slug }
      : { kind: 'insights', locale };
  }
  if (!slug && isPageKey(section))
    return { kind: 'page', locale, page: section };
  return { kind: 'notFound', locale };
};

const truncate = (text: string, max: number): string => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ') > 0 ? cut.lastIndexOf(' ') : cut.length)}…`;
};

const BRAND_SUFFIX = ' | Infinity CoolMaster';

/**
 * Picks the first title that fits in 60 characters: the full one with the
 * brand, then the plain one with the brand, then the plain one alone.
 */
const fitTitle = (full: string, plain: string): string => {
  for (const candidate of [full + BRAND_SUFFIX, plain + BRAND_SUFFIX, plain]) {
    if (candidate.length <= 60) return candidate;
  }
  return truncate(plain, 60);
};

/** Short excerpts get a call to action so the description is not too thin. */
const describe = (excerpt: string, suffix: string): string => {
  const clean = excerpt.replace(/\s+/g, ' ').trim();
  if (clean.length >= 120) return truncate(clean, 160);
  const joined = `${clean}${/[.!?]$/.test(clean) ? '' : '.'} ${suffix}`;
  return joined.length <= 160 ? joined : truncate(clean, 160);
};

/** Raster images only: Open Graph does not support SVG. */
const shareImage = (url?: string | null): string =>
  url && !/\.svg(\?|$)/i.test(url) ? absoluteUrl(url) : DEFAULT_SHARE_IMAGE;

const bothLocales = (build: (locale: Locale) => string) =>
  Object.fromEntries(LOCALES.map((l) => [l, build(l)])) as Record<
    Locale,
    string
  >;

// ------------------------------------------------------------ JSON-LD ----

const ORG_ID = `${SITE_ORIGIN}/#organization`;

const organizationLd = (contacts: Contact[]) => {
  const social = contacts
    .filter((c) =>
      ['linkedin', 'facebook', 'youtube', 'line', 'instagram'].includes(c.type)
    )
    .map((c) => c.url)
    .filter((url): url is string => !!url && /^https?:\/\//.test(url));
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: ORGANIZATION.name,
    ...(ORGANIZATION.legalName ? { legalName: ORGANIZATION.legalName } : {}),
    ...(ORGANIZATION.foundingDate
      ? { foundingDate: ORGANIZATION.foundingDate }
      : {}),
    alternateName: ORGANIZATION.legalNameTh,
    taxID: ORGANIZATION.registrationNumber,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'DBD juristic person registration number',
      value: ORGANIZATION.registrationNumber,
    },
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    address: { '@type': 'PostalAddress', ...ORGANIZATION.address },
    sameAs: social.length ? social : ORGANIZATION.sameAs,
  };
};

const localBusinessLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_ORIGIN}/#office`,
  name: ORGANIZATION.name,
  url: ORGANIZATION.url,
  image: ORGANIZATION.logo,
  logo: ORGANIZATION.logo,
  email: ORGANIZATION.email,
  telephone: ORGANIZATION.telephone,
  address: { '@type': 'PostalAddress', ...ORGANIZATION.address },
  ...(ORGANIZATION.geo
    ? { geo: { '@type': 'GeoCoordinates', ...ORGANIZATION.geo } }
    : {}),
  ...(ORGANIZATION.openingHours
    ? { openingHours: ORGANIZATION.openingHours }
    : {}),
  areaServed: { '@type': 'Country', name: 'Thailand' },
  parentOrganization: { '@id': ORG_ID },
});

const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

const faqLd = (faqs: Faq[], locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question[locale],
    acceptedAnswer: { '@type': 'Answer', text: faq.answer[locale] },
  })),
});

const articleLd = (args: {
  locale: Locale;
  path: string;
  headline: string;
  description: string;
  image: string;
  datePublished?: string;
  dateModified?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: truncate(args.headline, 110),
  description: args.description,
  image: [args.image],
  inLanguage: args.locale,
  mainEntityOfPage: absoluteUrl(args.path),
  ...(args.datePublished
    ? {
        datePublished: args.datePublished,
        dateModified: args.dateModified || args.datePublished,
      }
    : {}),
  // TODO: name a real expert author (Person with jobTitle) per article once
  // the team page exists; until then the company is credited.
  author: { '@type': 'Organization', '@id': ORG_ID, name: ORGANIZATION.name },
  publisher: {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: ORGANIZATION.name,
    logo: { '@type': 'ImageObject', url: ORGANIZATION.logo },
  },
});

const serviceLd = (
  locale: Locale,
  page: PageKey,
  name: string,
  description: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  serviceType: 'Chiller as a Service (Cooling-as-a-Service)',
  areaServed: { '@type': 'Country', name: 'Thailand' },
  provider: { '@id': ORG_ID },
  url: absoluteUrl(paths.page(locale, page)),
});

// ---------------------------------------------------------- resolution ----

export interface ResolvedPage {
  match: RouteMatch;
  head: Head;
  status: 200 | 404;
  /** Initial store state for pre-rendering (only when requested). */
  seed: Seed;
}

const sharedSeed = async (locale: Locale): Promise<Seed> => {
  const [localizations, media, navMenu, footerMenu, contacts] =
    await Promise.all([
      listLocalizations(),
      listMedia(),
      findMenu('nav'),
      findMenu('footer'),
      listContacts(),
    ]);
  return {
    'screen.locale': locale,
    'screen.localizations': localizations,
    'screen.media': media,
    'screen.navMenu': navMenu,
    'screen.footerMenu': footerMenu,
    'screen.contacts': contacts,
  };
};

const frontSeed = async (): Promise<Seed> => {
  const [
    benefits,
    heroBanners,
    sectors,
    projects,
    projectSummary,
    activities,
    partners,
    processSteps,
    faqs,
  ] = await Promise.all([
    listBenefits(),
    listHeroBanners(),
    listSectors(),
    listLatestProjects(),
    findProjectSummary(),
    listLatestActivities(),
    listPartners(),
    listProcessSteps(),
    listFaqs(),
  ]);
  return {
    'front.benefits': benefits ?? [],
    'front.heroBanners': heroBanners ?? [],
    'front.sectors': sectors ?? [],
    'front.projects': projects ?? [],
    'front.projectSummary': projectSummary,
    'front.activities': activities ?? [],
    'front.partners': [...partners].sort((a, b) => a.seq - b.seq),
    'front.processSteps': processSteps ?? [],
    'front.faqs': faqs ?? [],
  };
};

const notFoundHead = (locale: Locale): Head => {
  const meta = siteMeta(locale);
  return {
    lang: locale,
    title: meta.notFound.title,
    description: meta.notFound.description,
    canonical: null,
    alternates: {},
    noindex: true,
    ogType: 'website',
    ogImage: DEFAULT_SHARE_IMAGE,
    jsonLd: [],
  };
};

/**
 * Works out a page's head tags, HTTP status and (optionally) the data it is
 * pre-rendered with. Used by the build (scripts/prerender.mjs) and by the
 * browser to update the head after client-side navigation.
 */
export const resolvePage = async (
  pathname: string,
  options: { withSeed?: boolean } = {}
): Promise<ResolvedPage> => {
  const { withSeed = false } = options;
  const match = matchRoute(pathname);

  if (match.kind === 'root' || match.kind === 'admin') {
    return {
      match,
      status: 200,
      seed: {},
      head: {
        ...notFoundHead(match.kind === 'root' ? 'th' : 'en'),
        title:
          match.kind === 'admin'
            ? 'Admin | Infinity CoolMaster'
            : siteMeta('th').home.title,
        description: siteMeta(match.kind === 'root' ? 'th' : 'en').home
          .description,
        canonical: match.kind === 'root' ? paths.home('th') : null,
        alternates: {},
        noindex: true,
      },
    };
  }

  const { locale } = match;
  const meta = siteMeta(locale);
  const contacts = await listContacts();
  const org = organizationLd(contacts);
  const home = { name: meta.homeLabel, path: paths.home(locale) };
  const seed: Seed = withSeed ? await sharedSeed(locale) : {};

  const base = (
    text: { title: string; description: string },
    alternates: Record<Locale, string>,
    extra: Partial<Head> = {}
  ): Head => ({
    lang: locale,
    title: text.title,
    description: text.description,
    canonical: alternates[locale],
    alternates,
    noindex: false,
    ogType: 'website',
    ogImage: DEFAULT_SHARE_IMAGE,
    jsonLd: [org],
    ...extra,
  });

  const notFound = (): ResolvedPage => ({
    match: { kind: 'notFound', locale },
    status: 404,
    seed,
    head: notFoundHead(locale),
  });

  switch (match.kind) {
    case 'home': {
      const faqs = await listFaqs();
      if (withSeed) Object.assign(seed, await frontSeed());
      const head = base(meta.home, bothLocales(paths.home));
      head.jsonLd.push(localBusinessLd());
      if (faqs.length) head.jsonLd.push(faqLd(faqs, locale));
      return { match, status: 200, seed, head };
    }
    case 'about': {
      if (withSeed) {
        const [projectSummary, partners] = await Promise.all([
          findProjectSummary(),
          listPartners(),
        ]);
        seed['about.projectSummary'] = projectSummary;
        seed['about.partners'] = [...partners].sort((a, b) => a.seq - b.seq);
      }
      const head = base(meta.about, bothLocales(paths.about));
      head.jsonLd.push(
        breadcrumbLd([
          home,
          { name: meta.about.label, path: paths.about(locale) },
        ])
      );
      return { match, status: 200, seed, head };
    }
    case 'caseStudies': {
      if (withSeed) {
        const [projects, projectSummary] = await Promise.all([
          listProjects(),
          findProjectSummary(),
        ]);
        seed['projectList.projects'] = projects;
        seed['projectList.projectSummary'] = projectSummary;
      }
      // Until the first verified case study exists the page holds only a
      // status notice: keep it out of search results (thin content).
      const hasProjects = (await listProjects()).length > 0;
      const head = base(meta.caseStudies, bothLocales(paths.caseStudies), {
        noindex: !hasProjects,
      });
      head.jsonLd.push(
        breadcrumbLd([
          home,
          { name: meta.caseStudies.label, path: paths.caseStudies(locale) },
        ])
      );
      return { match, status: 200, seed, head };
    }
    case 'caseStudy': {
      const { project, next } = await resolveProject(match.slug);
      if (!project) return notFound();
      if (withSeed) {
        seed['project.project'] = project;
        seed['project.next'] = next;
        seed['project.resolved'] = projectSlug(project);
      }
      const title = project.title[locale];
      const description = describe(
        project.excerpt[locale],
        meta.caseStudyDescriptionSuffix
      );
      const head = base(
        {
          title: fitTitle(
            meta.caseStudyTitle(title, project.savingsPct),
            title
          ),
          description,
        },
        bothLocales((l) => paths.caseStudy(l, project)),
        {
          ogType: 'article',
          ogImage: shareImage(project.banner || project.thumbnail),
        }
      );
      head.jsonLd.push(
        articleLd({
          locale,
          path: paths.caseStudy(locale, project),
          headline: title,
          description,
          image: head.ogImage,
        }),
        breadcrumbLd([
          home,
          { name: meta.caseStudies.label, path: paths.caseStudies(locale) },
          { name: title, path: paths.caseStudy(locale, project) },
        ])
      );
      return {
        match: { ...match, slug: projectSlug(project) },
        status: 200,
        seed,
        head,
      };
    }
    case 'insights': {
      if (withSeed) seed['activityList.activities'] = await listActivities();
      const head = base(meta.insights, bothLocales(paths.insights));
      head.jsonLd.push(
        breadcrumbLd([
          home,
          { name: meta.insights.label, path: paths.insights(locale) },
        ])
      );
      return { match, status: 200, seed, head };
    }
    case 'insight': {
      const { activity, latest, next } = await resolveActivity(match.slug);
      if (!activity) return notFound();
      if (withSeed) {
        seed['activity.activity'] = activity;
        seed['activity.activities'] = latest;
        seed['activity.next'] = next;
        seed['activity.resolved'] = activitySlug(activity);
      }
      const title = activity.title[locale];
      const description = describe(
        activity.excerpt[locale],
        meta.insightDescriptionSuffix
      );
      const head = base(
        { title: fitTitle(meta.insightTitle(title), title), description },
        bothLocales((l) => paths.insight(l, activity)),
        {
          ogType: 'article',
          ogImage: shareImage(activity.banner || activity.thumbnail),
        }
      );
      head.jsonLd.push(
        articleLd({
          locale,
          path: paths.insight(locale, activity),
          headline: title,
          description,
          image: head.ogImage,
          datePublished: activity.publishedAt || undefined,
          dateModified: activity.updatedAt || undefined,
        }),
        breadcrumbLd([
          home,
          { name: meta.insights.label, path: paths.insights(locale) },
          { name: title, path: paths.insight(locale, activity) },
        ])
      );
      return {
        match: { ...match, slug: activitySlug(activity) },
        status: 200,
        seed,
        head,
      };
    }
    case 'page': {
      const text = meta.pages[match.page];
      if (withSeed) Object.assign(seed, await frontSeed());
      const head = base(
        text,
        bothLocales((l) => paths.page(l, match.page)),
        {
          noindex: isDraftPage(match.page),
        }
      );
      if (match.page === 'contact') head.jsonLd.push(localBusinessLd());
      const body = pageBody(locale, match.page);
      if (body?.faqs?.length) {
        head.jsonLd.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: body.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        });
      }
      if (SECTOR_PAGES.includes(match.page)) {
        head.jsonLd.push(
          serviceLd(locale, match.page, text.h1, text.description)
        );
      }
      head.jsonLd.push(
        breadcrumbLd([
          home,
          { name: text.label, path: paths.page(locale, match.page) },
        ])
      );
      return { match, status: 200, seed, head };
    }
    case 'notFound':
    default:
      return notFound();
  }
};

/** Every indexable or pre-renderable path, for the build and the sitemap. */
export const listSitePaths = async (): Promise<
  { path: string; lastmod?: string }[]
> => {
  const [projects, activities] = await Promise.all([
    listProjects(),
    listActivities(),
  ]);
  const out: { path: string; lastmod?: string }[] = [];
  for (const locale of LOCALES) {
    out.push({ path: paths.home(locale) });
    out.push({ path: paths.about(locale) });
    out.push({ path: paths.caseStudies(locale) });
    for (const project of projects as Project[]) {
      out.push({ path: paths.caseStudy(locale, project) });
    }
    out.push({ path: paths.insights(locale) });
    for (const activity of activities as Activity[]) {
      out.push({
        path: paths.insight(locale, activity),
        lastmod: activity.updatedAt || activity.publishedAt || undefined,
      });
    }
    for (const page of PAGE_KEYS) out.push({ path: paths.page(locale, page) });
  }
  return out;
};
