import { ProcessStep } from '../../models/process-step';

/** The five-step CaaS engagement journey; override via cms_content 'process_steps'. */
const processSteps: ProcessStep[] = [
  {
    id: 1,
    seq: 1,
    icon: 'chart',
    title: { en: 'Free Cooling Audit', th: 'ตรวจประเมินฟรี' },
    excerpt: {
      en: 'We analyze 12 months of electricity bills and survey your plant to quantify the real savings potential.',
      th: 'เราวิเคราะห์ค่าไฟย้อนหลัง 12 เดือนและสำรวจหน้างาน เพื่อหาศักยภาพการประหยัดที่แท้จริง',
    },
  },
  {
    id: 2,
    seq: 2,
    icon: 'mv',
    title: { en: 'Guaranteed Proposal', th: 'ข้อเสนอพร้อมการันตี' },
    excerpt: {
      en: 'You receive a written offer: savings percentage, contract terms, and an IPMVP baseline agreed before any work begins.',
      th: 'รับข้อเสนอเป็นลายลักษณ์อักษร ระบุเปอร์เซ็นต์ประหยัด เงื่อนไขสัญญา และ Baseline ตามมาตรฐาน IPMVP ก่อนเริ่มงาน',
    },
  },
  {
    id: 3,
    seq: 3,
    icon: 'zero-capex',
    title: { en: 'We Invest & Install', th: 'เราลงทุนและติดตั้ง' },
    excerpt: {
      en: 'Zero CapEx on your side. Installation is planned around your operating schedule — no disruption to your business.',
      th: 'ไม่ใช้เงินลงทุนของคุณ การติดตั้งวางแผนตามตารางการใช้งาน ไม่กระทบการดำเนินธุรกิจ',
    },
  },
  {
    id: 4,
    seq: 4,
    icon: 'ai',
    title: { en: 'AI Operation, 24/7', th: 'AI ดูแลตลอด 24 ชม.' },
    excerpt: {
      en: 'Our CPMS and machine-learning models retune the plant continuously, with a monitoring center watching around the clock.',
      th: 'CPMS และ Machine Learning ปรับจูนระบบอย่างต่อเนื่อง พร้อมศูนย์เฝ้าระวังตลอด 24 ชั่วโมง',
    },
  },
  {
    id: 5,
    seq: 5,
    icon: 'guaranteed',
    title: { en: 'Verified Savings, Monthly', th: 'พิสูจน์ผลทุกเดือน' },
    excerpt: {
      en: 'An IPMVP-aligned M&V report lands every month. If savings fall short of the guarantee, the shortfall is on us.',
      th: 'รับรายงาน M&V ตามมาตรฐาน IPMVP ทุกเดือน หากผลประหยัดต่ำกว่าการันตี เราเป็นผู้ชดเชยส่วนต่าง',
    },
  },
];

export default processSteps;
