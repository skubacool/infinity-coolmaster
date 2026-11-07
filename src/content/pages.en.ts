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
  glossary: {
    sections: [],
    terms: [
      {
        id: 'tr',
        term: 'Ton of refrigeration (TR)',
        definition:
          'A rate of cooling equal to 12,000 BTU per hour, or about 3.517 kW of heat removed. Chiller and plant sizes in Thailand are usually stated in TR.',
      },
      {
        id: 'kw-per-tr',
        term: 'kW/TR',
        definition:
          'The electrical power a chiller or a whole chiller plant uses for each ton of cooling it delivers. Lower is better; whole-plant kW/TR includes chillers, pumps and cooling-tower fans.',
      },
      {
        id: 'cop',
        term: 'Coefficient of performance (COP)',
        definition:
          'Cooling delivered divided by electrical power used, both in kW. COP = 3.517 ÷ kW/TR, so a plant at 0.80 kW/TR has a COP of about 4.4. Higher is better.',
      },
      {
        id: 'iplv',
        term: 'IPLV / NPLV',
        definition:
          'Integrated (or non-standard) part load value: a single efficiency figure that weights a chiller’s performance at 100%, 75%, 50% and 25% load. It reflects real operation better than full-load efficiency, because chillers spend most hours at part load.',
      },
      {
        id: 'chiller',
        term: 'Chiller',
        definition:
          'A machine that produces chilled water by removing heat with a refrigeration cycle. The chilled water is pumped to air-handling units and process equipment.',
      },
      {
        id: 'water-cooled-chiller',
        term: 'Water-cooled chiller',
        definition:
          'A chiller that rejects heat into condenser water, which is cooled in cooling towers. Usually the most efficient choice for large plants in hot climates.',
      },
      {
        id: 'air-cooled-chiller',
        term: 'Air-cooled chiller',
        definition:
          'A chiller that rejects heat directly to outdoor air through fans and coils. It needs no cooling towers or water treatment but loses efficiency as outdoor temperature rises.',
      },
      {
        id: 'cooling-tower',
        term: 'Cooling tower',
        definition:
          'Equipment that cools condenser water by evaporating a small part of it into the air. It needs water treatment to prevent scale, corrosion and biological growth.',
      },
      {
        id: 'chilled-water',
        term: 'Chilled water',
        definition:
          'The cold water a chiller produces and pumps around the building or process to absorb heat; it returns warmer and is cooled again.',
      },
      {
        id: 'condenser-water',
        term: 'Condenser water',
        definition:
          'The water loop that carries heat from a water-cooled chiller to the cooling towers.',
      },
      {
        id: 'delta-t',
        term: 'Delta-T (ΔT)',
        definition:
          'The temperature difference between chilled water leaving and returning to the plant. A low delta-T means more water must be pumped and more chillers run for the same cooling.',
      },
      {
        id: 'vsd',
        term: 'Variable-speed drive (VSD)',
        definition:
          'An electronic drive that changes a motor’s speed to match the load. Because pump and fan power rises steeply with speed, slowing them at part load saves a lot of energy.',
      },
      {
        id: 'variable-primary-flow',
        term: 'Variable primary flow',
        definition:
          'A chilled-water system design in which the chiller pumps vary their flow with the load, instead of running at constant flow with separate secondary pumps.',
      },
      {
        id: 'magnetic-bearing-chiller',
        term: 'Magnetic-bearing chiller',
        definition:
          'A centrifugal chiller whose compressor shaft floats on magnetic bearings, with no oil and very low friction. Typically very efficient at part load.',
      },
      {
        id: 'part-load',
        term: 'Part load',
        definition:
          'Operation below a plant’s full design capacity. Most chiller plants spend most of the year at part load, so part-load efficiency matters most.',
      },
      {
        id: 'baseline',
        term: 'Baseline (energy baseline)',
        definition:
          'A model of how much energy a facility would use without an improvement, built from data measured before the project and adjusted for weather, occupancy or production. Savings are measured against it.',
      },
      {
        id: 'ipmvp',
        term: 'IPMVP',
        definition:
          'The International Performance Measurement and Verification Protocol: the international standard for proving energy savings by comparing actual energy use with an adjusted baseline. It offers Options A, B, C and D.',
      },
      {
        id: 'm-and-v',
        term: 'Measurement and verification (M&V)',
        definition:
          'The process of metering, calculating and reporting energy savings, usually following IPMVP, so both parties can check a savings guarantee.',
      },
      {
        id: 'cmvp',
        term: 'CMVP',
        definition:
          'Certified Measurement and Verification Professional: a certification for engineers who plan and review M&V, issued under the organisation behind IPMVP.',
      },
      {
        id: 'esco',
        term: 'ESCO',
        definition:
          'Energy service company: a company that delivers energy-saving projects, often under an energy-performance contract that guarantees savings. The client often funds or owns the equipment.',
      },
      {
        id: 'caas',
        term: 'Cooling-as-a-Service (CaaS)',
        definition:
          'A model in which a provider designs, finances, installs, owns and operates a cooling plant, and the client pays for the cooling instead of buying equipment. Also called chiller-as-a-service.',
      },
      {
        id: 'pue',
        term: 'Power usage effectiveness (PUE)',
        definition:
          'A data center’s total energy divided by the energy used by its IT equipment. A PUE of 1.0 would mean no overhead; cooling is usually the largest part of the overhead.',
      },
      {
        id: 'redundancy',
        term: 'N, N+1 and 2N',
        definition:
          'Levels of redundancy. N is just enough capacity for the load; N+1 adds one spare unit; 2N means two complete independent systems, each able to carry the full load.',
      },
      {
        id: 'tou',
        term: 'TOU tariff',
        definition:
          'A time-of-use electricity tariff with a higher price in peak hours (in Thailand, generally 09:00–22:00 on weekdays) and a lower price off-peak, nights, weekends and holidays.',
      },
      {
        id: 'ft',
        term: 'Ft charge',
        definition:
          'Thailand’s automatic tariff adjustment for fuel and power-purchase costs, added to each unit of electricity and reviewed by the Energy Regulatory Commission every four months.',
      },
      {
        id: 'designated-facility',
        term: 'Designated factory or building',
        definition:
          'Under Thailand’s Energy Conservation Promotion Act, a factory or building with an electricity meter of 1,000 kW or more, transformers of 1,175 kVA or more, or energy use of 20 million MJ a year or more. It must appoint a person responsible for energy and manage its energy use.',
      },
      {
        id: 'hfc',
        term: 'HFC refrigerants and the Kigali Amendment',
        definition:
          'Hydrofluorocarbons are refrigerants with high global-warming potential. The Kigali Amendment to the Montreal Protocol phases them down; Thailand ratified it in April 2024.',
      },
      {
        id: 'thermal-energy-storage',
        term: 'Thermal energy storage',
        definition:
          'Storing cooling as chilled water or ice, usually made off-peak at night, and using it during peak hours to cut peak electricity demand and cost.',
      },
      {
        id: 'cpms',
        term: 'Chiller plant management system (CPMS)',
        definition:
          'Software that monitors and controls a chiller plant as one system. Infinity CoolMaster’s CPMS uses machine learning to set chillers, pumps and cooling towers for the lowest total power.',
      },
    ],
  },
  'chiller-efficiency-check': {
    sections: [
      {
        heading: 'What to measure',
        bullets: [
          'Electrical power (kW) of the chillers, chilled-water pumps, condenser-water pumps and cooling-tower fans, from meters or a power logger.',
          'Cooling output: either the TR reading from a BTU or energy meter, or chilled-water flow (m³/h) with supply and return temperatures.',
          'Take all readings at the same time, under normal operation, and repeat at different loads and times of day.',
        ],
      },
      {
        heading: 'How to read the result',
        paragraphs: [
          'A single reading is a snapshot. Plants spend most hours at part load, so the number that matters for cost is the average over a full year. Use this check to see roughly where your plant stands, then measure properly.',
        ],
        table: {
          headers: ['Whole-plant kW/TR', 'Rough reading (water-cooled plants)'],
          rows: [
            ['About 0.6–0.8', 'A well-designed, well-controlled modern plant'],
            ['About 0.8–1.0', 'Reasonable, usually with room to improve'],
            [
              'Above 1.0',
              'Typical of older or poorly controlled plants, often with large savings potential',
            ],
          ],
        },
      },
    ],
    faqs: [
      {
        question: 'Why include pumps and cooling towers?',
        answer:
          'Your electricity bill pays for the whole plant. A very efficient chiller with oversized constant-speed pumps can still make an inefficient plant, so whole-plant kW/TR is the figure that matters for cost.',
      },
      {
        question: 'Are these bands a standard?',
        answer:
          'No. They are rough bands often quoted in engineering literature for water-cooled plants. Climate, load profile and plant type all shift them; a proper audit compares your plant with what a redesign could achieve.',
      },
      {
        question: 'What if my plant scores poorly?',
        answer:
          'Request a free cooling audit. We analyse 12 months of bills and survey the plant; under Cooling-as-a-Service we can fund the improvement and guarantee a minimum 10% saving in writing.',
      },
    ],
  },
  'eastern-economic-corridor': {
    sector: 'industrial',
    sections: [
      {
        heading: 'Why the EEC',
        paragraphs: [
          'Rayong, Chonburi and Chachoengsao host a large share of Thailand’s manufacturing: plastics, automotive, electronics, petrochemicals and food. Many of these factories depend on chilled water for their processes, and many run plants that are oversized, ageing or controlled at fixed settings.',
          'Our first Cooling-as-a-Service plant is in Nikhom Phatthana, Rayong, for Platinum Pro Plastic, an injection-moulding manufacturer of plastic pallets, crates and bins.',
        ],
      },
      {
        heading: 'How it works for a factory',
        bullets: [
          'Free audit: 12 months of electricity bills, production data and a survey of the plant.',
          'Written proposal with the guaranteed saving, contract terms and an IPMVP-aligned baseline adjusted for production and weather.',
          'We fund and install the plant around your production schedule, keeping cooling running throughout.',
          'We own, operate and maintain the plant for a typical 5–10 year term, with 24/7 monitoring.',
          'Monthly savings reports; if the saving falls below the guarantee, we pay the difference.',
        ],
      },
      {
        heading: 'What we look at in a factory plant',
        bullets: [
          'Which loads truly need chilled water and which can run on warmer cooling-tower water.',
          'Stable supply temperature for moulds and processes, at the flow each machine needs.',
          'Plant output that follows production across shifts, weekends and holidays.',
          'Peak-hour electricity under TOU tariffs, and whether the site is a designated factory under the energy conservation law.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you only work in the EEC?',
        answer:
          'No. We serve buildings and factories across Thailand; this page covers the eastern industrial provinces, where our first project is.',
      },
      {
        question: 'Will installation stop production?',
        answer:
          'No. Work is planned around your production schedule, switchovers happen outside production hours where possible, and redundancy is kept in place throughout.',
      },
      {
        question: 'Do we need to invest anything?',
        answer:
          'No. Infinity CoolMaster funds the plant and you pay for cooling from the savings, with a minimum 10% energy saving guaranteed in writing.',
      },
    ],
  },
  'cooling-contract-calculator': {
    sections: [
      {
        heading: 'The two contracts',
        table: {
          headers: ['', 'Cooling-as-a-Service', 'Lease with our maintenance'],
          rows: [
            ['Upfront investment', 'None', 'None'],
            [
              'What you pay',
              'A share of the measured energy savings',
              'A fixed monthly lease payment',
            ],
            [
              'Energy savings',
              'Shared; a minimum 10% saving is guaranteed in writing',
              'Yours in full',
            ],
            [
              'Maintenance',
              'Included: we operate and maintain the plant',
              'Included: we maintain the plant',
            ],
            [
              'Who owns the plant',
              'Infinity CoolMaster, during the contract',
              'Set in the lease terms',
            ],
            [
              'Measurement',
              'Monthly, against an IPMVP-aligned baseline',
              'Monthly energy reports',
            ],
            [
              'If savings fall short',
              'Our fee falls with them; the minimum saving is guaranteed',
              'The lease payment stays the same',
            ],
            [
              'Performance risk',
              'Carried by Infinity CoolMaster',
              'Carried by you',
            ],
            [
              'Best when',
              'You want payments to follow results and no performance risk (our recommendation for most sites)',
              'You have a strong in-house team and want a fixed payment',
            ],
          ],
        },
      },
      {
        heading: 'How the calculator works',
        bullets: [
          'Cooling-as-a-Service: your yearly benefit is the energy saving minus our share of it. If savings are lower, our fee is lower too.',
          'Lease: your yearly benefit is the full energy saving minus the fixed lease payment, calculated like a loan from the plant cost, the interest rate and the term.',
          'All figures are estimates. Your actual fee, lease payment and guaranteed saving are set in a written proposal after a free audit, and savings are measured and verified monthly.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Which contract do you recommend?',
        answer:
          'For most factories and buildings we recommend Cooling-as-a-Service: you pay nothing upfront, our fee follows the measured savings, and a minimum 10% saving is guaranteed in writing. A lease suits owners who want to keep the full saving and are comfortable carrying the risk of a fixed payment.',
      },
      {
        question: 'Can I switch between the two models?',
        answer:
          'Both are discussed in the same audit and proposal, so you can compare real numbers for your plant before choosing.',
      },
      {
        question: 'Is the 10% minimum saving guaranteed under both?',
        answer:
          'Under Cooling-as-a-Service a minimum 10% energy saving is guaranteed in writing. For a lease, the terms, including any performance commitment, are set in the lease proposal.',
      },
      {
        question: 'What happens at the end of the contract?',
        answer:
          'Under Cooling-as-a-Service you renew or take ownership of the plant on terms agreed at the start. Lease end-of-term options are set in the lease agreement.',
      },
    ],
  },
  'cost-of-waiting-calculator': {
    sections: [
      {
        heading: 'How it is calculated',
        bullets: [
          'Extra power = (current kW/TR − target kW/TR) × average cooling load (TR).',
          'Extra energy per year = extra power × operating hours per year.',
          'Extra cost = extra energy × your average electricity price per kWh (including Ft).',
          'The default target of 0.75 kW/TR sits inside the rough 0.6–0.8 band for a well-run modern water-cooled plant; change it if you have a design figure.',
        ],
      },
      {
        heading: 'Making the number real',
        paragraphs: [
          'The result is only as good as the inputs. Measure your plant’s kW/TR over a full range of loads with our efficiency check, then ask for a free audit: we analyse 12 months of bills and survey the plant to confirm the figure.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Where do I find my current kW/TR?',
        answer:
          'Use our chiller efficiency check with readings of plant power and cooling output, or ask us to measure it during a free audit.',
      },
      {
        question: 'Do I have to pay for a new plant to stop this cost?',
        answer:
          'No. Under Cooling-as-a-Service or a lease with our maintenance there is no upfront investment.',
      },
    ],
  },
  'carbon-calculator': {
    sections: [
      {
        heading: 'How it is calculated',
        bullets: [
          'Energy saved per year (kWh) = annual chiller plant electricity × expected saving.',
          'CO₂ avoided (tonnes) = energy saved (MWh) × grid emission factor (tCO₂/MWh).',
          'The default factor is 0.4857 tCO₂/MWh, the Thailand Greenhouse Gas Management Organization (TGO) grid emission factor for electricity consumption for 2021, announced in 2022. Replace it with the factor your report or verifier requires.',
        ],
      },
      {
        heading: 'Using it in ESG reporting',
        paragraphs: [
          'Reported savings should come from measured data. Under our contracts the plant is metered continuously and savings are verified monthly against an IPMVP-aligned baseline, which gives your sustainability report an auditable kWh figure to convert.',
        ],
        source: {
          label: 'TGO grid emission factor announcement',
          url: 'https://ghgreduction.tgo.or.th/en/download/download/7878/3377/32.html',
        },
      },
    ],
    faqs: [
      {
        question: 'Which emission factor should I use?',
        answer:
          'Use the factor your reporting framework or verifier specifies. The default here is TGO’s 2021 grid factor for electricity consumption; TGO updates its factors, so check for the latest one.',
      },
      {
        question: 'Is this a verified carbon figure?',
        answer:
          'No. It is an estimate for planning. Verified figures come from measured energy savings and the factor your verifier accepts.',
      },
    ],
  },
  'engineer-downloads': {
    sections: [
      {
        heading: 'How to use the templates',
        bullets: [
          'Print the daily log sheet or keep it on a tablet in the plant room; one row per reading.',
          'Use the monthly checklist to plan and record maintenance, with a column for who did each task and when.',
          'Use the M&V checklist before any efficiency project, so the baseline data is collected before the old plant changes.',
          'Every template has Thai and English labels side by side.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Are the templates free?',
        answer: 'Yes. Download, change and share them as you like.',
      },
      {
        question: 'Can you help us analyse the data we collect?',
        answer:
          'Yes. Send us a few months of log sheets with a free audit request and our engineers will review them.',
      },
    ],
  },
};

export default pages;
