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
  keyPointsTitle: 'Key points',
  tocTitle: 'In this article',
  readingTime: (minutes) => `${minutes} min read`,
  shareTitle: 'Share',
  copyLink: 'Copy link',
  linkCopied: 'Link copied',
  sourcesTitle: 'Sources',
  moreTools: 'More free tools',
  furtherReading: 'Further reading',
  relatedPages: 'Read next',
  relatedCaseStudies: 'Related case studies',
  resourcesTitle: 'Resources',
  resourcesTools: 'Tools',
  resourcesGuides: 'Guides',
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
        'Request a free cooling audit. Our engineers analyse your chiller plant and quantify your guaranteed savings, free and with no obligation. Call +66 82 096 6595.',
      h1: 'Request a free cooling audit',
      intro:
        'Our engineers will analyse your plant and quantify your guaranteed savings potential, at no cost and with no obligation.',
    },
    glossary: {
      label: 'Glossary',
      title: 'Chiller & Cooling Glossary | Infinity CoolMaster',
      description:
        'Plain-English definitions of chiller and cooling terms: TR, kW/TR, COP, delta-T, VSD, IPMVP, ESCO, PUE, TOU and more, for building owners and engineers in Thailand.',
      h1: 'Chiller and cooling glossary',
      intro:
        'Short definitions of the terms used in chiller plants, energy savings and Cooling-as-a-Service contracts. Each term has its own link, so you can share a single definition.',
    },
    'chiller-efficiency-check': {
      label: 'Chiller Efficiency Check',
      title: 'Chiller Efficiency (kW/TR) Check | Infinity CoolMaster',
      description:
        'Check your chiller plant’s efficiency in one minute: enter its electrical power and cooling output to get kW/TR, COP and a rating. Free tool for Thai buildings.',
      h1: 'How efficient is your chiller plant?',
      intro:
        'Enter your plant’s electrical power and cooling output to calculate its kW/TR and COP and see how it compares with rough industry bands. Use readings taken at the same moment, under normal load.',
    },
    'eastern-economic-corridor': {
      label: 'EEC Factories',
      title: 'EEC Factory Cooling as a Service | Infinity CoolMaster',
      description:
        'Chiller-as-a-service for factories in Rayong, Chonburi and Chachoengsao: we fund, install and run the plant, you pay from the savings. First project in Rayong.',
      h1: 'Cooling as a service for factories in the Eastern Economic Corridor',
      intro:
        'Infinity CoolMaster designs, funds, installs and operates chiller plants for factories in Rayong, Chonburi and Chachoengsao, with no upfront investment and a minimum 10% energy saving guaranteed in writing. Our first plant, for Platinum Pro Plastic in Nikhom Phatthana, Rayong, is in testing and commissioning in November 2026.',
    },
    'cooling-contract-calculator': {
      label: 'CaaS or Lease Calculator',
      title: 'CaaS or Lease Cost Calculator | Infinity CoolMaster',
      description:
        'Compare our two contracts for a new chiller plant: Cooling-as-a-Service paid from shared savings, or a lease with our maintenance. See the benefit year by year.',
      h1: 'Cooling-as-a-Service or lease: which contract suits you?',
      intro:
        'Infinity CoolMaster offers two ways to get a new chiller plant without buying it: Cooling-as-a-Service, where you pay a share of the measured savings, and an equipment lease with our maintenance, where you pay a fixed monthly amount and keep all the savings. Enter your figures to compare them over the contract term.',
    },
    'cost-of-waiting-calculator': {
      label: 'Cost of Waiting Calculator',
      title: 'Cost of Delaying Chiller Replacement | Infinity CoolMaster',
      description:
        'How much does an inefficient chiller plant cost you every month you wait? Enter its kW/TR, load, hours and tariff to see the extra electricity cost per month and year.',
      h1: 'What does waiting cost you?',
      intro:
        'An inefficient chiller plant costs more every month it keeps running. Enter its current efficiency, average load, operating hours and electricity price to see how much extra you pay compared with a well-run modern plant.',
    },
    'carbon-calculator': {
      label: 'CO₂ Savings Calculator',
      title: 'Chiller CO₂ Savings Calculator | Infinity CoolMaster',
      description:
        'Convert chiller plant energy savings into tonnes of CO₂ avoided, using Thailand’s TGO grid emission factor, for ESG and sustainability reporting. Free calculator.',
      h1: 'How much CO₂ would better cooling save?',
      intro:
        'Enter your chiller plant’s annual electricity use and the expected saving to see the energy saved and the CO₂ emissions avoided, using a Thai grid emission factor you can adjust to match your report.',
    },
    'engineer-downloads': {
      label: 'Free Downloads',
      title: 'Free Chiller Log Sheets & Checklists | Infinity CoolMaster',
      description:
        'Free Excel templates for chiller plant teams in Thai and English: a daily log sheet, a monthly maintenance checklist and an M&V data checklist. Download and use.',
      h1: 'Free templates for chiller plant teams',
      intro:
        'Practical Excel templates, in Thai and English, for the people who run chiller plants every day. Free to download, use and share.',
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
