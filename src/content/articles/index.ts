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
import { en4 } from './en4';
import { th4 } from './th4';
import { en5 } from './en5';
import { th5 } from './th5';
import { KEY_POINTS } from './keypoints';

/**
 * Evergreen guides kept in code (not in the CMS), so they are always on the
 * site even after editors take over the "Articles & News" list. They are
 * merged into the CMS articles by apis/activity; a CMS article with the same
 * slug replaces the built-in one, which is how editors can take one over.
 *
 * Ids start at 1001 to stay clear of CMS item numbers.
 */
const EN = { ...en, ...en2, ...en3, ...en4, ...en5 };
const TH = { ...th, ...th2, ...th3, ...th4, ...th5 };
type Key = keyof typeof EN;

const PUBLISHED = '2026-11-03';
/** Published with the second content release. */
const PUBLISHED_2 = '2026-11-05';
/** Published with the third content release. */
const PUBLISHED_3 = '2026-11-07';
/** Published with the fourth content release. */
const PUBLISHED_4 = '2026-11-11';

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
  keyPoints: KEY_POINTS[key]
    ? {
        en: KEY_POINTS[key].en.join('\n'),
        th: KEY_POINTS[key].th.join('\n'),
      }
    : undefined,
  excerpt: { en: EN[key].excerpt, th: TH[key].excerpt },
  details: { en: EN[key].body, th: TH[key].body },
  publishedAt:
    id >= 1023
      ? PUBLISHED_4
      : id >= 1022
        ? PUBLISHED_3
        : id >= 1016
          ? PUBLISHED_2
          : PUBLISHED,
  nextActivityId: extra.nextActivityId,
  relatedPages: extra.relatedPages,
});

export const builtInGuides: Activity[] = [
  guide(1001, 'whatIsCaas', 'what-is-cooling-as-a-service', {
    tag: tagCaas,
    type: typeGuide,
    nextActivityId: 1002,
    thumbnail: 'assets/guides/contract.svg',
    relatedPages: ['pricing-model', 'caas-vs-buying-chiller'],
  }),
  guide(1002, 'replacementCost', 'chiller-replacement-cost-factors', {
    tag: tagCaas,
    type: typeGuide,
    nextActivityId: 1003,
    thumbnail: 'assets/guides/price.svg',
    relatedPages: ['chiller-replacement', 'savings-calculator'],
  }),
  guide(1003, 'kwPerTr', 'kw-per-tr-chiller-plant-efficiency', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1004,
    thumbnail: 'assets/guides/gauge.svg',
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
      thumbnail: 'assets/guides/calendar.svg',
      relatedPages: ['pricing-model', 'caas-vs-buying-chiller'],
    }
  ),
  guide(1005, 'cfoQuestions', 'cooling-as-a-service-cfo-questions', {
    tag: tagCaas,
    type: typeGuide,
    nextActivityId: 1006,
    thumbnail: 'assets/guides/questions.svg',
    relatedPages: ['pricing-model', 'measurement-verification'],
  }),
  guide(1006, 'cutEnergy', 'reduce-chiller-plant-energy-use', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1007,
    thumbnail: 'assets/guides/bolt.svg',
    relatedPages: ['savings-calculator', 'chiller-replacement'],
  }),
  guide(1007, 'replaceSigns', 'signs-chiller-plant-needs-replacing', {
    tag: tagCaas,
    type: typeGuide,
    nextActivityId: 1008,
    thumbnail: 'assets/guides/warning.svg',
    relatedPages: ['chiller-replacement', 'office-buildings'],
  }),
  guide(1008, 'waterVsAir', 'water-cooled-vs-air-cooled-chillers', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1009,
    thumbnail: 'assets/guides/water-air.svg',
    relatedPages: ['chiller-replacement', 'shopping-malls'],
  }),
  guide(1009, 'maintenance', 'chiller-plant-maintenance-checklist', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1010,
    thumbnail: 'assets/guides/wrench.svg',
    relatedPages: ['factories', 'measurement-verification'],
  }),
  guide(1010, 'ipmvpOptions', 'ipmvp-options-a-b-c-d-explained', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1011,
    thumbnail: 'assets/guides/chart.svg',
    relatedPages: ['measurement-verification', 'pricing-model'],
  }),
  guide(1011, 'dataCenterPue', 'data-center-cooling-pue', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1012,
    thumbnail: 'assets/guides/server.svg',
    relatedPages: ['data-centers', 'measurement-verification'],
  }),
  guide(1012, 'hotelCooling', 'hotel-resort-cooling-cost-reduction', {
    tag: tagCaas,
    type: typeGuide,
    nextActivityId: 1013,
    thumbnail: 'assets/guides/hotel.svg',
    relatedPages: ['hotels', 'savings-calculator'],
  }),
  guide(1013, 'hospitalRedundancy', 'hospital-cooling-redundancy-n-plus-1-2n', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1001,
    thumbnail: 'assets/guides/hospital.svg',
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
      thumbnail: 'assets/guides/factory.svg',
      relatedPages: ['factories', 'measurement-verification'],
    }
  ),
  guide(1015, 'plasticsCooling', 'plastics-factory-process-cooling', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1016,
    thumbnail: 'assets/guides/chiller.svg',
    relatedPages: ['factories', 'chiller-replacement'],
  }),
  guide(1016, 'touFt', 'thailand-tou-ft-electricity-chiller-cost', {
    tag: tagTech,
    type: typeGuide,
    nextActivityId: 1017,
    thumbnail: 'assets/guides/clock.svg',
    relatedPages: ['savings-calculator', 'chiller-efficiency-check'],
  }),
  guide(1017, 'energyLaw', 'designated-factory-building-energy-law-thailand', {
    tag: tagCaas,
    type: typeGuide,
    nextActivityId: 1018,
    thumbnail: 'assets/guides/law.svg',
    relatedPages: ['factories', 'measurement-verification'],
  }),
  guide(1018, 'foodCold', 'food-beverage-factory-cooling', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1019,
    thumbnail: 'assets/guides/snowflake.svg',
    relatedPages: ['factories', 'eastern-economic-corridor'],
  }),
  guide(1019, 'pharmaCleanroom', 'pharmaceutical-cleanroom-cooling', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1020,
    thumbnail: 'assets/guides/flask.svg',
    relatedPages: ['factories', 'hospitals'],
  }),
  guide(1020, 'caasVsEsco', 'cooling-as-a-service-vs-esco-thailand', {
    tag: tagCaas,
    type: typeGuide,
    nextActivityId: 1021,
    thumbnail: 'assets/guides/documents.svg',
    relatedPages: ['caas-vs-buying-chiller', 'pricing-model'],
  }),
  guide(1021, 'refrigerants', 'refrigerant-phase-down-r22-kigali-thailand', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1022,
    thumbnail: 'assets/guides/leaf.svg',
    relatedPages: ['chiller-replacement', 'glossary'],
  }),
  guide(1022, 'caasVsLease', 'cooling-as-a-service-vs-leasing-chiller', {
    tag: tagCaas,
    type: typeGuide,
    nextActivityId: 1023,
    thumbnail: 'assets/guides/compare.svg',
    relatedPages: ['cooling-contract-calculator', 'caas-vs-buying-chiller'],
  }),
  guide(1023, 'deltaT', 'low-delta-t-syndrome-chilled-water', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1024,
    thumbnail: 'assets/guides/thermometer.svg',
    relatedPages: ['chiller-efficiency-check', 'glossary'],
  }),
  guide(1024, 'coolingTower', 'cooling-tower-range-approach-efficiency', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1025,
    thumbnail: 'assets/guides/tower.svg',
    relatedPages: ['chiller-efficiency-check', 'engineer-downloads'],
  }),
  guide(1025, 'vsd', 'variable-speed-drives-chiller-plant', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1026,
    thumbnail: 'assets/guides/wave.svg',
    relatedPages: ['chiller-efficiency-check', 'savings-calculator'],
  }),
  guide(1026, 'staging', 'chiller-staging-part-load-iplv', {
    tag: tagTech,
    type: typeTechnical,
    nextActivityId: 1027,
    thumbnail: 'assets/guides/staging.svg',
    relatedPages: ['chiller-efficiency-check', 'measurement-verification'],
  }),
  guide(1027, 'solarCooling', 'rooftop-solar-and-efficient-cooling', {
    tag: tagCaas,
    type: typeGuide,
    nextActivityId: 1028,
    thumbnail: 'assets/guides/sun-snow.svg',
    relatedPages: ['carbon-calculator', 'factories'],
  }),
  guide(1028, 'auditPrep', 'prepare-chiller-plant-energy-audit', {
    tag: tagCaas,
    type: typeGuide,
    nextActivityId: 1001,
    thumbnail: 'assets/guides/checklist.svg',
    relatedPages: ['engineer-downloads', 'contact'],
  }),
];
