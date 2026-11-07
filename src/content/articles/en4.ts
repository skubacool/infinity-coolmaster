/** English: Thailand-specific guides (tariffs, law, sectors, refrigerants). */
const src = (items: [string, string][]) =>
  `## Sources\n\n${items.map(([label, url]) => `- <a href="${url}" rel="noopener">${label}</a>`).join('\n')}`;

export const en4 = {
  touFt: {
    title:
      'How TOU tariffs and the Ft charge affect your chiller’s electricity cost',
    excerpt:
      'Thai TOU tariffs price peak-hour electricity higher and the Ft charge moves every four months. How that shapes chiller plant costs, and what lowers them.',
    body: `Most large buildings and factories in Thailand buy electricity on a time-of-use (TOU) tariff, and every unit also carries the Ft charge. Both shape what a chiller plant really costs to run, because cooling peaks at exactly the hours when electricity is most expensive.

## How a TOU tariff works

A TOU tariff splits the day into two periods:

- Peak: generally 09:00–22:00, Monday to Friday, when the price per unit is highest.
- Off-peak: 22:00–09:00 on weekdays, plus all day on weekends and public holidays, at a much lower price.

Many medium and large business tariffs also include a demand charge based on the highest power drawn during peak hours in the month. A chiller plant that ramps up hard on a hot weekday afternoon can set that peak for the whole month.

## What the Ft charge is

Ft is Thailand’s automatic tariff adjustment for fuel and power-purchase costs. It is added to every unit of electricity, and the Energy Regulatory Commission reviews it every four months. Because it changes, the same chiller plant can cost noticeably more or less to run from one period to the next.

## Why chillers are exposed

- Cooling demand is highest in the afternoon, inside the peak window.
- Offices, malls, hotels and factories on day shifts all cool hardest on weekdays.
- An inefficient plant (high kW/TR) multiplies every peak-hour unit and pushes up the demand charge.

## What lowers the cost

- A more efficient plant: every reduction in kW/TR cuts both peak energy and peak demand.
- Sequencing chillers and pumps to the real load instead of running spare machines.
- Pre-cooling buildings before 09:00, where comfort and process allow.
- Thermal energy storage: making chilled water or ice off-peak at night and using it in the afternoon.
- Measuring energy and demand separately, so you can see which one is driving the bill.

## Savings in kWh or in baht?

Because Ft and tariffs change, a good performance contract states clearly whether savings are measured in energy (kWh) or in money. At Infinity CoolMaster the saving is measured monthly against an IPMVP-aligned baseline, and the minimum 10% guarantee is written into the contract, so tariff changes do not blur whether the plant is performing.

${src([
  [
    'Energy Regulatory Commission of Thailand: tariff structure and Ft (presentation)',
    'https://www.st.gov.my/contents/K2/highlights/Presentation_slides_irf/08_session%203_dr%20direk_energy%20regulatory%20commission%20of%20thailand.pdf',
  ],
  [
    'Bangkok Post: ERC review of the fuel tariff (Ft)',
    'https://www.bangkokpost.com/business/1710643/erc-stands-pat-on-fuel-tariff-rate',
  ],
])}`,
  },

  energyLaw: {
    title:
      'Designated factories and buildings: what Thailand’s energy law means for your chillers',
    excerpt:
      'Thailand’s Energy Conservation Promotion Act sets duties for large factories and buildings. Who is covered, what is required, and where the chiller plant fits.',
    body: `If your factory or building is large, it may be a “designated factory” (โรงงานควบคุม) or “designated building” (อาคารควบคุม) under Thailand’s Energy Conservation Promotion Act. That status brings legal duties to manage energy, and the chiller plant is usually one of the biggest items in that work.

## Who is covered

A factory or building is designated if it meets any one of these thresholds:

- An electricity meter, or meters, with installed capacity of 1,000 kW or more.
- Installed transformers totalling 1,175 kVA or more.
- Energy use of 20 million megajoules (MJ) a year or more, from all sources.

Many mid-sized factories and most large hotels, hospitals, malls and office towers cross at least one of these.

## What is required

Designated facilities must manage their energy use under the law and its regulations. In practice this includes:

- Appointing a person responsible for energy (ผู้รับผิดชอบด้านพลังงาน); larger sites need more than one, including a senior one.
- Running an energy management system: policy, targets, measures and reviews.
- Reporting energy use and conservation results to the authorities as required.

The regulations have been amended over time, so confirm the current requirements with the Department of Alternative Energy Development and Efficiency (DEDE) or your adviser.

## Where the chiller plant fits

- In air-conditioned buildings and many factories, the chiller plant is one of the largest energy users, so it is usually where the biggest measurable savings are.
- Energy targets need measured results. A plant metered continuously, with savings verified against a baseline, gives the person responsible for energy credible numbers to report.
- Replacing an inefficient plant is often the single measure that moves the whole site’s energy figures.

## How Cooling-as-a-Service helps

Under Cooling-as-a-Service, Infinity CoolMaster funds, installs and operates a high-efficiency plant, meters it permanently and reports verified savings every month against an IPMVP-aligned baseline. That gives a designated facility both the improvement and the documented data, without capital spending, and a minimum 10% saving guaranteed in writing.

${src([
  [
    'JETRO: Royal Decree on designated factories (English translation)',
    'https://www.jetro.go.jp/ext_images/thailand/e_activity/pdf/econdec3.pdf',
  ],
  [
    'APEC EGEEC: Thailand economy update (designated facility groups)',
    'https://www.apec.org/-/media/Satellite/EGEEC/Files/EGEEC43_Thailand_Economy_Update.pdf',
  ],
])}`,
  },

  foodCold: {
    title:
      'Cooling for food and beverage factories: process, hygiene and energy',
    excerpt:
      'Food and beverage plants depend on reliable cooling for product safety and quality. Where chilled water is used, where energy is lost, and how to improve without risk.',
    body: `In food and beverage production, cooling protects product safety, shelf life and quality, so reliability comes first. It is also a large and constant electricity cost, which makes efficiency worth real money.

## Where cooling is used

- Process cooling: cooling products after cooking, pasteurising or filling, and cooling process water and equipment.
- Air conditioning of processing and packing rooms, where temperature and humidity are part of hygiene control.
- Cold rooms and freezers, often on their own refrigeration systems rather than the chilled-water plant.
- Utilities: air compressors and other equipment that reject heat.

## What matters most

- Stable temperatures, because excursions can mean rejected batches.
- Hygiene: condensation and humidity control in production areas.
- Records: temperature and energy data that support food-safety audits.
- Uptime: redundancy so a single failure does not stop the line.

## Where energy is lost

- Chillers running at fixed settings regardless of production.
- One low-temperature loop serving loads that could use warmer water.
- Constant-speed pumps and fans, and fouled heat exchangers.
- Plants sized for a future expansion that never came, running at inefficient part load.

## Improving without risk

- Measure first: whole-plant kW/TR, load by shift and the temperatures each process really needs.
- Separate loads by temperature where possible.
- Add variable-speed drives and plant-wide control that follows the production schedule.
- Keep redundancy and change control: any change to a hygiene-critical system should be planned, documented and verified.

## Cooling-as-a-Service for food factories

Infinity CoolMaster designs, funds, installs and operates the chilled-water plant, keeps redundancy in place and logs temperatures and energy continuously, with savings verified monthly against a baseline adjusted for production. There is no capital outlay, and a minimum 10% energy saving is guaranteed in writing.`,
  },

  pharmaCleanroom: {
    title: 'Cooling for pharmaceutical and cleanroom production',
    excerpt:
      'Cleanrooms rely on chilled water to control temperature and humidity around the clock. How to make the cooling plant efficient while protecting GMP compliance.',
    body: `Pharmaceutical, medical-device and electronics cleanrooms must hold tight temperature and humidity limits 24 hours a day. The chiller plant behind them is critical to compliance, and it is also one of the site’s biggest energy users.

## Why cleanrooms use so much cooling

- High air-change rates move large volumes of air through filters and coils.
- Humidity control often means cooling air well below room temperature to remove moisture, then reheating it.
- Many areas run all day, every day, whether or not production is running.

## What must never be compromised

- Temperature and humidity within the validated limits.
- Room pressure cascades and airflow patterns.
- Redundancy, so a single failure does not take a classified area out of specification.
- Change control: modifications to qualified HVAC systems follow documented assessment and requalification where required.

## Where the savings usually are

The biggest opportunities are usually in the central plant, which serves the air handlers rather than being part of the validated room conditions:

- Chiller sequencing, efficient chillers and variable-speed pumps.
- Matching chilled-water temperature to what dehumidification really needs, rather than the coldest possible water all year.
- Heat recovery from chillers for reheat, where the system allows.
- Continuous monitoring with predictive fault detection.

## Planning changes safely

- Agree the scope with quality assurance and engineering before work starts.
- Keep redundancy in place throughout any replacement.
- Document every change and the verification that room conditions stayed within limits.

## Cooling-as-a-Service for regulated sites

Infinity CoolMaster designs redundant plants with your engineering and QA teams, funds and installs them without capital spending, and operates them with 24/7 monitoring. Savings are verified monthly against an IPMVP-aligned baseline, with a minimum 10% saving guaranteed in writing.`,
  },

  caasVsEsco: {
    title: 'Cooling-as-a-Service vs an ESCO contract in Thailand',
    excerpt:
      'Both promise energy savings, but they differ in who funds, owns and runs the plant. A clear comparison for Thai building owners and factory managers.',
    body: `Thai building owners who want to cut cooling costs usually meet two kinds of offer: an energy-performance contract from an ESCO (energy service company), or Cooling-as-a-Service (CaaS). Both talk about guaranteed savings, but they put the money, the equipment and the risk in different places.

## How an ESCO contract usually works

- The ESCO audits the site and proposes energy-saving measures.
- The client often funds the project, or finances it, and owns the equipment once installed.
- The ESCO guarantees a level of savings, usually measured with IPMVP, for a set period.
- Operation and maintenance may stay with the client or be contracted separately.

## How Cooling-as-a-Service works

- The provider designs, finances, installs and owns the chiller plant.
- The provider operates and maintains it for the contract term.
- The client pays for efficient cooling, with the fee designed to be covered by the savings.
- At Infinity CoolMaster, a minimum 10% saving is guaranteed in writing and measured monthly; contracts typically run 5–10 years.

## Side by side

- Upfront capital: ESCO often yours, or financed; CaaS none.
- Equipment owner: ESCO usually you; CaaS the provider during the term.
- Who runs the plant: ESCO varies; CaaS the provider.
- Performance risk: shared under both, through the guarantee.
- End of term: ESCO you already own it; CaaS renew or take ownership on agreed terms.

## Which suits you

- Choose an ESCO-style project when you have capital and a strong in-house team to run the plant, and want the asset on your books.
- Choose Cooling-as-a-Service when capital belongs in your core business, you want one partner responsible for performance and operation, and you prefer to pay for an outcome.

Either way, insist on a written baseline, a clear measurement method and a defined remedy if savings fall short. Our comparison page covers buying and leasing as well.`,
  },

  refrigerants: {
    title:
      'Refrigerant phase-down: what it means for older chillers in Thailand',
    excerpt:
      'R-22 is being phased out and HFCs are being phased down under the Kigali Amendment, which Thailand ratified in 2024. What that means for your chiller plant.',
    body: `Refrigerants are the working fluid inside every chiller. International agreements are steadily removing the ones that damage the ozone layer or heat the climate, and that affects how long older chillers can economically keep running.

## R-22 and other HCFCs

R-22 (HCFC-22) was the standard refrigerant in older chillers. Under the Montreal Protocol, developing countries including Thailand are phasing out HCFCs, with consumption almost entirely eliminated by 2030 and only a small servicing allowance after that. As supply shrinks, recharging an R-22 chiller after a leak becomes harder and more expensive.

## HFCs and the Kigali Amendment

HFC refrigerants such as R-134a and R-410A replaced HCFCs. They do not harm the ozone layer but have a high global-warming potential. The Kigali Amendment to the Montreal Protocol phases them down. Thailand ratified it on 3 April 2024 and committed to cut HFC production and consumption by 80% by 2045.

## What it means for a chiller owner

- An old R-22 chiller is on borrowed time: plan replacement before a major leak forces it.
- New plants should use refrigerants with a long future, such as lower-GWP HFO blends or natural refrigerants where suitable.
- Leak prevention, detection and records matter more each year.
- Refrigerant recovery and disposal must be handled correctly when a chiller is replaced.

## Choosing a refrigerant for a new plant

- Ask each supplier for the refrigerant’s GWP and its expected availability over the plant’s life.
- Compare efficiency at part load, not just full load.
- Check local service capability for the refrigerant and equipment you choose.

## Replacing without capital spending

Under Cooling-as-a-Service, Infinity CoolMaster funds and installs a new high-efficiency plant on a refrigerant chosen for the long term, recovers the old refrigerant properly, and operates the plant with a minimum 10% energy saving guaranteed in writing.

${src([
  [
    'Cooling Post: Thailand ratifies the Kigali Amendment',
    'https://www.coolingpost.com/world-news/thailand-ratifies-kigali-amendment/',
  ],
  [
    'International Institute of Refrigeration: Thailand ratifies the Kigali Amendment',
    'https://iifiir.org/en/news/thailand-ratifies-the-kigali-amendment',
  ],
])}`,
  },
  caasVsLease: {
    title: 'Cooling-as-a-Service vs leasing a chiller: which costs you less?',
    excerpt:
      'Both avoid an upfront investment. The difference is who carries the risk if the plant saves less than expected. A side-by-side comparison for Thai factories and buildings.',
    body: `When a chiller plant needs replacing and the capital budget is tight, two offers usually come up: lease a new plant, or sign a Cooling-as-a-Service (CaaS) contract. Neither needs an upfront investment, and both can include maintenance. They differ in one important way: what happens to your payment when the plant does not perform as promised.

## How a chiller lease works

- A new plant is installed and you pay a fixed monthly lease payment for an agreed term.
- The payment is set by the plant cost, the interest rate and the term, much like a loan.
- The energy saving is yours in full, but so is the risk: the payment stays the same whether the plant saves 25% or 5%.
- Maintenance, end-of-term options and any performance commitment depend on the lease terms.

## How Cooling-as-a-Service works

- The provider designs, finances, installs, owns, operates and maintains the plant.
- You pay a fee linked to the measured energy saving, so the payment follows results.
- At Infinity CoolMaster, a minimum 10% energy saving is guaranteed in writing, savings are verified monthly against an IPMVP-aligned baseline, and the plant is monitored 24/7 and optimised by our CPMS.
- Contracts typically run 5–10 years; at the end you renew or take ownership on terms agreed at the start.

## Side by side

- Upfront investment: lease none; CaaS none.
- Monthly payment: lease fixed; CaaS linked to measured savings.
- If savings fall short: lease you still pay in full; CaaS our fee falls with the savings, and the minimum saving is guaranteed.
- Who runs the plant: lease usually you; CaaS us, with 24/7 monitoring.
- Proof of savings: lease depends on the contract; CaaS monthly measurement and verification.

## A simple example

Take a plant whose electricity costs ฿500,000 a month, and an expected saving of 20%, or ฿1.2 million a year.

- Under a shared-savings CaaS fee of 50%, you keep ฿600,000 a year and pay nothing upfront.
- Under a lease of a ฿9 million plant at 6% over 7 years, the payment is about ฿1.6 million a year, more than the saving, so the lease costs you money every year.
- If savings come in at only 10%, the CaaS benefit is ฿300,000 a year, while the lease loss grows, because its payment does not change.

These figures are illustrative only. Try your own numbers in our cooling contract calculator.

## Which suits you

- A lease can suit an owner with a strong in-house engineering team, confidence in the expected saving and a wish to keep all of it.
- Cooling-as-a-Service suits owners who want payments to follow results, one partner responsible for performance and operation, and no exposure if the saving falls short.

Whichever you choose, ask how each contract is treated under TFRS 16 with your auditor, and insist on a written baseline and a clear measurement method.`,
  },
};
