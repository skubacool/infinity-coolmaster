/**
 * English bodies of the built-in guides (see content/articles/index.ts).
 * Formatting: "## " heading, "### " sub-heading, "- " bullet, blank line =
 * new paragraph. Only facts the company states elsewhere on the site, plus
 * general engineering and finance knowledge; no invented figures.
 */
export const en = {
  whatIsCaas: {
    title: 'What is Cooling-as-a-Service (CaaS)? A plain-English guide',
    excerpt:
      'Cooling-as-a-Service means a provider funds, owns and runs your chiller plant and you pay for the cooling. How it works, who it suits and what to check in a contract.',
    body: `Cooling-as-a-Service (CaaS), also called chiller-as-a-service, is a way to get a new, efficient cooling plant without buying it. A specialist provider designs, finances, installs, owns and operates the chiller plant at your building. You pay for the cooling service, usually out of the energy savings the new plant creates, under a multi-year contract.

At Infinity CoolMaster, a chiller-as-a-service provider in Bangkok, that contract typically runs 5–10 years, includes a minimum energy saving of 10% guaranteed in writing, and is measured every month against a baseline aligned with the international IPMVP protocol.

## How Cooling-as-a-Service works

A CaaS project usually follows five steps:

- Audit: the provider studies at least 12 months of electricity bills and surveys the existing plant to estimate the savings potential.
- Proposal: you receive a written offer with the guaranteed saving, the fee structure and the contract terms, and both sides agree a measurement baseline before any work starts.
- Investment and installation: the provider buys and installs the equipment, such as chillers, pumps, cooling towers, controls and meters, around your operating schedule.
- Operation: the provider runs and maintains the plant for the full term, often with software that tunes it continuously and a monitoring center that watches it around the clock.
- Verification: actual energy use is compared with the agreed baseline every month, and the saving is reported. If it falls below the guarantee, the provider pays the difference.

## What you pay for

You do not pay for equipment. You pay a service fee for efficient cooling. In a well-designed contract the fee is covered by the savings, so your total cost of cooling (electricity plus fee) is lower than before from the first month.

## Who owns the equipment?

The provider. It owns, insures and maintains the plant for the whole contract. At the end of the term you normally choose between renewing the service and taking ownership of the plant under transfer terms agreed at the start.

## How CaaS differs from buying, leasing and ESCO contracts

- Buying: you pay the full cost upfront and carry the operating and performance risk yourself.
- Leasing: the upfront cost is spread, but you still run the plant and carry the risk that it does not save what was promised.
- ESCO energy-performance contract: an energy service company guarantees savings from an upgrade, but the client often funds or owns the equipment.
- Cooling-as-a-Service: the provider funds, owns, runs and maintains the plant and guarantees the saving. Your side is the service fee.

## Who is Cooling-as-a-Service for?

CaaS suits buildings with a central chilled-water plant and a large, steady cooling load:

- Hotels and resorts, where cooling runs all year and savings flow to gross operating profit.
- Hospitals, which need 24/7 cooling and would rather spend capital on medical equipment.
- Shopping malls, where cooling is the largest controllable cost.
- Factories and cold-chain facilities, where reliability and energy-intensity targets both matter.
- Office buildings, especially when an ageing plant faces replacement.
- Data centers, where cooling efficiency drives PUE.

## What to check before you sign

- How the baseline is built, and which adjustments (weather, occupancy) are allowed.
- The guaranteed saving and exactly what happens if it is missed.
- Contract length, and your options and costs at the end of the term.
- Comfort, temperature and uptime limits the provider must respect.
- Who pays for repairs, spare parts and insurance.
- Your right to audit the data, or to appoint a third party to do it.

## The short answer

Cooling-as-a-Service turns a large capital project into a service with a guaranteed result. The provider funds and runs the plant, and you pay for efficient cooling from the savings it creates.`,
  },

  replacementCost: {
    title:
      'What does a chiller replacement cost? The factors that set the price',
    excerpt:
      'Chiller replacement prices vary widely. These are the factors that decide the cost of a new plant in Thailand, and how to replace one without capital spending.',
    body: `Building owners often ask what a chiller replacement costs. The honest answer is that it depends on the building: two plants of the same tonnage can differ several times in price. This guide explains the factors that set the price, so you can compare quotes properly, and how to replace a plant without capital spending.

## 1. Capacity and redundancy

Plant size, measured in tons of refrigeration (TR), is the starting point, but the design load matters as much as the nameplate. Many older plants are oversized, so a proper load study can reduce the capacity you need to buy. Redundancy adds cost: hospitals and data centers usually need N+1 or better, which means at least one extra chiller and matching pumps.

## 2. Chiller technology and efficiency

Higher-efficiency equipment costs more to buy and less to run. Options include variable-speed drives, magnetic-bearing compressors and water-cooled or air-cooled designs. Because a chiller runs for many years, energy cost usually outweighs purchase price over its life, so compare offers on lifetime cost, not purchase price alone.

## 3. The rest of the plant

The chillers are only part of the bill. A replacement often also covers:

- Chilled-water and condenser-water pumps, often converted to variable speed.
- Cooling towers, which may be at the end of their life too.
- Pipework, valves and insulation changed to suit the new layout.
- Electrical work: switchgear, cabling and sometimes a transformer upgrade.
- Controls and metering, needed to run the plant efficiently and prove the savings.

## 4. Site conditions

Access often drives cost more than equipment does. Removing old chillers from a basement or a rooftop may need cranes, temporary openings or road closures. Structural reinforcement, noise limits and work-hour restrictions all add time and cost.

## 5. Keeping cooling running

Most buildings cannot switch cooling off. Phased installation, temporary chillers and night or weekend switchovers keep the building running but add to the project cost. Hospitals, data centers and hotels need the most careful planning.

## 6. Refrigerants and regulation

Older chillers may use refrigerants that are being phased out. Recovering and disposing of them correctly is part of the job, and choosing a refrigerant with a long future protects the new plant's value.

## 7. Operation after handover

The cheapest plant to buy is rarely the cheapest to own. Maintenance contracts, spare parts, water treatment and the skill of the operators decide whether a new plant keeps its design efficiency or slowly drifts back to the old one's performance.

## How to compare quotes

- Ask every bidder to quote against the same design load and redundancy.
- Ask for the expected whole-plant efficiency (kW/TR), not chiller efficiency alone.
- Compare lifetime cost: purchase, installation, energy and maintenance.
- Check what is excluded, such as electrical upgrades, structural work and temporary cooling.

## Replacing a chiller plant without capital spending

With Cooling-as-a-Service, Infinity CoolMaster funds, installs, owns and operates the new plant. You pay for efficient cooling out of the savings, with a minimum 10% energy saving guaranteed in writing and measured every month to IPMVP. The audit that sets the price is free: we analyse 12 months of your electricity bills and survey your plant.`,
  },

  kwPerTr: {
    title: 'kW/TR explained: how to benchmark your chiller plant’s efficiency',
    excerpt:
      'kW/TR is the simplest way to see how efficiently a chiller plant turns electricity into cooling. How to calculate it, what to include, and how to use it to find savings.',
    body: `If you want to know whether your chiller plant is efficient, one number tells you most of the story: kW/TR, the electrical power the plant uses for each ton of cooling it delivers. Lower is better.

## What kW/TR means

A ton of refrigeration (TR) is a rate of cooling equal to 12,000 BTU per hour, or about 3.517 kW of heat removed. kW/TR divides the electrical power drawn (kW) by the cooling delivered (TR) at the same moment.

- kW/TR = electrical input (kW) ÷ cooling output (TR)
- Cooling output (TR) = chilled-water flow × temperature difference, converted to tons
- COP (coefficient of performance) = 3.517 ÷ kW/TR

For example, a plant drawing 800 kW of electricity while producing 1,000 TR of cooling runs at 0.80 kW/TR, a COP of about 4.4.

## Chiller kW/TR vs whole-plant kW/TR

A chiller's nameplate efficiency covers the chiller alone. Your electricity bill pays for the whole plant:

- Chillers
- Chilled-water pumps
- Condenser-water pumps
- Cooling-tower fans

Whole-plant kW/TR is always higher than chiller kW/TR, and it is the number that matters for cost. A very efficient chiller with oversized constant-speed pumps can still make an inefficient plant.

## How to measure it properly

- Meter electrical power for every plant component, not just the chillers.
- Measure chilled-water flow and supply and return temperatures with calibrated sensors.
- Log at short intervals (for example every 15 minutes) for at least a full year, so you see part-load, seasonal and night-time behaviour.
- Calculate the weighted average over the year, not a single best moment at full load.

Plants spend most of their hours at part load, so annual average kW/TR is far more useful than a design-day figure.

## Rough benchmarks

Engineering literature often quotes approximate bands for whole-plant efficiency in water-cooled chilled-water plants. Treat them as a rough guide, not a standard:

- Around 0.6–0.8 kW/TR: a well-designed, well-controlled modern plant.
- Around 0.8–1.0 kW/TR: reasonable, usually with room to improve.
- Above 1.0 kW/TR: typical of older or poorly controlled plants, often with large savings potential.

Climate, load profile and plant type all shift these numbers, so the most useful comparison is your own plant over time, and against what a redesign could achieve.

## Where the losses usually are

- Running more chillers than the load needs, each at poor part-load efficiency.
- Constant-speed pumps and fans running at full power regardless of load.
- Chilled-water setpoints left too low all year.
- Fouled condenser tubes and poorly maintained cooling towers.
- Controls that treat each component separately instead of optimising the plant as a system.

## From kW/TR to savings

Because kW/TR links directly to electricity use, every reduction shows up on the bill. That is why it is the core metric in a savings guarantee: under IPMVP, the baseline model and monthly reports track energy use against cooling delivered, so improvements are measured, not estimated.

Infinity CoolMaster's Chiller Plant Management System (CPMS) uses machine learning to sequence chillers, pumps and towers together and drive whole-plant kW/TR down. Under our Cooling-as-a-Service contracts a minimum 10% saving is guaranteed in writing, and a free audit shows where your plant stands today.`,
  },

  contractEnd: {
    title:
      'How long is a Cooling-as-a-Service contract, and what happens at the end?',
    excerpt:
      'Cooling-as-a-Service contracts typically run 5–10 years. What decides the length, what happens to the equipment at the end of the term, and the questions to settle before you sign.',
    body: `Two of the first questions buyers ask about Cooling-as-a-Service are how long the contract lasts and what happens when it ends. Both are decided before you sign, and both affect the price.

## How long is a Cooling-as-a-Service contract?

At Infinity CoolMaster, contracts typically run 5–10 years, depending on plant size and scope. The length follows from the investment: the provider funds the equipment and recovers that investment from the service fee over the term.

- Shorter terms suit smaller scopes, such as optimising an existing plant with new controls.
- Longer terms let the provider invest in deeper upgrades, such as new chillers, pumps and towers, and usually support a larger guaranteed saving.

## What stays the same during the contract

- The provider owns, insures and maintains the plant.
- The guaranteed minimum saving (at Infinity CoolMaster, at least 10%) applies every year.
- Savings are measured every month against the agreed IPMVP-aligned baseline.
- If savings fall short of the guarantee, the provider pays the difference.

## What happens at the end of the term?

You normally have two options, both agreed in the original contract:

- Renew: continue the service, often with updated terms, equipment upgrades or a new savings target.
- Take ownership: the plant is transferred to you under transfer terms set at the start, and you operate it yourself or appoint an operator.

Because these options are written into the contract from day one, there is no surprise negotiation at the end.

## Questions to settle before you sign

- Exactly what the transfer terms are, and how the plant's condition at handover is defined.
- Which maintenance records, drawings, software and data you receive at the end.
- Whether the control software continues to work, and on what terms, after transfer.
- What happens if your building changes use, is sold or is extended during the term.
- Early-termination terms, in both directions.

## Why the end of the contract matters for the price

The provider prices the service on the expected life and value of the equipment. Clear end-of-term options let it invest with confidence, which supports a stronger guarantee. For you, they mean the plant is never stranded: you either keep a managed, guaranteed service or take over a well-maintained plant.

To discuss contract length and end-of-term options for your building, request a free cooling audit. We analyse 12 months of bills and survey your plant before proposing terms.`,
  },

  cfoQuestions: {
    title: 'Cooling-as-a-Service for CFOs: 8 questions to ask before you sign',
    excerpt:
      'A finance-side checklist for Cooling-as-a-Service: cash flow, balance-sheet treatment, guarantees, measurement and end-of-term options, with the questions to ask a provider.',
    body: `For a CFO, Cooling-as-a-Service (CaaS) is a financing and risk decision as much as an engineering one. The provider funds, owns and operates the chiller plant, and you pay for cooling out of the savings. These are the questions to ask before you sign.

## 1. What happens to our cash flow?

There is no upfront investment. The service fee is designed to be covered by the energy savings, so cooling costs should fall from the first month. Ask the provider to show the expected monthly cash flow over the full term, with and without the guaranteed saving.

## 2. How is the contract treated in our accounts?

This depends on the contract terms and must be confirmed by your auditor. Under TFRS 16 (Thailand's equivalent of IFRS 16 on leases), a contract contains a lease if it gives you the right to control the use of an identified asset. Many service contracts, where the provider owns, operates and decides how to run the plant, may not meet that test, but the answer depends on the details. Bring your auditor in early and share the draft contract.

## 3. What exactly is guaranteed?

Ask for the guaranteed saving as a number in the contract, how it is calculated and what happens if it is missed. At Infinity CoolMaster the minimum is 10%, written into the contract, and any shortfall is compensated.

## 4. How are savings measured, and can we check them?

Savings should be measured against a baseline agreed before work starts, using an international method such as IPMVP. Ask:

- How many months of data the baseline uses (at least 12 is good practice).
- Which adjustments are allowed, for example for weather or occupancy.
- Whether you or a third party can audit the data and calculations.

## 5. Who carries which risks?

- Performance risk: the provider, through the savings guarantee.
- Equipment failure, repairs and spare parts: should be the provider's.
- Insurance of the plant: should be the provider's while it owns the equipment.
- Changes to the building's use or occupancy: check how the baseline is adjusted.
- Tariff changes: understand whether the fee and the savings are measured in energy (kWh) or in money.

## 6. What happens at the end of the term?

Typically you can renew or take ownership of the plant under transfer terms set at the start. Make sure those terms, and what you receive (records, drawings, software, data), are written down.

## 7. Can the provider deliver for the whole term?

A 5–10 year contract is a long relationship. Ask about the provider's engineering team, monitoring capability, financing behind the assets and references from existing clients.

## 8. How does it support our ESG reporting?

Monthly, metered energy data and verified savings provide auditable figures for energy, emissions and green-building reporting. Ask for the report format before you sign.

## Next step

A free cooling audit gives you the numbers for these questions: we analyse 12 months of your electricity bills, survey your plant and return a written proposal with the guaranteed saving and contract terms.`,
  },
};
