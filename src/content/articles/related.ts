/**
 * Kept apart from the guides' text so pages can list related guides without
 * loading every article into the main bundle.
 */
/** Guides listed as "Further reading" on each standalone page. */
export const GUIDES_BY_PAGE: Record<string, string[]> = {
  hotels: [
    'hotel-resort-cooling-cost-reduction',
    'what-is-cooling-as-a-service',
    'reduce-chiller-plant-energy-use',
  ],
  hospitals: [
    'hospital-cooling-redundancy-n-plus-1-2n',
    'what-is-cooling-as-a-service',
    'signs-chiller-plant-needs-replacing',
  ],
  'shopping-malls': [
    'reduce-chiller-plant-energy-use',
    'water-cooled-vs-air-cooled-chillers',
    'kw-per-tr-chiller-plant-efficiency',
  ],
  factories: [
    'plastics-factory-process-cooling',
    'first-cooling-as-a-service-project-commissioning',
    'chiller-plant-maintenance-checklist',
  ],
  'office-buildings': [
    'signs-chiller-plant-needs-replacing',
    'chiller-replacement-cost-factors',
    'cooling-as-a-service-cfo-questions',
  ],
  'data-centers': [
    'data-center-cooling-pue',
    'kw-per-tr-chiller-plant-efficiency',
    'ipmvp-options-a-b-c-d-explained',
  ],
  'pricing-model': [
    'cooling-as-a-service-cfo-questions',
    'cooling-as-a-service-contract-length-end-of-term',
    'what-is-cooling-as-a-service',
  ],
  'caas-vs-buying-chiller': [
    'what-is-cooling-as-a-service',
    'cooling-as-a-service-cfo-questions',
    'chiller-replacement-cost-factors',
  ],
  'chiller-replacement': [
    'signs-chiller-plant-needs-replacing',
    'chiller-replacement-cost-factors',
    'water-cooled-vs-air-cooled-chillers',
  ],
  'measurement-verification': [
    'ipmvp-options-a-b-c-d-explained',
    'kw-per-tr-chiller-plant-efficiency',
    'cooling-as-a-service-cfo-questions',
  ],
  'savings-calculator': [
    'reduce-chiller-plant-energy-use',
    'kw-per-tr-chiller-plant-efficiency',
    'chiller-replacement-cost-factors',
  ],
};
