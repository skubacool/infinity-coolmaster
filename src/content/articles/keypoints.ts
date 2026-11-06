/**
 * "Key points" boxes shown at the top of each built-in guide: three or four
 * self-contained sentences that answer the article's question on their own.
 * AI assistants and busy readers quote these first, so every line must be
 * true and specific.
 */
export const KEY_POINTS: Record<string, { en: string[]; th: string[] }> = {
  whatIsCaas: {
    en: [
      'Cooling-as-a-Service (CaaS) means a provider designs, finances, installs, owns and operates your chiller plant; you pay for the cooling, not the equipment.',
      'The service fee is designed to be covered by the energy savings, so there is no upfront investment.',
      'At Infinity CoolMaster contracts typically run 5–10 years, with a minimum 10% energy saving guaranteed in writing and measured monthly to IPMVP.',
      'At the end of the term you either renew or take ownership of the plant on terms agreed at the start.',
    ],
    th: [
      'Cooling-as-a-Service (CaaS) คือบริการที่ผู้ให้บริการออกแบบ ลงทุน ติดตั้ง เป็นเจ้าของ และดูแลระบบชิลเลอร์ให้ คุณจ่ายค่าความเย็น ไม่ใช่ค่าอุปกรณ์',
      'ค่าบริการออกแบบให้ครอบคลุมด้วยผลประหยัดพลังงาน จึงไม่ต้องลงทุนล่วงหน้า',
      'สัญญาของ Infinity CoolMaster โดยทั่วไป 5–10 ปี รับประกันผลประหยัดขั้นต่ำ 10% เป็นลายลักษณ์อักษร และตรวจวัดทุกเดือนตาม IPMVP',
      'เมื่อครบสัญญา คุณเลือกต่อสัญญา หรือรับโอนกรรมสิทธิ์ระบบตามเงื่อนไขที่ตกลงไว้ตั้งแต่ต้น',
    ],
  },
  replacementCost: {
    en: [
      'Chiller replacement cost depends far more on the building than on tonnage: redundancy, the rest of the plant, site access and keeping cooling running all add cost.',
      'Compare quotes on the same design load and redundancy, and on whole-plant efficiency (kW/TR) and lifetime cost, not purchase price alone.',
      'Check what each quote excludes: electrical upgrades, structural work and temporary cooling are common gaps.',
      'With Cooling-as-a-Service the provider funds the replacement and you pay for cooling from the savings.',
    ],
    th: [
      'ราคาเปลี่ยนชิลเลอร์ขึ้นกับอาคารมากกว่าขนาดตันความเย็น ทั้งระบบสำรอง ส่วนอื่นของระบบ การเข้าถึงหน้างาน และการรักษาความเย็นระหว่างติดตั้ง',
      'เปรียบเทียบใบเสนอราคาบนภาระความเย็นและระบบสำรองเดียวกัน และดูที่ประสิทธิภาพทั้งระบบ (kW/TR) กับต้นทุนตลอดอายุ ไม่ใช่ราคาซื้ออย่างเดียว',
      'ตรวจสิ่งที่ไม่รวมในราคา เช่น งานไฟฟ้า งานโครงสร้าง และความเย็นชั่วคราว',
      'ด้วย Cooling-as-a-Service ผู้ให้บริการเป็นผู้ลงทุน คุณจ่ายค่าความเย็นจากผลประหยัด',
    ],
  },
  kwPerTr: {
    en: [
      'kW/TR is the electrical power a chiller plant uses per ton of cooling delivered; lower is better.',
      'Measure the whole plant (chillers, pumps and cooling-tower fans), not the chiller alone, and average it over a full year.',
      'As a rough guide, about 0.6–0.8 kW/TR is a well-run modern water-cooled plant and above 1.0 kW/TR usually signals large savings potential.',
      'COP = 3.517 ÷ kW/TR, so 0.80 kW/TR equals a COP of about 4.4.',
    ],
    th: [
      'kW/TR คือกำลังไฟฟ้าที่ระบบชิลเลอร์ใช้ต่อความเย็นหนึ่งตันที่ผลิตได้ ยิ่งต่ำยิ่งดี',
      'ต้องวัดทั้งระบบ (ชิลเลอร์ ปั๊ม และพัดลมคูลลิ่งทาวเวอร์) ไม่ใช่เฉพาะชิลเลอร์ และเฉลี่ยตลอดทั้งปี',
      'เกณฑ์คร่าว ๆ ระบบระบายความร้อนด้วยน้ำสมัยใหม่ที่ดูแลดีอยู่ราว 0.6–0.8 kW/TR หากสูงกว่า 1.0 kW/TR มักมีศักยภาพประหยัดสูง',
      'COP = 3.517 ÷ kW/TR ดังนั้น 0.80 kW/TR เท่ากับ COP ประมาณ 4.4',
    ],
  },
  contractEnd: {
    en: [
      'Cooling-as-a-Service contracts at Infinity CoolMaster typically run 5–10 years, depending on plant size and scope.',
      'Throughout the term the provider owns, insures and maintains the plant, and the minimum saving is measured every month.',
      'At the end you renew the service or take ownership of the plant under transfer terms written into the original contract.',
      'Settle handover condition, documents, software and early-termination terms before signing.',
    ],
    th: [
      'สัญญา Cooling-as-a-Service ของ Infinity CoolMaster โดยทั่วไป 5–10 ปี ขึ้นกับขนาดระบบและขอบเขตงาน',
      'ตลอดสัญญา ผู้ให้บริการเป็นเจ้าของ ทำประกัน และบำรุงรักษาระบบ และตรวจวัดผลประหยัดขั้นต่ำทุกเดือน',
      'เมื่อครบสัญญา คุณเลือกต่อสัญญา หรือรับโอนกรรมสิทธิ์ตามเงื่อนไขที่เขียนไว้ในสัญญาตั้งแต่ต้น',
      'ควรตกลงเรื่องสภาพระบบ ณ วันส่งมอบ เอกสาร ซอฟต์แวร์ และเงื่อนไขการยกเลิกก่อนกำหนดตั้งแต่ก่อนเซ็น',
    ],
  },
  cfoQuestions: {
    en: [
      'Cooling-as-a-Service needs no upfront investment; ask the provider for the expected monthly cash flow over the whole term.',
      'Accounting treatment under TFRS 16 depends on the contract terms, so involve your auditor early.',
      'Get the guaranteed saving as a number, the measurement method (IPMVP) and the shortfall remedy in writing.',
      'Check who carries equipment, insurance and tariff risk, and what happens at the end of the term.',
    ],
    th: [
      'Cooling-as-a-Service ไม่ต้องลงทุนล่วงหน้า ควรขอดูกระแสเงินสดรายเดือนที่คาดไว้ตลอดอายุสัญญา',
      'การบันทึกบัญชีตาม TFRS 16 ขึ้นกับเงื่อนไขสัญญา ควรให้ผู้สอบบัญชีร่วมพิจารณาตั้งแต่ต้น',
      'ขอให้ระบุผลประหยัดที่รับประกันเป็นตัวเลข วิธีตรวจวัด (IPMVP) และการชดเชยหากไม่ถึง เป็นลายลักษณ์อักษร',
      'ตรวจว่าใครรับความเสี่ยงด้านอุปกรณ์ ประกันภัย และค่าไฟ และจะเกิดอะไรขึ้นเมื่อครบสัญญา',
    ],
  },
  cutEnergy: {
    en: [
      'Most chiller-plant waste comes from how the plant is run, so start with measurement and no-cost operating changes.',
      'Run only the chillers the load needs, raise chilled-water temperature where comfort allows, and keep condenser water cool.',
      'Variable-speed pumps and fans, clean heat-transfer surfaces and fixing low delta-T usually follow.',
      'Optimising chillers, pumps and towers together saves more than tuning each one separately.',
    ],
    th: [
      'การสูญเสียส่วนใหญ่ของระบบชิลเลอร์มาจากวิธีเดินเครื่อง จึงควรเริ่มจากการวัดผลและปรับการเดินระบบที่ไม่มีค่าใช้จ่าย',
      'เดินชิลเลอร์ให้พอดีกับภาระ เพิ่มอุณหภูมิน้ำเย็นเมื่อทำได้ และรักษาน้ำระบายความร้อนให้เย็น',
      'ต่อด้วยระบบปรับรอบของปั๊มและพัดลม การรักษาพื้นผิวแลกเปลี่ยนความร้อนให้สะอาด และการแก้ปัญหา Delta-T ต่ำ',
      'การปรับชิลเลอร์ ปั๊ม และคูลลิ่งทาวเวอร์ร่วมกันประหยัดได้มากกว่าการปรับทีละเครื่อง',
    ],
  },
  replaceSigns: {
    en: [
      'Rising kW/TR after maintenance, more frequent breakdowns and hard-to-find spare parts are the clearest signs a chiller plant is near the end of its life.',
      'Chillers on phased-out refrigerants become harder and more expensive to keep running.',
      'Size any new plant for today’s real load, not the old nameplate.',
      'Compare replacement options on lifetime cost; with Cooling-as-a-Service it needs no capital.',
    ],
    th: [
      'ค่า kW/TR ที่สูงขึ้นแม้บำรุงรักษาแล้ว เครื่องเสียบ่อยขึ้น และหาอะไหล่ยาก คือสัญญาณชัดที่สุดว่าระบบใกล้หมดอายุ',
      'ชิลเลอร์ที่ใช้สารทำความเย็นที่กำลังถูกยกเลิก จะดูแลยากและแพงขึ้นเรื่อย ๆ',
      'ระบบใหม่ควรกำหนดขนาดจากภาระจริงในวันนี้ ไม่ใช่ขนาดบนป้ายของระบบเดิม',
      'เปรียบเทียบทางเลือกด้วยต้นทุนตลอดอายุ และด้วย Cooling-as-a-Service ไม่ต้องใช้งบลงทุน',
    ],
  },
  waterVsAir: {
    en: [
      'Water-cooled chillers reject heat through cooling towers and are usually more efficient in Thailand’s heat; air-cooled chillers reject it straight to outdoor air.',
      'Air-cooled units need no cooling towers or water treatment but lose efficiency as outdoor temperature rises.',
      'Large, long-running loads usually favour water-cooled plants; small sites or sites without tower space may favour air-cooled.',
      'Decide on lifetime cost: energy, water, chemicals and maintenance, not purchase price.',
    ],
    th: [
      'ชิลเลอร์ระบายความร้อนด้วยน้ำระบายผ่านคูลลิ่งทาวเวอร์ และมักมีประสิทธิภาพสูงกว่าในอากาศร้อนของไทย ส่วนแบบระบายด้วยอากาศระบายสู่อากาศภายนอกโดยตรง',
      'แบบระบายด้วยอากาศไม่ต้องมีคูลลิ่งทาวเวอร์และการบำบัดน้ำ แต่ประสิทธิภาพลดลงเมื่ออากาศร้อนขึ้น',
      'ภาระขนาดใหญ่ที่ทำงานนานมักเหมาะกับแบบระบายด้วยน้ำ ส่วนอาคารเล็กหรือไม่มีที่วางคูลลิ่งทาวเวอร์อาจเหมาะกับแบบระบายด้วยอากาศ',
      'ตัดสินใจด้วยต้นทุนตลอดอายุ ทั้งพลังงาน น้ำ สารเคมี และการบำรุงรักษา ไม่ใช่ราคาซื้อ',
    ],
  },
  maintenance: {
    en: [
      'Daily logs of temperatures, power and pressures are what reveal a slow loss of efficiency before it becomes a failure.',
      'Monthly: water treatment, cooling towers, pumps and kW/TR trends. Annually: condenser-tube cleaning, compressor checks and a control review.',
      'Calibrated sensors matter: bad readings lead to bad control decisions.',
      'Under Cooling-as-a-Service the provider owns and maintains the plant, so this work is its responsibility.',
    ],
    th: [
      'การบันทึกอุณหภูมิ กำลังไฟฟ้า และความดันทุกวัน ช่วยให้เห็นประสิทธิภาพที่ค่อย ๆ ลดลงก่อนเกิดความเสียหาย',
      'รายเดือน: ตรวจการบำบัดน้ำ คูลลิ่งทาวเวอร์ ปั๊ม และแนวโน้ม kW/TR รายปี: ล้างท่อคอนเดนเซอร์ ตรวจคอมเพรสเซอร์ และทบทวนระบบควบคุม',
      'เซนเซอร์ต้องสอบเทียบ เพราะข้อมูลที่ผิดนำไปสู่การควบคุมที่ผิด',
      'ภายใต้ Cooling-as-a-Service ผู้ให้บริการเป็นเจ้าของและบำรุงรักษาระบบ งานเหล่านี้จึงเป็นความรับผิดชอบของผู้ให้บริการ',
    ],
  },
  ipmvpOptions: {
    en: [
      'IPMVP measures savings as adjusted baseline energy minus actual energy, with the baseline adjusted for weather, occupancy or production.',
      'Option A measures key parameters of the retrofitted equipment; Option B measures all of them; Option C uses the whole-facility meter; Option D uses a calibrated simulation.',
      'For a chiller plant, metering the plant itself in the spirit of Option B is usually the clearest approach.',
      'A good M&V plan fixes the boundary, baseline, adjustments, meters and who can audit the data before work starts.',
    ],
    th: [
      'IPMVP วัดผลประหยัดจากพลังงานตาม Baseline ที่ปรับแล้ว ลบด้วยพลังงานที่ใช้จริง โดยปรับ Baseline ตามสภาพอากาศ การใช้อาคาร หรือการผลิต',
      'ทางเลือก A วัดพารามิเตอร์หลักของอุปกรณ์ที่ปรับปรุง ทางเลือก B วัดทุกพารามิเตอร์ ทางเลือก C ใช้มิเตอร์รวมของอาคาร ทางเลือก D ใช้แบบจำลองที่สอบเทียบแล้ว',
      'สำหรับระบบชิลเลอร์ การวัดที่ตัวระบบเองตามแนวคิดทางเลือก B มักชัดเจนที่สุด',
      'แผน M&V ที่ดีต้องกำหนดขอบเขต Baseline การปรับค่า มิเตอร์ และผู้ตรวจสอบข้อมูลก่อนเริ่มงาน',
    ],
  },
  dataCenterPue: {
    en: [
      'PUE is total facility energy divided by IT energy; cooling is usually the largest part of the overhead above 1.0.',
      'Aisle containment, warmer supply temperatures within IT specifications, variable-speed fans and pumps and plant-wide optimisation all lower it.',
      'Changes must keep the facility’s redundancy and maintainability; shadow-mode optimisation lets operators approve every change first.',
      'Metering the cooling plant against an IPMVP baseline shows how much of a PUE gain comes from cooling.',
    ],
    th: [
      'PUE คือพลังงานรวมของอาคารหารด้วยพลังงานของอุปกรณ์ IT และระบบทำความเย็นมักเป็นส่วนใหญ่ที่สุดของส่วนเกินเหนือ 1.0',
      'การกั้นช่องทางเดินร้อนเย็น การเพิ่มอุณหภูมิจ่ายภายในช่วงที่อุปกรณ์ IT รองรับ พัดลมและปั๊มปรับรอบ และการปรับทั้งระบบร่วมกัน ช่วยลดค่า PUE',
      'การเปลี่ยนแปลงต้องรักษาระบบสำรองและการบำรุงรักษา การเริ่มจากโหมดเงาให้ผู้ปฏิบัติงานอนุมัติทุกการเปลี่ยนแปลงก่อน',
      'การติดมิเตอร์ระบบทำความเย็นเทียบกับ Baseline ตาม IPMVP แสดงได้ว่า PUE ที่ดีขึ้นมาจากระบบทำความเย็นเท่าไร',
    ],
  },
  hotelCooling: {
    en: [
      'Cooling runs all year in Thai hotels and is often the largest electricity load, so savings go straight to GOP.',
      'Link room cooling to occupancy, schedule function rooms to the event calendar and reset chilled-water temperature within comfort limits.',
      'Variable-speed drives, plant-wide optimisation and heat recovery for hot water are the main plant-level gains.',
      'Treat guest comfort as a hard limit and measure savings against a baseline adjusted for occupancy and weather.',
    ],
    th: [
      'ระบบทำความเย็นของโรงแรมในไทยทำงานทั้งปีและมักเป็นภาระไฟฟ้าที่ใหญ่ที่สุด ผลประหยัดจึงเพิ่ม GOP โดยตรง',
      'เชื่อมการทำความเย็นห้องพักกับการเข้าพัก ตั้งเวลาห้องจัดเลี้ยงตามตารางงาน และปรับอุณหภูมิน้ำเย็นภายในขอบเขตความสบาย',
      'ระบบปรับรอบ การปรับทั้งระบบร่วมกัน และการนำความร้อนกลับมาผลิตน้ำร้อน คือการประหยัดหลักระดับระบบ',
      'ถือความสบายของแขกเป็นขอบเขตที่ห้ามข้าม และวัดผลประหยัดเทียบกับ Baseline ที่ปรับตามการเข้าพักและสภาพอากาศ',
    ],
  },
  hospitalRedundancy: {
    en: [
      'N means just enough capacity; N+1 adds one spare unit so any single chiller, pump or tower can fail or be serviced; 2N means two complete independent systems.',
      'Redundancy covers the whole chain: chillers, pumps, towers, power, controls and pipework.',
      'Rotating duty and standby units and predictive fault detection keep a redundant plant efficient and proven.',
      'Plan upgrades in phases with redundancy maintained at every stage and 24/7 monitoring.',
    ],
    th: [
      'N คือกำลังพอดีกับภาระ N+1 เพิ่มเครื่องสำรองหนึ่งชุดให้ชิลเลอร์ ปั๊ม หรือคูลลิ่งทาวเวอร์เครื่องใดเสียหรือซ่อมได้ ส่วน 2N คือสองระบบที่สมบูรณ์และแยกจากกัน',
      'ระบบสำรองต้องครอบคลุมทั้งสาย ทั้งชิลเลอร์ ปั๊ม คูลลิ่งทาวเวอร์ ไฟฟ้า ระบบควบคุม และท่อ',
      'การสลับเครื่องหลักกับเครื่องสำรองและการตรวจจับความผิดปกติเชิงคาดการณ์ ช่วยให้ระบบสำรองมีประสิทธิภาพและพร้อมใช้จริง',
      'วางแผนการปรับปรุงเป็นเฟส รักษาระบบสำรองทุกขั้นตอน และเฝ้าระวังตลอด 24 ชั่วโมง',
    ],
  },
  firstProject: {
    en: [
      'Infinity CoolMaster’s first Cooling-as-a-Service chiller plant, for Platinum Pro Plastic in Rayong, is in testing and commissioning in November 2026.',
      'Infinity CoolMaster funds, owns and operates the plant; the client pays for efficient cooling with a minimum saving guaranteed in writing.',
      'Savings will be measured monthly against an IPMVP-aligned baseline adjusted for production and weather.',
      'Verified results will be published as a full case study once the client has approved them.',
    ],
    th: [
      'ระบบชิลเลอร์แบบ Cooling-as-a-Service แห่งแรกของ Infinity CoolMaster สำหรับแพลตตินั่ม โปร พลาสติก จังหวัดระยอง อยู่ระหว่างทดสอบและเดินระบบในเดือนพฤศจิกายน 2569',
      'Infinity CoolMaster เป็นผู้ลงทุน เป็นเจ้าของ และดูแลระบบ ลูกค้าจ่ายค่าความเย็นพร้อมการรับประกันผลประหยัดขั้นต่ำเป็นลายลักษณ์อักษร',
      'ผลประหยัดจะตรวจวัดทุกเดือนเทียบกับ Baseline ตามแนวทาง IPMVP ที่ปรับตามการผลิตและสภาพอากาศ',
      'ผลที่ตรวจวัดแล้วจะเผยแพร่เป็นกรณีศึกษาฉบับเต็มเมื่อลูกค้าอนุมัติ',
    ],
  },
  plasticsCooling: {
    en: [
      'In injection moulding, mould cooling is usually the largest share of the cycle time, so cooling sets both output and part quality.',
      'Unstable mould temperatures cause warping, sink marks and dimensional variation.',
      'Not every load needs the coldest water: hydraulic oil and some circuits can run on warmer tower water, which saves chiller energy.',
      'Scale in mould channels, oversized pumps at full speed and ageing chillers are the usual sources of waste.',
    ],
    th: [
      'ในงานฉีดพลาสติก ช่วงหล่อเย็นแม่พิมพ์มักเป็นส่วนที่ยาวที่สุดของรอบการผลิต ระบบทำความเย็นจึงกำหนดทั้งกำลังการผลิตและคุณภาพชิ้นงาน',
      'อุณหภูมิแม่พิมพ์ที่ไม่คงที่ทำให้ชิ้นงานบิดงอ เกิดรอยยุบ และขนาดคลาดเคลื่อน',
      'ไม่ใช่ทุกภาระที่ต้องการน้ำเย็นที่สุด น้ำมันไฮดรอลิกและบางวงจรใช้น้ำจากคูลลิ่งทาวเวอร์ได้ ซึ่งช่วยประหยัดพลังงานชิลเลอร์',
      'ตะกรันในช่องแม่พิมพ์ ปั๊มขนาดใหญ่ที่เดินเต็มรอบ และชิลเลอร์เก่า คือแหล่งความสิ้นเปลืองที่พบบ่อย',
    ],
  },
  touFt: {
    en: [
      'On Thai TOU tariffs, peak hours are generally 09:00–22:00 on weekdays, exactly when chiller plants work hardest.',
      'Many medium and large business tariffs also charge for the highest demand in peak hours, which a chiller plant often sets.',
      'The Ft charge is added to every unit and reviewed every four months by the Energy Regulatory Commission.',
      'A more efficient plant, load-following sequencing, pre-cooling and thermal storage all cut peak cost.',
    ],
    th: [
      'อัตรา TOU ของไทยมีช่วง Peak โดยทั่วไป 09:00–22:00 วันจันทร์–ศุกร์ ซึ่งตรงกับช่วงที่ระบบชิลเลอร์ทำงานหนักที่สุด',
      'อัตราสำหรับกิจการขนาดกลางและใหญ่หลายประเภทยังคิดค่าความต้องการพลังไฟฟ้าสูงสุดช่วง Peak ซึ่งระบบชิลเลอร์มักเป็นตัวกำหนด',
      'ค่า Ft บวกเพิ่มในทุกหน่วย และ กกพ. ทบทวนทุก 4 เดือน',
      'ระบบที่มีประสิทธิภาพสูงขึ้น การเดินเครื่องตามภาระ การทำความเย็นล่วงหน้า และระบบกักเก็บความเย็น ช่วยลดค่าไฟช่วง Peak',
    ],
  },
  energyLaw: {
    en: [
      'A factory or building is designated under Thailand’s Energy Conservation Promotion Act if it has meters of 1,000 kW or more, transformers of 1,175 kVA or more, or uses 20 million MJ of energy a year or more.',
      'Designated facilities must appoint a person responsible for energy, run an energy management system and report as required.',
      'The chiller plant is usually one of the largest energy users, so it is where the biggest measurable savings are.',
      'Confirm current requirements with DEDE, as the regulations have been amended over time.',
    ],
    th: [
      'โรงงานหรืออาคารเป็นโรงงานควบคุมหรืออาคารควบคุม หากมีมิเตอร์ตั้งแต่ 1,000 kW หรือหม้อแปลงตั้งแต่ 1,175 kVA หรือใช้พลังงานตั้งแต่ 20 ล้านเมกะจูลต่อปี',
      'ต้องแต่งตั้งผู้รับผิดชอบด้านพลังงาน จัดให้มีระบบการจัดการพลังงาน และรายงานตามที่กำหนด',
      'ระบบชิลเลอร์มักเป็นหนึ่งในผู้ใช้พลังงานรายใหญ่ที่สุด จึงเป็นจุดที่ประหยัดได้มากและวัดผลได้ชัด',
      'ควรตรวจสอบข้อกำหนดล่าสุดกับ พพ. เพราะกฎกระทรวงมีการแก้ไขเป็นระยะ',
    ],
  },
  foodCold: {
    en: [
      'In food and beverage plants, cooling protects product safety and quality, so reliability and stable temperatures come first.',
      'Chilled water serves process cooling and production-room air conditioning; cold rooms often run on separate refrigeration.',
      'Fixed settings, one cold loop for every load, constant-speed pumps and fouled exchangers are the usual sources of waste.',
      'Any change to hygiene-critical cooling should be planned, documented and verified, with redundancy kept in place.',
    ],
    th: [
      'ในโรงงานอาหารและเครื่องดื่ม ความเย็นปกป้องความปลอดภัยและคุณภาพของสินค้า ความเชื่อถือได้และอุณหภูมิที่คงที่จึงต้องมาก่อน',
      'น้ำเย็นใช้ทั้งความเย็นในกระบวนการผลิตและการปรับอากาศห้องผลิต ส่วนห้องเย็นมักใช้ระบบทำความเย็นแยก',
      'ค่าที่ตั้งคงที่ วงจรน้ำเย็นเดียวสำหรับทุกภาระ ปั๊มความเร็วคงที่ และเครื่องแลกเปลี่ยนความร้อนที่สกปรก คือแหล่งความสิ้นเปลืองที่พบบ่อย',
      'ทุกการเปลี่ยนแปลงในระบบความเย็นที่สำคัญต่อสุขอนามัยต้องวางแผน บันทึก และตรวจยืนยัน โดยรักษาระบบสำรองไว้',
    ],
  },
  pharmaCleanroom: {
    en: [
      'Cleanrooms use chilled water around the clock to hold validated temperature and humidity limits.',
      'High air-change rates and dehumidification make them some of the most cooling-intensive spaces.',
      'The biggest savings are usually in the central plant: sequencing, efficient chillers, variable-speed pumps and matching water temperature to real dehumidification needs.',
      'Changes to qualified HVAC follow change control, with redundancy maintained and room conditions verified.',
    ],
    th: [
      'ห้องสะอาดใช้น้ำเย็นตลอดเวลาเพื่อรักษาอุณหภูมิและความชื้นในช่วงที่ผ่านการรับรอง',
      'อัตราการเปลี่ยนอากาศสูงและการลดความชื้น ทำให้เป็นพื้นที่ที่ใช้ความเย็นมากที่สุดประเภทหนึ่ง',
      'ผลประหยัดหลักมักอยู่ที่ระบบผลิตน้ำเย็นส่วนกลาง ทั้งการจัดลำดับเครื่อง ชิลเลอร์ประสิทธิภาพสูง ปั๊มปรับรอบ และการตั้งอุณหภูมิน้ำตามที่การลดความชื้นต้องการจริง',
      'การเปลี่ยนแปลงระบบ HVAC ที่ผ่านการรับรองต้องผ่านการควบคุมการเปลี่ยนแปลง รักษาระบบสำรอง และตรวจยืนยันสภาวะห้อง',
    ],
  },
  caasVsEsco: {
    en: [
      'In a typical ESCO contract the client funds or finances the project and owns the equipment, while the ESCO guarantees savings.',
      'In Cooling-as-a-Service the provider funds, owns, operates and maintains the plant, and the client pays for cooling from the savings.',
      'Both share performance risk through a guarantee; they differ in capital, ownership and who runs the plant.',
      'Whichever you choose, insist on a written baseline, a clear measurement method and a defined shortfall remedy.',
    ],
    th: [
      'ในสัญญา ESCO ทั่วไป ลูกค้าเป็นผู้ลงทุนหรือจัดหาเงินทุนและเป็นเจ้าของอุปกรณ์ ส่วน ESCO รับประกันผลประหยัด',
      'ใน Cooling-as-a-Service ผู้ให้บริการลงทุน เป็นเจ้าของ เดินระบบ และบำรุงรักษา ลูกค้าจ่ายค่าความเย็นจากผลประหยัด',
      'ทั้งสองแบบแบ่งความเสี่ยงด้านผลประหยัดผ่านการรับประกัน แต่ต่างกันที่เงินลงทุน กรรมสิทธิ์ และผู้ดูแลระบบ',
      'ไม่ว่าแบบใด ควรมี Baseline เป็นลายลักษณ์อักษร วิธีวัดผลที่ชัดเจน และการชดเชยที่กำหนดไว้หากผลประหยัดไม่ถึง',
    ],
  },
  refrigerants: {
    en: [
      'R-22 (HCFC-22) is being phased out in Thailand under the Montreal Protocol, so recharging old R-22 chillers gets harder and costlier.',
      'Thailand ratified the Kigali Amendment on 3 April 2024 and committed to cut HFC production and consumption by 80% by 2045.',
      'Plan replacement of old R-22 chillers before a major leak forces it, and choose a refrigerant with a long future for new plants.',
      'Recover and dispose of old refrigerant correctly when a chiller is replaced.',
    ],
    th: [
      'R-22 (HCFC-22) กำลังถูกยกเลิกในไทยตามพิธีสารมอนทรีออล การเติมสารให้ชิลเลอร์ R-22 รุ่นเก่าจึงยากและแพงขึ้น',
      'ประเทศไทยให้สัตยาบันการแก้ไขคิกาลีเมื่อ 3 เมษายน 2567 และให้คำมั่นลดการผลิตและการใช้ HFC ลง 80% ภายในปี 2588',
      'ควรวางแผนเปลี่ยนชิลเลอร์ R-22 ก่อนการรั่วครั้งใหญ่จะบังคับให้เปลี่ยน และเลือกสารทำความเย็นที่ใช้ได้ระยะยาวสำหรับระบบใหม่',
      'เมื่อเปลี่ยนชิลเลอร์ ต้องเก็บกลับและกำจัดสารทำความเย็นเดิมอย่างถูกต้อง',
    ],
  },
};
