import { PageKey } from '../config/routes';

export interface PageSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: { headers: string[]; rows: string[][] };
  /** External source cited under the section, rendered as a link. */
  source?: { label: string; url: string };
}

export interface PageFaq {
  question: string;
  answer: string;
}

/** Long-form body of a standalone page (the H1 and intro live in src/seo/meta.*.ts). */
export interface PageBody {
  sections: PageSection[];
  faqs?: PageFaq[];
  /** Case-study sector key whose projects are listed as related proof. */
  sector?: string;
  /** Glossary entries (glossary page only); `id` is the anchor and must stay stable. */
  terms?: GlossaryTerm[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
}

export type PageBodies = Partial<Record<PageKey, PageBody>>;
