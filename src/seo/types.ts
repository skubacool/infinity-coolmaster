import { PageKey } from '../config/routes';

export interface MetaText {
  /** Under 60 characters, keyword first, "| Infinity CoolMaster" last. */
  title: string;
  /** 140–160 characters, with a number or a call to action where possible. */
  description: string;
}

export interface PageText extends MetaText {
  /** The page's single H1. */
  h1: string;
  /** Opening paragraph under the H1 (a direct 2–3 sentence answer). */
  intro: string;
  /** Short label used in breadcrumbs and menus. */
  label: string;
}

export interface SiteMeta {
  home: MetaText;
  about: MetaText & { label: string };
  caseStudies: MetaText & { label: string };
  insights: MetaText & { label: string };
  notFound: MetaText & { h1: string; intro: string; backHome: string };
  homeLabel: string;
  /** Detail pages: built from the CMS item. */
  caseStudyTitle: (title: string, savingsPct: number) => string;
  insightTitle: (title: string) => string;
  /** Appended to short CMS excerpts so meta descriptions reach ~140 chars. */
  caseStudyDescriptionSuffix: string;
  insightDescriptionSuffix: string;
  pages: Record<PageKey, PageText>;
  /** Shown on scaffolded pages whose copy is not written yet. */
  draftNotice: string;
  draftSections: string[];
  ctaAudit: string;
  /** Shown instead of case studies until the first verified one exists. */
  firstProjectKicker: string;
  firstProjectTitle: string;
  firstProjectText: string;
  firstProjectLink: string;
  faqTitle: string;
  lastUpdated: string;
  furtherReading: string;
  relatedPages: string;
  relatedCaseStudies: string;
  resourcesTitle: string;
  sectorsTitle: string;
  sectorLinkLabel: string;
  calculatorTeaserTitle: string;
  calculatorTeaserText: string;
  calculatorTeaserLink: string;
}
