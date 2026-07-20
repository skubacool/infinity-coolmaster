import { iconNames } from '../components/_commons/icon';
import defaultProjects from '../apis/project/defaults';
import defaultActivities from '../apis/activity/defaults';
import defaultPartners from '../apis/partner/defaults';
import defaultBenefits from '../apis/benefit/defaults';
import defaultHeroBanners from '../apis/hero-banner/defaults';
import defaultSectors from '../apis/sector/defaults';
import defaultContacts from '../apis/contact/defaults';
import defaultProcessSteps from '../apis/process-step/defaults';
import defaultFaqs from '../apis/faq/defaults';

/**
 * Schema that drives the admin CMS form generator. Each entry describes one
 * cms_content collection: which fields an editor sees, their input types,
 * and the built-in defaults shown before the collection is copied to the CMS.
 */

export type CmsFieldType =
  | 'text'
  | 'localized'
  | 'localized-multiline'
  | 'number'
  | 'image'
  | 'photos'
  | 'select'
  | 'icon'
  | 'date'
  | 'preset';

export interface CmsPreset {
  label: string;
  value: unknown;
}

export interface CmsField {
  /** Property name inside the row's data JSON. */
  name: string;
  label: string;
  type: CmsFieldType;
  options?: string[];
  presets?: CmsPreset[];
  help?: string;
}

export interface CmsListCollection {
  collection: string;
  /** Tab label in the admin. */
  label: string;
  /** Singular item name, e.g. 'case study'. */
  itemName: string;
  description: string;
  /** Mirror the row order into data.seq (models that carry their own seq). */
  syncSeqIntoData: boolean;
  /** Storage folder for uploaded images. */
  imageFolder: string;
  fields: CmsField[];
  defaults: Record<string, unknown>[];
  summary: (data: Record<string, unknown>) => string;
}

const en = (data: Record<string, unknown>, field: string): string => {
  const value = data[field] as { en?: string } | undefined;
  return value?.en || '(untitled)';
};

const ACTIVITY_TAG_PRESETS: CmsPreset[] = [
  { label: '(no tag)', value: null },
  {
    label: 'CaaS (green)',
    value: { id: 1, color: '#10B981', title: { en: 'CaaS', th: 'CaaS' } },
  },
  {
    label: 'Technology (blue)',
    value: {
      id: 2,
      color: '#38BDF8',
      title: { en: 'Technology', th: 'เทคโนโลยี' },
    },
  },
  {
    label: 'News (navy)',
    value: { id: 3, color: '#0F172A', title: { en: 'News', th: 'ข่าวสาร' } },
  },
];

const ACTIVITY_TYPE_PRESETS: CmsPreset[] = [
  { label: '(no type)', value: null },
  {
    label: 'Guide',
    value: { id: 1, color: '#10B981', title: { en: 'Guide', th: 'คู่มือ' } },
  },
  {
    label: 'Technical',
    value: {
      id: 2,
      color: '#38BDF8',
      title: { en: 'Technical', th: 'เชิงเทคนิค' },
    },
  },
  {
    label: 'Company News',
    value: {
      id: 3,
      color: '#475569',
      title: { en: 'Company News', th: 'ข่าวบริษัท' },
    },
  },
];

export const listCollections: CmsListCollection[] = [
  {
    collection: 'projects',
    label: 'Case Studies',
    itemName: 'case study',
    description:
      'The portfolio numbers on the website (facilities, total TR, GWh, average savings) are calculated automatically from this list.',
    syncSeqIntoData: false,
    imageFolder: 'projects',
    fields: [
      { name: 'title', label: 'Title', type: 'localized' },
      { name: 'excerpt', label: 'Short teaser (card text)', type: 'localized-multiline' },
      { name: 'details', label: 'Full story', type: 'localized-multiline', help: 'Leave a blank line between paragraphs.' },
      { name: 'client', label: 'Client name', type: 'localized', help: 'Use "Confidential" if the client cannot be named.' },
      { name: 'location', label: 'Location', type: 'localized' },
      { name: 'sector', label: 'Sector', type: 'select', options: ['commercial', 'industrial', 'healthcare', 'hospitality', 'retail', 'data-center'] },
      { name: 'capacityTr', label: 'Plant size (TR)', type: 'number' },
      { name: 'savingsPct', label: 'Verified savings (%)', type: 'number' },
      { name: 'completion', label: 'Year in service', type: 'number' },
      { name: 'energySavedKwh', label: 'Energy saved per year (kWh)', type: 'number', help: 'Leave 0 to hide the energy box.' },
      { name: 'co2AvoidedTons', label: 'CO₂ avoided per year (tons)', type: 'number', help: 'Leave 0 to hide the CO₂ box.' },
      { name: 'thumbnail', label: 'Card photo', type: 'image' },
      { name: 'banner', label: 'Page banner photo', type: 'image' },
      { name: 'photos', label: 'Photo gallery', type: 'photos' },
      { name: 'nextProjectId', label: '"Next case study" — item number', type: 'number', help: 'The number (#) of the case study to link to at the bottom of the page.' },
    ],
    defaults: defaultProjects as unknown as Record<string, unknown>[],
    summary: (d) => en(d, 'title'),
  },
  {
    collection: 'activities',
    label: 'Articles & News',
    itemName: 'article',
    description: 'Insights, technical articles and company news.',
    syncSeqIntoData: false,
    imageFolder: 'articles',
    fields: [
      { name: 'title', label: 'Headline', type: 'localized' },
      { name: 'excerpt', label: 'Short teaser', type: 'localized-multiline' },
      { name: 'details', label: 'Article body', type: 'localized-multiline', help: 'Leave a blank line between paragraphs.' },
      { name: 'publishedAt', label: 'Publish date', type: 'date' },
      { name: 'tag', label: 'Tag badge', type: 'preset', presets: ACTIVITY_TAG_PRESETS },
      { name: 'type', label: 'Article type', type: 'preset', presets: ACTIVITY_TYPE_PRESETS },
      { name: 'thumbnail', label: 'Card photo', type: 'image' },
      { name: 'banner', label: 'Page banner photo', type: 'image' },
      { name: 'nextActivityId', label: '"Next article" — item number', type: 'number' },
    ],
    defaults: defaultActivities as unknown as Record<string, unknown>[],
    summary: (d) => en(d, 'title'),
  },
  {
    collection: 'partners',
    label: 'Partners & Clients',
    itemName: 'partner',
    description: 'Logos shown in the two partner strips on the home and About pages.',
    syncSeqIntoData: true,
    imageFolder: 'partners',
    fields: [
      { name: 'name', label: 'Name', type: 'localized' },
      { name: 'logo', label: 'Logo image', type: 'image', help: 'Transparent PNG or SVG looks best.' },
      { name: 'type', label: 'Strip', type: 'select', options: ['vendor', 'client'], help: 'vendor = Technology Partners strip, client = Enterprises That Trust Us strip.' },
    ],
    defaults: defaultPartners as unknown as Record<string, unknown>[],
    summary: (d) => `${en(d, 'name')} — ${String(d.type ?? '')}`,
  },
  {
    collection: 'benefits',
    label: 'Benefits',
    itemName: 'benefit',
    description: 'The numbered "reasons to choose us" on the home page.',
    syncSeqIntoData: true,
    imageFolder: 'misc',
    fields: [
      { name: 'title', label: 'Title', type: 'localized' },
      { name: 'excerpt', label: 'Description', type: 'localized-multiline' },
      { name: 'icon', label: 'Icon', type: 'icon' },
    ],
    defaults: defaultBenefits as unknown as Record<string, unknown>[],
    summary: (d) => en(d, 'title'),
  },
  {
    collection: 'hero_banners',
    label: 'Services',
    itemName: 'service',
    description: 'The "What We Deliver" carousel slides on the home page.',
    syncSeqIntoData: false,
    imageFolder: 'misc',
    fields: [
      { name: 'title', label: 'Service name', type: 'localized' },
      { name: 'subtitle', label: 'Small label above the name', type: 'localized' },
      { name: 'excerpt', label: 'Description', type: 'localized-multiline' },
      { name: 'icon', label: 'Icon', type: 'icon' },
    ],
    defaults: defaultHeroBanners as unknown as Record<string, unknown>[],
    summary: (d) => en(d, 'title'),
  },
  {
    collection: 'process_steps',
    label: 'How It Works',
    itemName: 'step',
    description:
      'The step-by-step engagement journey on the home page (audit → proposal → install → operate → verify).',
    syncSeqIntoData: true,
    imageFolder: 'misc',
    fields: [
      { name: 'title', label: 'Step title', type: 'localized' },
      { name: 'excerpt', label: 'Description', type: 'localized-multiline' },
      { name: 'icon', label: 'Icon', type: 'icon' },
    ],
    defaults: defaultProcessSteps as unknown as Record<string, unknown>[],
    summary: (d) => en(d, 'title'),
  },
  {
    collection: 'faqs',
    label: 'FAQ',
    itemName: 'question',
    description:
      'Common questions answered on the home page, just above the contact form.',
    syncSeqIntoData: true,
    imageFolder: 'misc',
    fields: [
      { name: 'question', label: 'Question', type: 'localized' },
      { name: 'answer', label: 'Answer', type: 'localized-multiline', help: 'Leave a blank line between paragraphs.' },
    ],
    defaults: defaultFaqs as unknown as Record<string, unknown>[],
    summary: (d) => en(d, 'question'),
  },
  {
    collection: 'sectors',
    label: 'Sectors',
    itemName: 'sector',
    description: 'The "Sectors We Serve" cards. The list also feeds the Industry dropdown in the lead form.',
    syncSeqIntoData: true,
    imageFolder: 'misc',
    fields: [
      { name: 'title', label: 'Sector name', type: 'localized' },
      { name: 'excerpt', label: 'Description', type: 'localized-multiline' },
      { name: 'key', label: 'System key', type: 'text', help: 'Short lowercase id, e.g. commercial. Saved into leads as the industry value.' },
      { name: 'icon', label: 'Icon', type: 'icon' },
    ],
    defaults: defaultSectors as unknown as Record<string, unknown>[],
    summary: (d) => en(d, 'title'),
  },
  {
    collection: 'contacts',
    label: 'Contact Channels',
    itemName: 'contact channel',
    description: 'Address, phone, email, map link and social channels (footer + contact section).',
    syncSeqIntoData: false,
    imageFolder: 'misc',
    fields: [
      { name: 'type', label: 'Channel type', type: 'select', options: ['address', 'tel', 'email', 'maps', 'linkedin', 'facebook', 'line'], help: 'address/tel/email/maps appear in the contact section; others become footer social icons.' },
      { name: 'text', label: 'Display text', type: 'localized' },
      { name: 'url', label: 'Link (optional)', type: 'text', help: 'e.g. tel:+662..., mailto:..., or https://...' },
      { name: 'icon', label: 'Icon', type: 'icon' },
    ],
    defaults: defaultContacts as unknown as Record<string, unknown>[],
    summary: (d) => `${String(d.type ?? '')} — ${en(d, 'text')}`,
  },
];

/** Image slots editable in the "Banners & Images" tab (media collection). */
export const mediaSlots: { key: string; label: string; help: string }[] = [
  {
    key: 'front.banner-hero',
    label: 'Home page — hero background photo (optional)',
    help: 'Shown behind the big headline with a light overlay. Leave empty for the clean gradient look. Recommended ~1600×900, bright photos work best.',
  },
  {
    key: 'about.banner-main',
    label: 'About page — hero banner',
    help: 'Photo behind the About page title (a light overlay keeps the text readable). Recommended ~1600×700.',
  },
  {
    key: 'project-list.banner-main',
    label: 'Case Studies page — hero banner',
    help: 'Photo behind the Case Studies title (a light overlay keeps the text readable). Recommended ~1600×700.',
  },
  {
    key: 'front.figure-impact',
    label: 'Home — impact section illustration',
    help: 'Shown under the verified-impact numbers on the home page. Recommended ~1000×600.',
  },
];

/** Group labels for the Site Text tab, keyed by localization-key prefix. */
export const textGroups: { prefix: string; label: string }[] = [
  { prefix: 'front', label: 'Home page' },
  { prefix: 'about', label: 'About page' },
  { prefix: 'project-list', label: 'Case Studies page' },
  { prefix: 'project', label: 'Case study details' },
  { prefix: 'project-box', label: 'Case study card labels' },
  { prefix: 'activity-list', label: 'Articles page' },
  { prefix: 'activity', label: 'Article details' },
  { prefix: 'form', label: 'Lead form' },
  { prefix: 'partners', label: 'Partner section titles' },
  { prefix: 'menu', label: 'Menu' },
  { prefix: 'general', label: 'General / shared' },
];
