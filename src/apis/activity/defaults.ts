import { Activity, ActivityTag, ActivityType } from '../../models/activity';
import { p } from '../../utils/path-utils';

export const tagCaas: ActivityTag = {
  id: 1,
  color: '#10B981',
  title: { en: 'CaaS', th: 'CaaS' },
};

export const tagTech: ActivityTag = {
  id: 2,
  color: '#38BDF8',
  title: { en: 'Technology', th: 'เทคโนโลยี' },
};

export const tagNews: ActivityTag = {
  id: 3,
  color: '#0F172A',
  title: { en: 'News', th: 'ข่าวสาร' },
};

export const typeGuide: ActivityType = {
  id: 1,
  color: '#10B981',
  title: { en: 'Guide', th: 'คู่มือ' },
};

export const typeTechnical: ActivityType = {
  id: 2,
  color: '#38BDF8',
  title: { en: 'Technical', th: 'เชิงเทคนิค' },
};

export const typeNews: ActivityType = {
  id: 3,
  color: '#475569',
  title: { en: 'Company News', th: 'ข่าวบริษัท' },
};

/** Default insights & news; override via cms_content collection 'activities'. */
const activities: Activity[] = [
  {
    id: 1,
    slug: 'cfo-guide-cooling-as-a-service',
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
      en: 'Chilled-water plants are capital-hungry assets that depreciate fast and demand specialist care. Under Cooling-as-a-Service, the provider finances, builds, owns and operates the plant, charging only for cooling delivered or savings achieved.\n\nFor the CFO, this changes three things at once. First, capital: a multi-million-baht plant replacement becomes an operating expense matched to the savings it creates. Second, risk: performance, maintenance and end-of-life obligations transfer to the provider, backed by a contractual savings guarantee. Third, transparency: IPMVP-aligned measurement & verification turns "we think we saved" into an auditable monthly statement.\n\nThe questions to ask any CaaS provider: How is the baseline set, and who verifies it? What happens if guaranteed savings are missed? Who owns the data? At Infinity CoolMaster, the answers are contractual: third-party-verifiable baselines, shortfalls compensated, and your data is yours — always.',
      th: 'ระบบน้ำเย็นเป็นสินทรัพย์ที่ใช้เงินลงทุนสูง เสื่อมราคาเร็ว และต้องการการดูแลเฉพาะทาง ภายใต้ Cooling-as-a-Service ผู้ให้บริการเป็นผู้ลงทุน สร้าง เป็นเจ้าของ และดูแลระบบ โดยคิดค่าบริการตามความเย็นที่ส่งมอบหรือผลประหยัดที่เกิดขึ้นจริง\n\nสำหรับ CFO สิ่งนี้เปลี่ยน 3 เรื่องพร้อมกัน หนึ่ง—เงินลงทุน: ค่าเปลี่ยนระบบหลายล้านบาทกลายเป็นค่าใช้จ่ายดำเนินงานที่สอดคล้องกับผลประหยัด สอง—ความเสี่ยง: ภาระด้านสมรรถนะ การบำรุงรักษา และการจัดการเมื่อหมดอายุ ถูกโอนไปยังผู้ให้บริการพร้อมการันตีผลประหยัดในสัญญา สาม—ความโปร่งใส: การตรวจวัดตามมาตรฐาน IPMVP เปลี่ยน "เราคิดว่าประหยัด" ให้เป็นรายงานรายเดือนที่ตรวจสอบได้\n\nคำถามที่ควรถามผู้ให้บริการ CaaS ทุกราย: Baseline ตั้งอย่างไรและใครตรวจสอบ? หากผลประหยัดต่ำกว่าการันตีจะเกิดอะไรขึ้น? ข้อมูลเป็นของใคร? ที่ Infinity CoolMaster คำตอบทั้งหมดอยู่ในสัญญา',
    },
    publishedAt: '2026-05-18',
    nextActivityId: 3,
  },
  {
    id: 3,
    slug: 'ipmvp-explained-how-savings-are-measured',
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
    nextActivityId: 1001,
  },
];

export default activities;
