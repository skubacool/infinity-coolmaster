import { PageBodies } from './types';

/**
 * English body copy for the standalone pages. Facts used here are the ones
 * already stated elsewhere on the site (minimum 10% saving guaranteed in
 * writing, 5–10 year contracts, we own and maintain the plant, IPMVP-aligned
 * monthly M&V, 24/7 monitoring, CPMS). Keep it that way: no figures that are
 * not in a signed contract or a verified report.
 */

const HOW_IT_WORKS = [
  'We design, finance, install and operate a high-efficiency chilled-water plant at your site. You pay nothing upfront.',
  'Infinity CoolMaster owns, insures and maintains the equipment for the whole contract, so it never sits on your balance sheet.',
  'You pay for efficient cooling out of the savings the new plant creates, so cash flow is positive from the first month.',
  'A minimum 10% energy saving is written into the contract and measured every month against an IPMVP-aligned baseline. If savings fall short, we pay the difference.',
  'Contracts typically run 5–10 years. At the end you can renew, or take ownership of the plant under agreed transfer terms.',
];

const COMMON_FAQS = {
  invest: {
    question: 'Do we need to invest anything?',
    answer:
      'No. Design, equipment, installation and operation for the life of the contract are financed by Infinity CoolMaster. You pay for cooling from the savings the system creates.',
  },
  shortfall: {
    question: 'What happens if savings fall below the guarantee?',
    answer:
      'We compensate the shortfall. The minimum saving is written into the contract and measured each month against a baseline agreed before any work starts.',
  },
  disruption: {
    question: 'Will installation disrupt our operations?',
    answer:
      'No. Work is planned around your operating schedule, switchovers happen off-hours, and redundancy is kept in place throughout, so cooling never stops.',
  },
  end: {
    question: 'What happens at the end of the contract?',
    answer:
      'You choose: renew the service, or take ownership of the plant under transfer terms agreed in the original contract.',
  },
};

const pages: PageBodies = {
  hotels: {
    sector: 'hospitality',
    sections: [
      {
        heading: 'Why cooling matters so much in a hotel',
        paragraphs: [
          'In a Thai hotel or resort the chiller plant runs day and night, all year. It is usually the largest single electricity load on the property, and every baht it wastes comes straight out of gross operating profit (GOP).',
          'Occupancy swings between check-in waves, events and quiet nights, while tropical humidity stays high. Plants are often oversized and run at fixed setpoints, so they burn energy cooling rooms and corridors nobody is using.',
        ],
      },
      {
        heading: 'How chiller-as-a-service works for hotels',
        bullets: HOW_IT_WORKS,
      },
      {
        heading: 'What we optimise on a hotel plant',
        bullets: [
          'Chilled-water production matched hour by hour to occupancy, weather and the event calendar.',
          'Chillers, pumps and cooling towers tuned together by our Chiller Plant Management System (CPMS) and machine-learning models.',
          'Guest comfort first: setpoints stay inside agreed comfort limits, with alarms watched by our 24/7 monitoring center.',
          'Monthly savings reports your finance team and owners can audit.',
        ],
      },
    ],
    faqs: [
      COMMON_FAQS.invest,
      {
        question: 'Will guests notice any change in comfort?',
        answer:
          'Comfort limits are part of the contract. The plant is optimised inside them, and our monitoring center watches the plant around the clock.',
      },
      COMMON_FAQS.disruption,
      COMMON_FAQS.end,
    ],
  },

  hospitals: {
    sector: 'healthcare',
    sections: [
      {
        heading: 'Hospital cooling cannot stop',
        paragraphs: [
          'Operating theatres, ICUs, laboratories and pharmacies need cooling 24 hours a day, at stable temperature and humidity. A failure is a clinical risk, not just a comfort complaint.',
          'At the same time, an ageing chiller plant is one of a hospital’s largest utility costs, and replacing it competes with medical equipment for the capital budget.',
        ],
      },
      {
        heading: 'How chiller-as-a-service works for hospitals',
        bullets: HOW_IT_WORKS,
      },
      {
        heading: 'Built for 24/7 uptime',
        bullets: [
          'Redundant plant design (for example N+1) agreed with your engineering team.',
          'Predictive fault detection in our CPMS flags anomalies before they become failures.',
          'A 24/7 monitoring center and on-call engineers.',
          'Capital that would have gone into chillers stays available for clinical equipment.',
        ],
      },
    ],
    faqs: [
      COMMON_FAQS.invest,
      {
        question: 'How do you protect uptime during installation?',
        answer:
          'Switchovers are scheduled off-hours and redundancy is maintained throughout the transition, so critical areas keep their cooling.',
      },
      COMMON_FAQS.shortfall,
      COMMON_FAQS.end,
    ],
  },

  'shopping-malls': {
    sector: 'retail',
    sections: [
      {
        heading: 'Cooling is a mall’s largest controllable cost',
        paragraphs: [
          'Shopping malls live on comfort: shoppers stay longer in a cool, fresh building. But the cooling load swings widely with footfall, weather, cinema schedules and tenant mix, and a plant run at fixed settings wastes a large share of its energy.',
          'Not every mall needs new chillers. Where the existing plant is in good condition, optimisation of the controls alone can deliver verified savings.',
        ],
      },
      {
        heading: 'How chiller-as-a-service works for shopping malls',
        bullets: HOW_IT_WORKS,
      },
      {
        heading: 'Retrofit or replace',
        bullets: [
          'Retrofit: we add our CPMS control layer and machine-learning optimisation to the existing plant and air-handling units.',
          'Replace: where chillers are near end of life, we fund and install a new high-efficiency plant.',
          'Either way the saving is guaranteed in the contract and verified every month.',
        ],
      },
    ],
    faqs: [
      COMMON_FAQS.invest,
      {
        question: 'Do we have to replace our chillers?',
        answer:
          'Not necessarily. After the free audit we recommend either optimising the existing plant or replacing equipment, whichever gives the better guaranteed result.',
      },
      COMMON_FAQS.disruption,
      COMMON_FAQS.shortfall,
    ],
  },

  factories: {
    sector: 'industrial',
    sections: [
      {
        heading: 'Process cooling with energy-intensity targets',
        paragraphs: [
          'In a factory or cold-chain facility, cooling protects product quality and throughput. A temperature excursion can mean lost inventory, so reliability comes first. Energy-intensity targets and rising electricity tariffs mean efficiency now matters just as much.',
        ],
      },
      {
        heading: 'How chiller-as-a-service works for factories',
        bullets: HOW_IT_WORKS,
      },
      {
        heading: 'What we deliver on industrial sites',
        bullets: [
          'Process and comfort cooling engineered for reliability and stable setpoints.',
          'Continuous optimisation of chillers, pumps and cooling towers against production schedules and ambient conditions.',
          'Temperature and energy data logged for audits and energy reporting.',
          'Capital stays in production equipment instead of utilities.',
        ],
      },
      {
        heading: 'Plastics and packaging manufacturers',
        paragraphs: [
          'In injection moulding, blow moulding and extrusion, chilled water cools the moulds and machines, so cooling sets cycle times and part quality as well as the energy bill. Our first Cooling-as-a-Service plant, for Platinum Pro Plastic, a Rayong-based injection-moulding manufacturer of plastic pallets, crates and bins, is in testing and commissioning in November 2026.',
        ],
        bullets: [
          'Stable mould water temperatures for consistent parts and cycle times.',
          'Loads grouped by the temperature they really need, so chillers are not used where cooling-tower water will do.',
          'Plant output that follows the production schedule across shifts.',
        ],
      },
    ],
    faqs: [
      COMMON_FAQS.invest,
      COMMON_FAQS.disruption,
      COMMON_FAQS.shortfall,
      COMMON_FAQS.end,
    ],
  },

  'office-buildings': {
    sector: 'commercial',
    sections: [
      {
        heading: 'An ageing plant is a large, unplanned capital bill',
        paragraphs: [
          'Office towers and mixed-use buildings typically run a central chilled-water plant. When the chillers reach the end of their life, owners face a replacement that can run into tens of millions of baht, at a time when the budget is already committed elsewhere.',
          'Chiller-as-a-service replaces that capital bill with a service: we fund the new plant, and you pay for the cooling from the savings it produces.',
        ],
      },
      {
        heading: 'How chiller-as-a-service works for office buildings',
        bullets: HOW_IT_WORKS,
      },
      {
        heading: 'Why owners and REITs choose it',
        bullets: [
          'No capital outlay and no equipment on the balance sheet.',
          'Lower operating cost from day one, with the saving guaranteed in writing.',
          'Monthly, auditable energy data that supports green-building certification and ESG reporting.',
          'Tenant comfort managed by our CPMS and 24/7 monitoring center.',
        ],
      },
    ],
    faqs: [
      COMMON_FAQS.invest,
      {
        question: 'Who owns the equipment?',
        answer:
          'Infinity CoolMaster owns, insures and maintains the plant for the full contract term. At the end you can renew, or take ownership under agreed transfer terms.',
      },
      COMMON_FAQS.disruption,
      COMMON_FAQS.shortfall,
    ],
  },

  'data-centers': {
    sector: 'data-center',
    sections: [
      {
        heading: 'Cooling efficiency drives PUE',
        paragraphs: [
          'In a data center, cooling is the largest load after the IT equipment itself, so it decides the facility’s Power Usage Effectiveness (PUE). Mission-critical loads leave no room for experiments: any optimisation has to protect redundancy and maintainability.',
        ],
      },
      {
        heading: 'How chiller-as-a-service works for data centers',
        bullets: HOW_IT_WORKS,
      },
      {
        heading: 'Optimisation without risk',
        bullets: [
          'Shadow mode first: our machine-learning engine recommends setpoints, and your operators approve them before any automation is switched on.',
          'Redundancy and maintainability requirements are written into the design.',
          'Verified monthly energy data that feeds directly into PUE reporting.',
          '24/7 monitoring and predictive fault detection.',
        ],
      },
    ],
    faqs: [
      COMMON_FAQS.invest,
      {
        question: 'How do you avoid risk to live IT loads?',
        answer:
          'Optimisation starts in shadow mode: recommendations are reviewed and approved by your operators before automation is enabled, and redundancy is never reduced.',
      },
      COMMON_FAQS.shortfall,
      COMMON_FAQS.end,
    ],
  },

  'pricing-model': {
    sections: [
      {
        heading: 'What you pay for',
        paragraphs: [
          'With Cooling-as-a-Service you do not buy chillers. Infinity CoolMaster designs, finances, installs, owns and operates the plant. You pay a service fee for efficient cooling, and the contract is structured so that the fee is paid out of the energy savings the new plant creates.',
          'Because a minimum saving is guaranteed in writing, your total cost of cooling (electricity plus service fee) is designed to be lower than what you pay today.',
        ],
      },
      {
        heading: 'What is included',
        bullets: [
          'Engineering design and the free initial audit.',
          'All equipment: chillers, pumps, cooling towers, controls and metering.',
          'Installation, commissioning and project management.',
          'Operation, maintenance, insurance and spare parts for the full contract.',
          'Our CPMS optimisation, 24/7 monitoring and monthly IPMVP-aligned savings reports.',
        ],
      },
      {
        heading: 'How the numbers are set',
        bullets: [
          'Step 1 — Audit: we analyse 12 months of electricity bills and survey your plant.',
          'Step 2 — Baseline: we agree a baseline model with you, aligned with IPMVP, built from at least 12 months of interval data.',
          'Step 3 — Proposal: you receive a written offer with the guaranteed saving percentage, the fee structure and the contract terms.',
          'Step 4 — Every month: actual consumption is compared with the adjusted baseline. If savings fall below the guarantee, we compensate the shortfall.',
        ],
      },
      {
        heading: 'Contract terms at a glance',
        table: {
          headers: ['Term', 'Typical arrangement'],
          rows: [
            ['Upfront investment', 'None'],
            [
              'Contract length',
              'Typically 5–10 years, depending on plant size and scope',
            ],
            ['Equipment ownership', 'Infinity CoolMaster, for the full term'],
            ['Maintenance and insurance', 'Included'],
            ['Savings guarantee', 'Minimum 10%, written into the contract'],
            ['Measurement', 'Monthly, against an IPMVP-aligned baseline'],
            [
              'End of term',
              'Renew, or take ownership under agreed transfer terms',
            ],
          ],
        },
        paragraphs: [
          'Your exact fee depends on your plant, load profile and tariff, so it is set in the written proposal after the free audit.',
        ],
      },
    ],
    faqs: [
      COMMON_FAQS.invest,
      {
        question: 'How long is the contract?',
        answer:
          'Typically 5–10 years, depending on plant size and scope. Longer terms let us invest in deeper upgrades and guarantee larger savings.',
      },
      COMMON_FAQS.shortfall,
      COMMON_FAQS.end,
    ],
  },

  'caas-vs-buying-chiller': {
    sections: [
      {
        heading: 'Four ways to get a new cooling plant',
        paragraphs: [
          'When a chiller plant reaches the end of its life, a building owner usually has four options: buy new equipment, lease it, sign an energy-performance (ESCO) contract, or move to Cooling-as-a-Service (CaaS). They differ in who pays upfront, who carries the performance risk and who runs the plant.',
        ],
      },
      {
        heading: 'Side-by-side comparison',
        table: {
          headers: [
            '',
            'Buy',
            'Lease',
            'ESCO contract',
            'Cooling-as-a-Service',
          ],
          rows: [
            [
              'Upfront capital',
              'Full cost',
              'Low or none',
              'Varies; often shared',
              'None',
            ],
            [
              'Who owns the plant',
              'You',
              'Lessor',
              'Usually you',
              'Provider, for the contract term',
            ],
            [
              'On your balance sheet',
              'Yes',
              'Usually yes',
              'Usually yes',
              'No equipment asset',
            ],
            ['Operation and maintenance', 'You', 'You', 'Varies', 'Provider'],
            [
              'Energy-performance risk',
              'You',
              'You',
              'Shared, per contract',
              'Provider, with a written minimum saving',
            ],
            [
              'Savings measurement',
              'Optional',
              'Rare',
              'Usually IPMVP',
              'Monthly, IPMVP-aligned',
            ],
            [
              'End of term',
              'You own it',
              'Return or buy out',
              'You own it',
              'Renew, or take ownership on agreed terms',
            ],
          ],
        },
        paragraphs: [
          'Lease and ESCO terms vary widely between providers; the table shows typical arrangements, not any specific offer.',
        ],
      },
      {
        heading: 'When Cooling-as-a-Service is the better fit',
        bullets: [
          'Capital is committed to your core business, not to utilities.',
          'You want one partner responsible for performance, operation and maintenance.',
          'Your finance team wants a guaranteed, measured saving rather than an engineering estimate.',
          'You prefer to keep plant equipment off the balance sheet.',
        ],
      },
      {
        heading: 'When buying may be better',
        bullets: [
          'You have capital available and a strong in-house engineering team to operate and optimise the plant.',
          'You want full control of equipment choice and maintenance from day one.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Cooling-as-a-Service the same as an ESCO contract?',
        answer:
          'No. In a typical ESCO contract the client often funds or owns the equipment and the ESCO guarantees savings. In Cooling-as-a-Service the provider funds, owns, operates and maintains the plant, and you pay for efficient cooling.',
      },
      COMMON_FAQS.end,
      COMMON_FAQS.shortfall,
    ],
  },

  'chiller-replacement': {
    sections: [
      {
        heading: 'The problem with an ageing chiller plant',
        paragraphs: [
          'Older chillers lose efficiency every year, break down more often and may use refrigerants that are being phased out. Replacing them is one of the largest capital items a building owner faces, and it is easy to postpone while the energy bill keeps rising.',
        ],
      },
      {
        heading: 'Replace your plant without capital spending',
        bullets: HOW_IT_WORKS,
      },
      {
        heading: 'How a replacement project runs',
        bullets: [
          'Free cooling audit: 12 months of bills and a survey of your plant.',
          'Guaranteed proposal: savings percentage, contract terms and an IPMVP baseline agreed before work starts.',
          'We invest and install, around your operating schedule, with redundancy kept in place.',
          'Our CPMS and machine-learning models operate the plant, watched by a 24/7 monitoring center.',
          'A savings report every month; any shortfall against the guarantee is on us.',
        ],
      },
    ],
    faqs: [
      COMMON_FAQS.invest,
      COMMON_FAQS.disruption,
      {
        question: 'Do we have to replace every chiller?',
        answer:
          'No. The audit shows whether full replacement, partial replacement or control optimisation of the existing plant gives the best guaranteed result.',
      },
      COMMON_FAQS.end,
    ],
  },

  'measurement-verification': {
    sections: [
      {
        heading: 'Why measurement matters',
        paragraphs: [
          'A savings guarantee is only worth something if the savings can be measured in a way both sides trust. We follow the International Performance Measurement and Verification Protocol (IPMVP), the international standard for proving energy savings.',
        ],
      },
      {
        heading: 'Our M&V process',
        bullets: [
          'Baseline: before any work begins, we agree a baseline model with you, built from at least 12 months of interval data.',
          'Adjustments: the baseline is adjusted for factors outside our control, such as weather and occupancy, as defined in the contract.',
          'Metering: energy and cooling output are metered continuously on the plant.',
          'Monthly report: actual consumption is compared with the adjusted baseline, and the verified saving is reported every month.',
          'Audit: the data and calculations are open to you or an independent third party.',
        ],
      },
      {
        heading: 'What happens with the result',
        paragraphs: [
          'The verified saving is compared with the minimum written into the contract. If it falls short, we compensate the difference. The same monthly data supports ESG, green-building and energy reporting.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can a third party check the savings?',
        answer:
          'Yes. The baseline, metering data and monthly calculations are auditable by you or by an independent third party.',
      },
      COMMON_FAQS.shortfall,
    ],
  },
};

export default pages;
