import { SiteMeta } from './types';

/**
 * English titles, descriptions and page copy. Edit here; every page's
 * <title>, meta description, Open Graph tags and the sitemap read from it.
 * Keep titles under 60 characters (brand last) and descriptions 140–160.
 */
const meta: SiteMeta = {
  homeLabel: 'Home',
  home: {
    title: 'Chiller as a Service in Thailand | Infinity CoolMaster',
    description:
      'We install and own a high-efficiency chiller plant at your building with zero CapEx. You pay per unit of cooling, with IPMVP-verified savings. Book a free audit.',
  },
  about: {
    label: 'About',
    title: 'About Our Cooling-as-a-Service Team | Infinity CoolMaster',
    description:
      'Infinity CoolMaster is a Bangkok cooling-as-a-service provider. We design, finance, install and run chiller plants, with a 10% minimum saving guaranteed.',
  },
  caseStudies: {
    label: 'Case Studies',
    title: 'Chiller Energy Savings Case Studies | Infinity CoolMaster',
    description:
      'How offices, hospitals, resorts, malls, cold-chain hubs and data centers in Thailand cut cooling energy with chiller-as-a-service. Verified results, zero CapEx.',
  },
  insights: {
    label: 'Insights',
    title: 'Chiller & Cooling Insights | Infinity CoolMaster',
    description:
      'Guides on cooling as a service, chiller replacement, kW/TR benchmarks and IPMVP measurement for building owners, engineers and CFOs in Thailand. Read more.',
  },
  notFound: {
    title: 'Page Not Found | Infinity CoolMaster',
    description:
      'This page does not exist or has moved. Go to the Infinity CoolMaster homepage to learn about chiller-as-a-service in Thailand with zero upfront investment.',
    h1: 'Page not found',
    intro: 'This page does not exist or has moved.',
    backHome: 'Go to the homepage',
  },
  caseStudyTitle: (title, savingsPct) =>
    savingsPct > 0 ? `${title}: ${savingsPct}% Savings` : title,
  insightTitle: (title) => title,
  caseStudyDescriptionSuffix: 'Read the verified results.',
  insightDescriptionSuffix: 'Read the full article.',
  draftNotice:
    'TODO: this page is a placeholder. Write the copy before linking it from the menu; until then it is hidden from search engines (noindex) and from the sitemap.',
  draftSections: [
    'TODO: direct 2–3 sentence answer for this buyer (what we install, how they pay, contract length).',
    'TODO: the problems this sector has with cooling, with real numbers from our audits.',
    'TODO: how the contract works for this sector (pricing unit, uptime/redundancy, end-of-term options).',
    'TODO: a verified case study from this sector with a named or titled client quote.',
    'TODO: FAQ — 4 to 6 questions buyers in this sector ask, answered in full.',
  ],
  ctaAudit: 'Request a free cooling audit',
  firstProjectKicker: 'Project status',
  firstProjectTitle: 'Our first project is in testing and commissioning',
  firstProjectText:
    'Infinity CoolMaster’s first Cooling-as-a-Service chiller plant, for {client} in Rayong, is in testing and commissioning in November 2026. Once it is running, its savings will be measured every month against an IPMVP-aligned baseline, and we will publish the verified results here.',
  firstProjectLink: 'How we measure and verify savings',
  firstProjectUpdateLink: 'Read the project update',
  faqTitle: 'Frequently asked questions',
  lastUpdated: 'Last updated',
  furtherReading: 'Further reading',
  relatedPages: 'Read next',
  relatedCaseStudies: 'Related case studies',
  resourcesTitle: 'Resources',
  sectorsTitle: 'Sectors',
  sectorLinkLabel: 'How it works for this sector',
  calculatorTeaserTitle: 'Estimate your savings',
  calculatorTeaserText:
    'Enter your monthly electricity bill and facility type to see an estimated annual savings range.',
  calculatorTeaserLink: 'Open the savings calculator',
  pages: {
    hotels: {
      label: 'Hotels & Resorts',
      title: 'Hotel Chiller as a Service, Thailand | Infinity CoolMaster',
      description:
        'Chiller-as-a-service for hotels and resorts in Thailand: a new, efficient cooling plant with zero CapEx, paid per unit of cooling. Request a free audit today.',
      h1: 'Chiller as a service for hotels and resorts',
      intro:
        'Infinity CoolMaster, a chiller-as-a-service provider in Bangkok, installs and operates a high-efficiency chiller plant at your hotel or resort with no upfront cost. You pay for efficient cooling out of the savings, with a minimum 10% energy saving guaranteed in writing and verified every month.',
    },
    hospitals: {
      label: 'Hospitals',
      title: 'Hospital Chiller as a Service | Infinity CoolMaster',
      description:
        'Mission-critical chiller plants for Thai hospitals, financed, installed and run by us with zero CapEx and verified savings. Request a free cooling audit today.',
      h1: 'Chiller as a service for hospitals',
      intro:
        'We design, finance, install and run a redundant, high-efficiency chiller plant at your hospital with no upfront cost. Cooling stays on 24/7, the capital budget stays free for medical equipment, and a minimum 10% energy saving is guaranteed in writing.',
    },
    'shopping-malls': {
      label: 'Shopping Malls',
      title: 'Shopping Mall Cooling as a Service | Infinity CoolMaster',
      description:
        'Cooling-as-a-service for shopping malls and retail centres in Thailand: an efficient chiller plant with zero CapEx and IPMVP-verified savings. Book an audit.',
      h1: 'Cooling as a service for shopping malls',
      intro:
        'We cut a shopping mall’s cooling cost without capital spending: either by optimising the existing chiller plant or by funding and installing a new one. A minimum 10% energy saving is guaranteed in the contract and verified every month to IPMVP.',
    },
    factories: {
      label: 'Factories',
      title: 'Factory & Industrial Cooling Service | Infinity CoolMaster',
      description:
        'Process and comfort cooling for Thai factories as a service: we fund, install and operate the chiller plant, you pay per unit of cooling. Request an audit.',
      h1: 'Cooling as a service for factories',
      intro:
        'We fund, install and operate the chiller plant for your factory or cold-chain facility, and you pay for efficient cooling out of the savings. Reliability comes first, and a minimum 10% energy saving is guaranteed in writing.',
    },
    'office-buildings': {
      label: 'Office Buildings',
      title: 'Office Building Chiller as a Service | Infinity CoolMaster',
      description:
        'Replace an ageing office-tower chiller plant with zero CapEx. We own and run the new plant, you pay per unit of cooling with savings verified to IPMVP.',
      h1: 'Chiller as a service for office buildings',
      intro:
        'Replace an ageing office-building chiller plant without capital spending. Infinity CoolMaster funds, owns and operates the new plant for a 5–10 year contract, you pay for cooling out of the savings, and a minimum 10% saving is guaranteed in writing.',
    },
    'data-centers': {
      label: 'Data Centers',
      title: 'Data Center Cooling as a Service | Infinity CoolMaster',
      description:
        'Efficient, redundant cooling for data centers in Thailand, delivered as a service with zero CapEx and measured savings that support PUE reporting. Book an audit.',
      h1: 'Cooling as a service for data centers',
      intro:
        'We deliver efficient, redundant data-center cooling as a service, with no upfront cost. Optimisation starts in shadow mode so operators approve every change, and verified monthly energy data supports your PUE reporting.',
    },
    'pricing-model': {
      label: 'How Pricing Works',
      title: 'Pay-per-Use Cooling Pricing Explained | Infinity CoolMaster',
      description:
        'How chiller-as-a-service pricing works: no upfront cost, a rate per unit of cooling, and a worked example in Thai baht. See what a contract looks like.',
      h1: 'How cooling-as-a-service pricing works',
      intro:
        'Cooling-as-a-Service has no upfront cost. Infinity CoolMaster funds, owns and operates the chiller plant; you pay a service fee for efficient cooling that is covered by the energy savings, with a minimum 10% saving guaranteed in writing.',
    },
    'caas-vs-buying-chiller': {
      label: 'CaaS vs Buying',
      title: 'CaaS vs Buying a Chiller: Compared | Infinity CoolMaster',
      description:
        'Cooling as a service compared with buying, leasing or an ESCO contract: upfront cost, risk, maintenance and savings guarantees side by side. Read the comparison.',
      h1: 'Cooling as a service vs buying, leasing or ESCO',
      intro:
        'Buying a chiller means paying the full cost upfront and carrying the performance risk yourself. With Cooling-as-a-Service the provider funds, owns and runs the plant and guarantees the saving. This page compares buying, leasing, ESCO contracts and CaaS side by side.',
    },
    'chiller-replacement': {
      label: 'Chiller Replacement',
      title: 'Chiller Replacement With No CapEx | Infinity CoolMaster',
      description:
        'Replace an old, inefficient chiller plant without capital spending. We fund, install and operate the new plant and guarantee the savings. Request an audit.',
      h1: 'Chiller replacement with no capital outlay',
      intro:
        'You can replace an old, inefficient chiller plant without spending capital. Infinity CoolMaster funds, installs and operates the new plant, you pay for cooling out of the savings, and a minimum 10% energy saving is guaranteed in writing.',
    },
    'savings-calculator': {
      label: 'Savings Calculator',
      title: 'Chiller Energy Savings Calculator | Infinity CoolMaster',
      description:
        'Estimate how much your building could save on electricity with chiller-as-a-service. Enter your monthly bill and facility type to see an annual savings range.',
      h1: 'Chiller energy savings calculator',
      intro:
        'Enter your monthly electricity bill and facility type to see an estimated annual savings range. The figure is a rough estimate; a free on-site audit confirms your exact savings.',
    },
    'measurement-verification': {
      label: 'Measurement & Verification',
      title: 'IPMVP Measurement & Verification | Infinity CoolMaster',
      description:
        'How Infinity CoolMaster measures and verifies energy savings under IPMVP: baseline, metering, monthly reports and independent checks. See how savings are proven.',
      h1: 'How we measure and verify savings (IPMVP)',
      intro:
        'Every saving we guarantee is measured, not estimated. We agree an IPMVP-aligned baseline with you before work starts, meter the plant continuously and report the verified saving every month; you or a third party can audit the numbers.',
    },
    contact: {
      label: 'Contact',
      title: 'Book a Free Chiller Plant Audit | Infinity CoolMaster',
      description:
        'Request a free cooling audit. Our engineers analyse your chiller plant and quantify your guaranteed savings, free and with no obligation. Call +66 2 026 3344.',
      h1: 'Request a free cooling audit',
      intro:
        'Our engineers will analyse your plant and quantify your guaranteed savings potential, at no cost and with no obligation.',
    },
    team: {
      label: 'Our Team',
      title: 'Our Team & Engineers | Infinity CoolMaster',
      description:
        'Meet the engineers and leadership team behind Infinity CoolMaster, a chiller-as-a-service provider in Bangkok, with their licences and experience.',
      h1: 'Our team',
      intro:
        'TODO: add photos, names, titles, engineering licences and LinkedIn profiles.',
    },
  },
};

export default meta;
