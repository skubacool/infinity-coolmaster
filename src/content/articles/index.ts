import { Activity } from '../../models/activity';
import { p } from '../../utils/path-utils';
import {
  tagCaas,
  tagTech,
  typeGuide,
  typeTechnical,
} from '../../apis/activity/defaults';
import { en } from './en';
import { th } from './th';

/**
 * Evergreen guides kept in code (not in the CMS), so they are always on the
 * site even after editors take over the "Articles & News" list. They are
 * merged into the CMS articles by apis/activity; a CMS article with the same
 * slug replaces the built-in one, which is how editors can take one over.
 *
 * Ids start at 1001 to stay clear of CMS item numbers.
 */
type Key = keyof typeof en;

const PUBLISHED = '2026-11-03';

const guide = (
  id: number,
  key: Key,
  slug: string,
  extra: Pick<Activity, 'tag' | 'type' | 'nextActivityId'> & {
    relatedPages: string[];
    thumbnail: string;
  }
): Activity => ({
  id,
  slug,
  thumbnail: p(extra.thumbnail),
  banner: p('assets/placeholders/banner-soft.svg'),
  tag: extra.tag,
  type: extra.type,
  title: { en: en[key].title, th: th[key].title },
  excerpt: { en: en[key].excerpt, th: th[key].excerpt },
  details: { en: en[key].body, th: th[key].body },
  publishedAt: PUBLISHED,
  nextActivityId: extra.nextActivityId,
  relatedPages: extra.relatedPages,
});

/** Guides listed as "Further reading" on each standalone page. */
export const GUIDES_BY_PAGE: Record<string, string[]> = {
  hotels: [
    'what-is-cooling-as-a-service',
    'kw-per-tr-chiller-plant-efficiency',
  ],
  hospitals: [
    'what-is-cooling-as-a-service',
    'chiller-replacement-cost-factors',
  ],
  'shopping-malls': [
    'kw-per-tr-chiller-plant-efficiency',
    'what-is-cooling-as-a-service',
  ],
  factories: [
    'kw-per-tr-chiller-plant-efficiency',
    'chiller-replacement-cost-factors',
  ],
  'office-buildings': [
    'chiller-replacement-cost-factors',
    'cooling-as-a-service-cfo-questions',
  ],
  'data-centers': [
    'kw-per-tr-chiller-plant-efficiency',
    'what-is-cooling-as-a-service',
  ],
  'pricing-model': [
    'cooling-as-a-service-cfo-questions',
    'cooling-as-a-service-contract-length-end-of-term',
  ],
  'caas-vs-buying-chiller': [
    'what-is-cooling-as-a-service',
    'cooling-as-a-service-cfo-questions',
  ],
  'chiller-replacement': [
    'chiller-replacement-cost-factors',
    'kw-per-tr-chiller-plant-efficiency',
  ],
  'measurement-verification': [
    'kw-per-tr-chiller-plant-efficiency',
    'cooling-as-a-service-cfo-questions',
  ],
  'savings-calculator': [
    'kw-per-tr-chiller-plant-efficiency',
    'chiller-replacement-cost-factors',
  ],
};

export const builtInGuides: Activity[] = [
  guide(1001, 'whatIsCaas', 'what-is-cooling-as-a-service', {
    tag: tagCaas,
    type: typeGuide,
    nextActivityId: 1002,
    thumbnail: 'assets/placeholders/facility-commercial.svg',
    relatedPages: ['pricing-model', 'caas-vs-buying-chiller'],
  }),
  guide(1002, 'replacementCost', 'chiller-replacement-cost-factors', {
    tag: tagCaas,
    type: typeGuide,
    nextActivityId: 1003,
    thumbnail: 'assets/placeholders/facility-industrial.svg',
    relatedPages: ['chiller-replacement', 'savings-calculator'],
  }),
  guide(1003, 'kwPerTr', 'kw-per-tr-chiller-plant-efficiency', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1004,
    thumbnail: 'assets/placeholders/facility-datacenter.svg',
    relatedPages: ['measurement-verification', 'savings-calculator'],
  }),
  guide(
    1004,
    'contractEnd',
    'cooling-as-a-service-contract-length-end-of-term',
    {
      tag: tagCaas,
      type: typeGuide,
      nextActivityId: 1005,
      thumbnail: 'assets/placeholders/facility-hospitality.svg',
      relatedPages: ['pricing-model', 'caas-vs-buying-chiller'],
    }
  ),
  guide(1005, 'cfoQuestions', 'cooling-as-a-service-cfo-questions', {
    tag: tagCaas,
    type: typeGuide,
    nextActivityId: 1001,
    thumbnail: 'assets/placeholders/facility-healthcare.svg',
    relatedPages: ['pricing-model', 'measurement-verification'],
  }),
];
