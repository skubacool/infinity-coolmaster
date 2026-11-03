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
      intro: 'TODO: write the hotel page introduction.',
    },
    hospitals: {
      label: 'Hospitals',
      title: 'Hospital Chiller as a Service | Infinity CoolMaster',
      description:
        'Mission-critical chiller plants for Thai hospitals, financed, installed and run by us with zero CapEx and verified savings. Request a free cooling audit today.',
      h1: 'Chiller as a service for hospitals',
      intro: 'TODO: write the hospital page introduction.',
    },
    'shopping-malls': {
      label: 'Shopping Malls',
      title: 'Shopping Mall Cooling as a Service | Infinity CoolMaster',
      description:
        'Cooling-as-a-service for shopping malls and retail centres in Thailand: an efficient chiller plant with zero CapEx and IPMVP-verified savings. Book an audit.',
      h1: 'Cooling as a service for shopping malls',
      intro: 'TODO: write the shopping mall page introduction.',
    },
    factories: {
      label: 'Factories',
      title: 'Factory & Industrial Cooling Service | Infinity CoolMaster',
      description:
        'Process and comfort cooling for Thai factories as a service: we fund, install and operate the chiller plant, you pay per unit of cooling. Request an audit.',
      h1: 'Cooling as a service for factories',
      intro: 'TODO: write the factory page introduction.',
    },
    'office-buildings': {
      label: 'Office Buildings',
      title: 'Office Building Chiller as a Service | Infinity CoolMaster',
      description:
        'Replace an ageing office-tower chiller plant with zero CapEx. We own and run the new plant, you pay per unit of cooling with savings verified to IPMVP.',
      h1: 'Chiller as a service for office buildings',
      intro: 'TODO: write the office building page introduction.',
    },
    'data-centers': {
      label: 'Data Centers',
      title: 'Data Center Cooling as a Service | Infinity CoolMaster',
      description:
        'Efficient, redundant cooling for data centers in Thailand, delivered as a service with zero CapEx and measured savings that support PUE reporting. Book an audit.',
      h1: 'Cooling as a service for data centers',
      intro: 'TODO: write the data center page introduction.',
    },
    'pricing-model': {
      label: 'How Pricing Works',
      title: 'Pay-per-Use Cooling Pricing Explained | Infinity CoolMaster',
      description:
        'How chiller-as-a-service pricing works: no upfront cost, a rate per unit of cooling, and a worked example in Thai baht. See what a contract looks like.',
      h1: 'How cooling-as-a-service pricing works',
      intro:
        'TODO: explain the pay-per-unit model with a worked THB example (use our real contract terms).',
    },
    'caas-vs-buying-chiller': {
      label: 'CaaS vs Buying',
      title: 'CaaS vs Buying a Chiller: Compared | Infinity CoolMaster',
      description:
        'Cooling as a service compared with buying, leasing or an ESCO contract: upfront cost, risk, maintenance and savings guarantees side by side. Read the comparison.',
      h1: 'Cooling as a service vs buying, leasing or ESCO',
      intro: 'TODO: write the comparison introduction and table.',
    },
    'chiller-replacement': {
      label: 'Chiller Replacement',
      title: 'Chiller Replacement With No CapEx | Infinity CoolMaster',
      description:
        'Replace an old, inefficient chiller plant without capital spending. We fund, install and operate the new plant and guarantee the savings. Request an audit.',
      h1: 'Chiller replacement with no capital outlay',
      intro: 'TODO: write the chiller replacement page introduction.',
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
        'TODO: write the M&V page introduction; link a sample anonymised M&V report.',
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
