/** English: plant engineering guides (delta-T, towers, drives, staging, solar, audits). */
export const en5 = {
  deltaT: {
    title: 'Low delta-T syndrome: why chilled water comes back too cold',
    excerpt:
      'When chilled water returns colder than designed, pumps and chillers work harder for the same cooling. How to spot low delta-T, what causes it and how to fix it.',
    body: `Delta-T is the difference between the chilled water leaving the plant and the water coming back from the building. Most plants are designed for around 5–6 °C. When the real figure is 2–3 °C, the plant has "low delta-T syndrome", one of the most common and most expensive problems in chilled water systems.

## Why low delta-T costs money

- The same cooling load needs more water. Halving delta-T doubles the flow, and pump power rises steeply with flow.
- Extra chillers are started to supply flow, not cooling, so every chiller runs lightly loaded and inefficiently.
- The plant looks short of capacity even though the chillers are far from full load.

## How to measure it

Read the supply and return temperatures at the plant header at different times of day. Cooling in tons equals flow (L/s) × delta-T (°C) × 4.19 ÷ 3.517. Log it for a week: a delta-T that collapses at part load is the classic sign.

## Common causes

- Dirty or fouled cooling coils and clogged air filters.
- Three-way valves or open bypasses that send cold water straight back.
- Oversized, leaking or failed control valves.
- Supply air or room setpoints set lower than the coils were designed for.
- Chilled water supply temperature set higher than design without checking the coils.
- Coils piped in parallel flow instead of counterflow.

## Fixes, cheapest first

- Clean coils and replace filters; check that valves close fully.
- Correct setpoints at air handlers and fan coils.
- Close unnecessary bypasses; convert three-way valves to two-way where the pumping system allows.
- Fit pressure-independent control valves on the worst air handlers.
- Move to variable flow with pump speed control once the building side is fixed.

Fixing delta-T on the building side is often the cheapest saving in the whole plant, and it is the first thing we check in an audit.`,
  },

  coolingTower: {
    title:
      'Cooling towers: range, approach and why they decide chiller efficiency',
    excerpt:
      'A cooling tower sets the temperature your chiller has to reject heat into. What range and approach mean, how water treatment protects efficiency, and what to check.',
    body: `A water-cooled chiller is only as efficient as the water its cooling tower sends back. Colder condenser water means less work for the compressor, so the tower quietly controls a large share of the plant's electricity use.

## Range and approach

- Range is how much the tower cools the water: water in minus water out.
- Approach is how close the leaving water gets to the outdoor wet-bulb temperature. A tower can never cool water below wet-bulb, and a smaller approach needs a bigger tower.
- In Thailand's hot, humid climate the wet-bulb temperature is high for much of the year, so every degree of approach matters.

## Why it matters for the chiller

As a rule of thumb, each 1 °C reduction in condenser water temperature cuts chiller energy by roughly 2–3%, within the limits the chiller manufacturer allows. A tower with scaled fill or poor airflow can easily lose several degrees.

## Water treatment is an efficiency issue

- Scale on condenser tubes acts as insulation; even a thin layer raises compressor power noticeably.
- Corrosion shortens the life of tubes, basins and pipework.
- Biological growth fouls the fill and is a health risk, including Legionella.
- Good treatment controls all three while limiting the water lost to blowdown.

## What to check

- Fill, nozzles and drift eliminators: clean, intact and evenly wetted.
- Fans and drives: belts, gearboxes, vibration, and speed control.
- Basin level, make-up valve and blowdown rate.
- Approach at a known load, compared with the tower's design figure.
- Condenser tube cleanliness, by the chiller's condenser approach temperature.

## Controls that save energy

- Variable-speed tower fans instead of on/off cycling.
- Running more cells at lower fan speed rather than fewer at full speed.
- Resetting condenser water temperature with wet-bulb, balancing tower fan energy against chiller energy.

Our CPMS optimises towers, pumps and chillers together, because the lowest plant kW/TR is rarely the point where any one of them is at its own best.`,
  },

  vsd: {
    title:
      'Variable speed drives in chiller plants: where they save and where they do not',
    excerpt:
      'Drives on pumps, tower fans and chillers can cut energy sharply at part load, but only with the right control. A practical guide for plant engineers.',
    body: `A variable speed drive (VSD) changes motor speed to match the load instead of running flat out and throttling. Because most chiller plants spend most of the year at part load, drives are one of the most effective efficiency measures, when they are applied and controlled properly.

## The physics in one line

For pumps and fans, flow is proportional to speed, but power is proportional to speed cubed. In an ideal system, running at 80% speed needs about half the power, and 50% speed needs about one eighth.

## Where drives pay

- Chilled water pumps: slow down as valves close and the building needs less flow.
- Condenser water pumps: reduce flow at low load, within the chiller's minimum.
- Cooling tower fans: modulate instead of cycling on and off.
- Chillers: variable-speed compressors are much more efficient at part load and when condenser water is cool.

## Where savings are smaller than expected

- Systems with high static head, where the cube law does not fully apply.
- Pumps that are already correctly sized and run near full flow all year.
- Plants where a drive is installed but left at a fixed speed. A drive saves nothing without a control strategy.

## Things to get right

- Minimum flow through each chiller's evaporator and condenser must always be protected.
- Differential pressure setpoints should be reset to the lowest value that satisfies the building, not fixed at commissioning values.
- Harmonics, motor suitability and cable lengths need checking on retrofits.
- Drives interact: slowing condenser pumps or tower fans saves their energy but raises chiller energy. The right balance changes with load and weather.

That interaction is why plant-level optimisation matters. Our CPMS adjusts speeds across chillers, pumps and towers together to minimise total plant kW/TR.`,
  },

  staging: {
    title:
      'Chiller staging and part-load efficiency: running the right machines',
    excerpt:
      'Chiller plants run at part load most of the year. How IPLV describes part-load efficiency and how staging decisions change your electricity bill.',
    body: `A chiller's nameplate efficiency is measured at full load, but a real plant is at full load for only a few hours a year. What you pay for is part-load performance, and that depends heavily on which machines are running together.

## Part-load efficiency and IPLV

IPLV (integrated part-load value) is a single efficiency figure that weights four load points. Under AHRI Standard 550/590 the weights are 1% at 100% load, 42% at 75%, 45% at 50% and 12% at 25%. In other words, the standard itself assumes a chiller spends almost all of its life below full load.

## Each chiller has a sweet spot

- Constant-speed chillers are usually most efficient at high load.
- Variable-speed chillers are usually most efficient at mid load, especially with cool condenser water.
- Below about 30% load, most chillers become inefficient and less stable.

## What good staging looks like

- Start and stop chillers based on load and efficiency, not only on supply temperature alarms.
- Run the combination that meets the load with the lowest total plant power, including pumps and tower fans.
- Avoid running two chillers lightly loaded when one would carry the load comfortably, unless they are variable-speed machines that are better at mid load.
- Use delays and minimum run times to prevent short cycling.
- Rotate duty to balance run hours, without overriding efficiency.

## Common staging mistakes

- An extra chiller started for flow because of low delta-T, not for load.
- Fixed schedules that ignore weather and occupancy.
- Operators keeping a "safety" chiller on all day.
- Mixed old and new chillers staged as if they were identical.

## Why automation helps

The best combination changes hour by hour with load, wet-bulb temperature and each machine's condition. A plant management system that models every chiller can make that decision continuously. This is the core job of our CPMS, and its results are verified monthly against the agreed baseline.`,
  },

  solarCooling: {
    title: 'Rooftop solar and efficient cooling: why they work better together',
    excerpt:
      'Cooling demand and solar output both peak in the daytime. Why factories and buildings should cut cooling load first, then add solar, and how both can be done without upfront investment.',
    body: `For most Thai factories and commercial buildings, cooling is one of the largest electricity loads, and it is highest on hot, sunny afternoons, exactly when rooftop solar produces the most. The two measures fit together naturally, but the order in which you do them matters.

## Efficiency first, then generation

- A more efficient chiller plant lowers the load permanently, day and night, in every season.
- Solar then covers a larger share of what remains, and the system can be sized against the real, lower demand.
- Sizing solar against an inefficient plant risks paying to generate electricity that an upgrade would have removed.

## Why the timing fits

- Cooling load follows outdoor heat and working hours.
- Solar output follows the sun, with its peak around midday.
- Under time-of-use tariffs, weekday daytime hours are on-peak, so every unit saved or self-generated then is worth more.

## What each one cannot do

- Solar does not reduce cooling demand at night or in cloudy weather, and it does not fix an inefficient plant.
- Efficiency does not remove the remaining demand; it only makes it smaller.
- Together they cut both the amount of electricity bought and the peak demand.

## Both are available without upfront investment

- Rooftop solar can be delivered under a power purchase agreement (PPA): the provider funds and owns the system and you buy the electricity it generates.
- Chiller plants can be delivered under Cooling-as-a-Service: the provider funds, owns, operates and maintains the plant, with savings measured monthly.

## Reporting the result

Energy saved and solar energy generated can both be converted to avoided CO₂ with the grid emission factor, which supports ESG reporting. Keep the two figures separate and base them on metered data.`,
  },

  auditPrep: {
    title: 'How to prepare for a chiller plant energy audit',
    excerpt:
      'A good audit depends on good data. The documents, readings and access to prepare, what happens on site, and what you should receive afterwards.',
    body: `An energy audit of a chiller plant is quick when the right information is ready, and vague when it is not. This checklist covers what to prepare so the audit produces numbers you can act on.

## Documents to collect

- Electricity bills for the last 12 months, and 15-minute interval data if your utility or meters provide it.
- An equipment list: chillers, pumps, cooling towers and air handlers, with capacity, rated power, age and refrigerant.
- Chilled water and condenser water schematics, and the electrical single-line diagram.
- Operating logs: supply and return temperatures, pressures, currents and run hours.
- Maintenance records and a list of known problems.

## Information about how the site runs

- Operating hours and production or occupancy schedules.
- Critical areas that cannot lose cooling, and required temperatures.
- Planned expansions, shutdown windows and space available for new equipment.

## Access the auditor needs

- The plant room, roof, electrical rooms and main air handlers.
- Trend data from the building management system, if there is one.
- Permission to install temporary power and temperature loggers.
- A contact from engineering and one from finance.

## What happens on site

- A walk-through of the plant and the main cooling loads.
- Spot measurements of power, flow and temperatures.
- Logging over several days to capture how load changes.

## What you should receive

- A baseline: how much energy the plant uses now and its kW/TR.
- A list of measures with expected savings and what each depends on.
- A proposal with the guaranteed saving and how it will be measured.

Infinity CoolMaster's audit is free and carries no obligation. Our free daily log sheet and M&V data checklist, on the downloads page, are a good way to start collecting data before we visit.`,
  },
};
