import { FIRST_PROJECT, firstProjectClient } from '../first-project';

const client = firstProjectClient('en');

/** English: first-project update and plastics process-cooling guide. */
export const en3 = {
  firstProject: {
    title: 'Our first Cooling-as-a-Service plant enters commissioning',
    excerpt: `Infinity CoolMaster’s first chiller-as-a-service plant, for ${client}, is in testing and commissioning in November 2026. What is being installed, how savings will be measured, and what comes next.`,
    body: `Infinity CoolMaster’s first Cooling-as-a-Service chiller plant is in testing and commissioning in November 2026. The client is <a href="${FIRST_PROJECT.clientUrl}" rel="noopener">${client}</a>, ${FIRST_PROJECT.clientDescription.en}. Under the contract, Infinity CoolMaster funds, installs, owns and operates the plant; the client pays for efficient cooling, with a minimum energy saving guaranteed in writing.

## What testing and commissioning means

Commissioning is the stage between installation and normal operation. Every chiller, pump, cooling tower, control and meter is checked against its design: flows, temperatures, safety trips, control sequences and alarms. The plant is then run under real production load before it is handed over for day-to-day operation.

## How the savings will be measured

The saving is not estimated; it is measured. The approach follows the International Performance Measurement and Verification Protocol (IPMVP):

- A baseline is agreed with the client, built from the old plant's energy use and the factory's operating data.
- Because a factory's cooling load follows production, the baseline is adjusted for production volume and outdoor conditions.
- The new plant is metered continuously: electricity for every component, and the cooling it delivers.
- Every month, actual energy use is compared with the adjusted baseline, and the verified saving is reported to the client.

## Why a plastics factory

In plastic injection moulding, the process behind products such as pallets, crates and bins, chilled water cools the moulds and machines, so cooling affects both the energy bill and product quality: stable mould temperatures mean consistent parts and cycle times. That makes reliable, efficient cooling a production issue, not only a utility cost. Our guide to process cooling in plastics plants explains this in more detail.

## What comes next

- Handover from commissioning to normal operation.
- The first monthly measurement and verification reports.
- Publication of the verified results on this website, as a full case study, once enough months of data are in and the client has approved the text.

We will update this page as the project progresses. If you run a factory, hotel, hospital, mall, office building or data center and want to know what your plant could save, request a free cooling audit.`,
  },

  plasticsCooling: {
    title:
      'Process cooling for plastics factories: chillers, moulds and energy',
    excerpt:
      'How chilled water is used in plastic injection moulding, blow moulding and extrusion, why it drives cycle time and quality, and where plastics plants lose cooling energy.',
    body: `In a plastics factory, cooling is part of the process. Molten plastic has to be cooled before a part can be released, so the cooling system sets how fast machines can cycle and how consistent the parts are. It is also one of the plant's largest electricity loads.

## Where cooling is used

- Moulds: chilled water flows through channels in the mould to solidify the part. In injection moulding, cooling is usually the largest share of the cycle time.
- Hydraulic oil: hydraulic machines need their oil kept in a safe temperature range.
- Feed throats, barrels and hot-runner systems: some zones must be kept from overheating.
- Extrusion and blow moulding: cooling baths, calibrators, chill rolls and blown-film air rings.
- Compressed air: air compressors and dryers reject heat that has to be removed.
- The building itself: comfort and humidity control in production and warehouse areas.

## Why temperature stability matters

Uneven or unstable mould cooling causes defects such as warping, sink marks and dimensional variation, and forces longer cycles to compensate. A cooling system that holds a steady supply temperature at the flow each machine needs protects both output and quality.

## Not every load needs the coldest water

A common source of waste is running every load from one low-temperature chilled-water loop. Many loads, such as hydraulic oil coolers and some machine circuits, can be served by warmer water from a cooling tower or a separate, higher-temperature loop. Chillers work far more efficiently at higher supply temperatures, so matching each load to the warmest water it can accept saves energy.

## Where plastics plants lose cooling energy

- One cold loop for everything, as above.
- Chillers and pumps running at full output when only part of the machines are running.
- Scale and fouling in mould channels and heat exchangers, which cut heat transfer and force colder water and more flow.
- Constant-speed pumps with throttled valves.
- Ageing chillers with falling efficiency (rising kW/TR).
- No metering, so nobody can see the plant's real efficiency.

## Practical steps

- Measure whole-plant kW/TR and the load profile across shifts.
- Group loads by the temperature they really need.
- Add variable-speed drives to pumps and tower fans.
- Treat water and clean mould channels and heat exchangers on a schedule.
- Sequence chillers to production, not to the clock.
- Replace end-of-life chillers with efficient, correctly sized ones.

## Without capital spending

With Cooling-as-a-Service, Infinity CoolMaster designs, funds, installs and operates the chiller plant for the factory, and the factory pays for efficient cooling out of the savings, with a minimum saving guaranteed in writing and measured monthly. Our first project, for ${client}, is in testing and commissioning in November 2026.`,
  },
};
