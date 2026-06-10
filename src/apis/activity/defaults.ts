import { Activity, ActivityTag, ActivityType } from '../../models/activity';
import { p } from '../../utils/path-utils';

const tagCaas: ActivityTag = {
  id: 1,
  color: '#10B981',
  title: { en: 'CaaS', th: 'CaaS' },
};

const tagTech: ActivityTag = {
  id: 2,
  color: '#38BDF8',
  title: { en: 'Technology', th: 'เทคโนโลยี' },
};

const tagNews: ActivityTag = {
  id: 3,
  color: '#0F172A',
  title: { en: 'News', th: 'ข่าวสาร' },
};

const typeGuide: ActivityType = {
  id: 1,
  color: '#10B981',
  title: { en: 'Guide', th: 'คู่มือ' },
};

const typeTechnical: ActivityType = {
  id: 2,
  color: '#38BDF8',
  title: { en: 'Technical', th: 'เชิงเทคนิค' },
};

const typeNews: ActivityType = {
  id: 3,
  color: '#475569',
  title: { en: 'Company News', th: 'ข่าวบริษัท' },
};

/** Default insights & news; override via cms_content collection 'activities'. */
const activities: Activity[] = [
  {
    id: 1,
    thumbnail: p('assets/placeholders/facility-commercial.svg'),
    banner: p('assets/placeholders/banner-soft.svg'),
    tag: tagCaas,
    type: typeGuide,
    title: {
      en: 'The CFO’s guide to Cooling-as-a-Service',
      th: 'คู่มือ Cooling-as-a-Service สำหรับ CFO',
    },
    excerpt: {
      en: 'Why leading enterprises are moving cooling off the balance sheet — and what a performance contract really covers.',
      th: 'ทำไมองค์กรชั้นนำจึงย้ายระบบทำความเย็นออกจากงบดุล และสัญญาแบบรับประกันผลครอบคลุมอะไรบ้าง',
    },
    details: {
      en: 'Chilled-water plants are capital-hungry assets that depreciate fast and demand specialist care. Under Cooling-as-a-Service, the provider finances, builds, owns and operates the plant, charging only for cooling delivered or savings achieved.\n\nFor the CFO, this changes three things at once. First, capital: a THB 80–150M plant replacement becomes an operating expense matched to the savings it creates. Second, risk: performance, maintenance and end-of-life obligations transfer to the provider, backed by a contractual savings guarantee. Third, transparency: IPMVP-aligned measurement & verification turns "we think we saved" into an auditable monthly statement.\n\nThe questions to ask any CaaS provider: How is the baseline set, and who verifies it? What happens if guaranteed savings are missed? Who owns the data? At Infinity CoolMaster, the answers are contractual: third-party-verifiable baselines, shortfalls compensated, and your data is yours — always.',
      th: 'ระบบน้ำเย็นเป็นสินทรัพย์ที่ใช้เงินลงทุนสูง เสื่อมราคาเร็ว และต้องการการดูแลเฉพาะทาง ภายใต้ Cooling-as-a-Service ผู้ให้บริการเป็นผู้ลงทุน สร้าง เป็นเจ้าของ และดูแลระบบ โดยคิดค่าบริการตามความเย็นที่ส่งมอบหรือผลประหยัดที่เกิดขึ้นจริง\n\nสำหรับ CFO สิ่งนี้เปลี่ยน 3 เรื่องพร้อมกัน หนึ่ง—เงินลงทุน: ค่าเปลี่ยนระบบ 80–150 ล้านบาทกลายเป็นค่าใช้จ่ายดำเนินงานที่สอดคล้องกับผลประหยัด สอง—ความเสี่ยง: ภาระด้านสมรรถนะ การบำรุงรักษา และการจัดการเมื่อหมดอายุ ถูกโอนไปยังผู้ให้บริการพร้อมการันตีผลประหยัดในสัญญา สาม—ความโปร่งใส: การตรวจวัดตามมาตรฐาน IPMVP เปลี่ยน "เราคิดว่าประหยัด" ให้เป็นรายงานรายเดือนที่ตรวจสอบได้\n\nคำถามที่ควรถามผู้ให้บริการ CaaS ทุกราย: Baseline ตั้งอย่างไรและใครตรวจสอบ? หากผลประหยัดต่ำกว่าการันตีจะเกิดอะไรขึ้น? ข้อมูลเป็นของใคร? ที่ Infinity CoolMaster คำตอบทั้งหมดอยู่ในสัญญา',
    },
    publishedAt: '2026-05-18',
    nextActivityId: 2,
  },
  {
    id: 2,
    thumbnail: p('assets/placeholders/facility-retail.svg'),
    banner: p('assets/placeholders/banner-soft.svg'),
    tag: tagTech,
    type: typeTechnical,
    title: {
      en: 'How ML optimization cut a Bangkok tower’s cooling bill by 28%',
      th: 'ML ลดค่าความเย็นอาคารในกรุงเทพฯ ได้ 28% อย่างไร',
    },
    excerpt: {
      en: 'Inside the models: load forecasting, chiller sequencing and setpoint optimization working together in real time.',
      th: 'เจาะลึกการทำงานของโมเดล: พยากรณ์โหลด จัดลำดับชิลเลอร์ และปรับค่าการทำงานแบบเรียลไทม์',
    },
    details: {
      en: 'A chilled-water plant has thousands of valid operating states; only a handful are efficient for any given moment. Our CPMS closes that gap with three cooperating models.\n\nLoad forecasting predicts the next 24 hours of cooling demand from occupancy patterns, weather forecasts and historical load. Sequencing chooses which chillers, pumps and towers to run — and at what part-load ratio — to meet that demand at the lowest total kW/TR. Setpoint optimization continuously trims chilled-water and condenser-water temperatures within comfort and safety envelopes.\n\nAt the Sathorn tower featured in our case study, these models retune the plant every five minutes. The verified result: 28% less cooling energy against the IPMVP baseline, with comfort complaints down — not up.',
      th: 'ระบบน้ำเย็นมีสถานะการทำงานที่เป็นไปได้นับพันแบบ แต่มีเพียงไม่กี่แบบที่มีประสิทธิภาพในแต่ละช่วงเวลา CPMS ของเราปิดช่องว่างนี้ด้วยโมเดล 3 ตัวที่ทำงานร่วมกัน\n\nโมเดลพยากรณ์โหลดคาดการณ์ความต้องการความเย็นล่วงหน้า 24 ชั่วโมงจากรูปแบบการใช้อาคาร พยากรณ์อากาศ และข้อมูลในอดีต โมเดลจัดลำดับเลือกว่าจะเดินชิลเลอร์ ปั๊ม และหอผึ่งเย็นตัวใดที่สัดส่วนโหลดเท่าใด เพื่อให้ค่า kW/TR รวมต่ำที่สุด และโมเดลปรับค่าการทำงานคอยลดอุณหภูมิน้ำเย็นและน้ำระบายความร้อนภายในกรอบความสบายและความปลอดภัย\n\nที่อาคารสาทรในกรณีศึกษาของเรา โมเดลเหล่านี้ปรับจูนระบบทุก 5 นาที ผลที่พิสูจน์ได้: พลังงานความเย็นลดลง 28% เทียบกับ Baseline มาตรฐาน IPMVP โดยข้อร้องเรียนด้านความสบายลดลงด้วย',
    },
    publishedAt: '2026-04-02',
    nextActivityId: 3,
  },
  {
    id: 3,
    thumbnail: p('assets/placeholders/facility-datacenter.svg'),
    banner: p('assets/placeholders/banner-soft.svg'),
    tag: tagTech,
    type: typeTechnical,
    title: {
      en: 'IPMVP explained: how guaranteed savings are actually measured',
      th: 'มาตรฐาน IPMVP: การวัดผลประหยัดแบบการันตีทำอย่างไร',
    },
    excerpt: {
      en: 'No savings claim is credible without a baseline. Here’s how Option C whole-facility measurement works in practice.',
      th: 'คำกล่าวอ้างเรื่องผลประหยัดไม่มีความหมายหากไร้ Baseline — มาดูวิธีการวัดแบบ Option C ในทางปฏิบัติ',
    },
    details: {
      en: 'The International Performance Measurement and Verification Protocol (IPMVP) is the global standard for proving energy savings. The core idea: savings cannot be measured directly — they are the difference between actual consumption and what consumption would have been without the intervention.\n\nThat counterfactual is the baseline model. We build it from at least 12 months of pre-retrofit interval data, regressed against the variables that drive cooling load: ambient wet-bulb temperature, occupancy, and production throughput where relevant. The model and its statistical validity (R², CV-RMSE) are agreed in the contract before work begins.\n\nEvery month, the adjusted baseline is computed from actual conditions and compared to metered consumption. The difference — independently checkable — is your verified saving. If it falls short of the guarantee, the shortfall is on us. That is what makes a savings guarantee bankable rather than a marketing line.',
      th: 'IPMVP คือมาตรฐานสากลในการพิสูจน์ผลประหยัดพลังงาน แนวคิดหลักคือ ผลประหยัดวัดตรง ๆ ไม่ได้ แต่คือส่วนต่างระหว่างการใช้พลังงานจริง กับการใช้พลังงานที่ "ควรจะเป็น" หากไม่มีการปรับปรุง\n\nตัวเปรียบเทียบนั้นคือโมเดล Baseline ซึ่งเราสร้างจากข้อมูลย้อนหลังอย่างน้อย 12 เดือนก่อนการปรับปรุง โดยวิเคราะห์ถดถอยกับตัวแปรที่ขับเคลื่อนโหลดความเย็น เช่น อุณหภูมิกระเปาะเปียก การใช้อาคาร และปริมาณการผลิต โมเดลและความถูกต้องทางสถิติ (R², CV-RMSE) ถูกตกลงในสัญญาก่อนเริ่มงาน\n\nทุกเดือน Baseline ที่ปรับตามสภาพจริงจะถูกเทียบกับการใช้พลังงานที่วัดได้ ส่วนต่างที่ตรวจสอบโดยอิสระได้คือผลประหยัดของคุณ หากต่ำกว่าการันตี เราเป็นผู้รับผิดชอบ นี่คือสิ่งที่ทำให้การันตีผลประหยัดเชื่อถือได้จริง ไม่ใช่เพียงคำโฆษณา',
    },
    publishedAt: '2026-02-20',
    nextActivityId: 4,
  },
  {
    id: 4,
    thumbnail: p('assets/placeholders/facility-hospitality.svg'),
    banner: p('assets/placeholders/banner-soft.svg'),
    tag: tagNews,
    type: typeNews,
    title: {
      en: 'Infinity CoolMaster signs net-zero cooling partnership with leading hotel group',
      th: 'Infinity CoolMaster ลงนามความร่วมมือ Net-Zero กับเครือโรงแรมชั้นนำ',
    },
    excerpt: {
      en: 'A multi-property CaaS rollout targeting 30% portfolio-wide cooling energy reduction by 2028.',
      th: 'การขยาย CaaS หลายแห่งพร้อมกัน ตั้งเป้าลดพลังงานความเย็นทั้งพอร์ตลง 30% ภายในปี 2571',
    },
    details: {
      en: 'Infinity CoolMaster has signed a framework agreement with one of Southeast Asia’s leading hospitality groups to deliver Cooling-as-a-Service across its Thai portfolio.\n\nThe rollout begins with three flagship properties in Bangkok and Phuket, where plant audits indicate savings potential of 25–35%. Each property receives a modernized chilled-water plant, our CPMS optimization layer, and IPMVP-aligned monthly verification — all financed by Infinity CoolMaster under long-term performance contracts.\n\n“Cooling is our largest controllable energy cost and our biggest single lever toward net-zero,” said the group’s Chief Sustainability Officer. “A guaranteed-savings model lets us act now, at portfolio scale, without competing for capital against guest experience.”',
      th: 'Infinity CoolMaster ได้ลงนามข้อตกลงกรอบความร่วมมือกับเครือโรงแรมชั้นนำของเอเชียตะวันออกเฉียงใต้ เพื่อให้บริการ Cooling-as-a-Service ทั่วทั้งพอร์ตในประเทศไทย\n\nการดำเนินงานเริ่มที่โรงแรมเรือธง 3 แห่งในกรุงเทพฯ และภูเก็ต ซึ่งผลการประเมินชี้ศักยภาพการประหยัด 25–35% แต่ละแห่งจะได้รับระบบน้ำเย็นที่ทันสมัย ชั้นปรับจูน CPMS และการตรวจวัดรายเดือนตามมาตรฐาน IPMVP โดย Infinity CoolMaster เป็นผู้ลงทุนทั้งหมดภายใต้สัญญารับประกันผลระยะยาว\n\n"ระบบทำความเย็นคือต้นทุนพลังงานที่ควบคุมได้ก้อนใหญ่ที่สุด และเป็นคันโยกสำคัญที่สุดสู่ Net-Zero ของเรา" ประธานเจ้าหน้าที่ด้านความยั่งยืนของกลุ่มกล่าว',
    },
    publishedAt: '2026-01-12',
    nextActivityId: 1,
  },
];

export default activities;
