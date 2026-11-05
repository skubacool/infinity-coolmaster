import { Activity } from '../../models/activity';
import { p } from '../../utils/path-utils';
import {
  tagCaas,
  tagNews,
  tagTech,
  typeGuide,
  typeNews,
  typeTechnical,
} from '../../apis/activity/defaults';
import { en } from './en';
import { th } from './th';
import { en2 } from './en2';
import { th2 } from './th2';
import { en3 } from './en3';
import { th3 } from './th3';

/**
 * Evergreen guides kept in code (not in the CMS), so they are always on the
 * site even after editors take over the "Articles & News" list. They are
 * merged into the CMS articles by apis/activity; a CMS article with the same
 * slug replaces the built-in one, which is how editors can take one over.
 *
 * Ids start at 1001 to stay clear of CMS item numbers.
 */
const EN = { ...en, ...en2, ...en3 };
const TH = { ...th, ...th2, ...th3 };
type Key = keyof typeof EN;

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
  title: { en: EN[key].title, th: TH[key].title },
  excerpt: { en: EN[key].excerpt, th: TH[key].excerpt },
  details: { en: EN[key].body, th: TH[key].body },
  publishedAt: PUBLISHED,
  nextActivityId: extra.nextActivityId,
  relatedPages: extra.relatedPages,
});

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
    nextActivityId: 1006,
    thumbnail: 'assets/placeholders/facility-healthcare.svg',
    relatedPages: ['pricing-model', 'measurement-verification'],
  }),
  guide(1006, 'cutEnergy', 'reduce-chiller-plant-energy-use', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1007,
    thumbnail: 'assets/placeholders/facility-commercial.svg',
    relatedPages: ['savings-calculator', 'chiller-replacement'],
  }),
  guide(1007, 'replaceSigns', 'signs-chiller-plant-needs-replacing', {
    tag: tagCaas,
    type: typeGuide,
    nextActivityId: 1008,
    thumbnail: 'assets/placeholders/facility-industrial.svg',
    relatedPages: ['chiller-replacement', 'office-buildings'],
  }),
  guide(1008, 'waterVsAir', 'water-cooled-vs-air-cooled-chillers', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1009,
    thumbnail: 'assets/placeholders/facility-retail.svg',
    relatedPages: ['chiller-replacement', 'shopping-malls'],
  }),
  guide(1009, 'maintenance', 'chiller-plant-maintenance-checklist', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1010,
    thumbnail: 'assets/placeholders/facility-industrial.svg',
    relatedPages: ['factories', 'measurement-verification'],
  }),
  guide(1010, 'ipmvpOptions', 'ipmvp-options-a-b-c-d-explained', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1011,
    thumbnail: 'assets/placeholders/facility-commercial.svg',
    relatedPages: ['measurement-verification', 'pricing-model'],
  }),
  guide(1011, 'dataCenterPue', 'data-center-cooling-pue', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1012,
    thumbnail: 'assets/placeholders/facility-datacenter.svg',
    relatedPages: ['data-centers', 'measurement-verification'],
  }),
  guide(1012, 'hotelCooling', 'hotel-resort-cooling-cost-reduction', {
    tag: tagCaas,
    type: typeGuide,
    nextActivityId: 1013,
    thumbnail: 'assets/placeholders/facility-hospitality.svg',
    relatedPages: ['hotels', 'savings-calculator'],
  }),
  guide(1013, 'hospitalRedundancy', 'hospital-cooling-redundancy-n-plus-1-2n', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1001,
    thumbnail: 'assets/placeholders/facility-healthcare.svg',
    relatedPages: ['hospitals', 'chiller-replacement'],
  }),
  guide(
    1014,
    'firstProject',
    'first-cooling-as-a-service-project-commissioning',
    {
      tag: tagNews,
      type: typeNews,
      nextActivityId: 1015,
      thumbnail: 'assets/placeholders/facility-industrial.svg',
      relatedPages: ['factories', 'measurement-verification'],
    }
  ),
  guide(1015, 'plasticsCooling', 'plastics-factory-process-cooling', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1001,
    thumbnail: 'assets/placeholders/facility-industrial.svg',
    relatedPages: ['factories', 'chiller-replacement'],
  }),
];
