import { Benefit } from '../../models/benefit';

const benefits: Benefit[] = [
  {
    id: 1,
    seq: 1,
    icon: 'zero-capex',
    title: { en: 'Zero CapEx', th: 'ไม่ต้องลงทุน' },
    excerpt: {
      en: 'No upfront investment. We fund, build and own the plant — you simply pay for efficient cooling.',
      th: 'ไม่มีเงินลงทุนเริ่มต้น เราเป็นผู้ลงทุน ติดตั้ง และเป็นเจ้าของระบบ คุณจ่ายเฉพาะความเย็นที่มีประสิทธิภาพ',
    },
  },
  {
    id: 2,
    seq: 2,
    icon: 'guaranteed',
    title: { en: 'Guaranteed Savings', th: 'การันตีผลประหยัด' },
    excerpt: {
      en: 'A minimum 10% energy saving, written into your contract and verified every month.',
      th: 'ผลประหยัดพลังงานขั้นต่ำ 10% ระบุไว้ในสัญญา พร้อมการตรวจวัดยืนยันทุกเดือน',
    },
  },
  {
    id: 3,
    seq: 3,
    icon: 'ai',
    title: { en: 'AI-Optimized', th: 'ขับเคลื่อนด้วย AI' },
    excerpt: {
      en: 'Our CPMS with machine learning continuously tunes chillers, pumps and towers for peak efficiency.',
      th: 'ระบบ CPMS พร้อม Machine Learning ปรับจูนชิลเลอร์ ปั๊ม และหอผึ่งเย็นให้มีประสิทธิภาพสูงสุดตลอดเวลา',
    },
  },
  {
    id: 4,
    seq: 4,
    icon: 'mv',
    title: { en: 'Measured & Verified', th: 'วัดผลโปร่งใส' },
    excerpt: {
      en: 'IPMVP-aligned M&V reporting gives you transparent, auditable savings you can trust.',
      th: 'รายงานการตรวจวัดพิสูจน์ผล (M&V) ตามมาตรฐาน IPMVP โปร่งใสและตรวจสอบได้',
    },
  },
  {
    id: 5,
    seq: 5,
    icon: 'support',
    title: { en: '24/7 Care', th: 'ดูแลตลอด 24 ชม.' },
    excerpt: {
      en: 'Remote monitoring, predictive fault detection and rapid-response engineers around the clock.',
      th: 'เฝ้าระวังจากระยะไกล คาดการณ์ความผิดปกติล่วงหน้า พร้อมทีมวิศวกรตอบสนองตลอด 24 ชั่วโมง',
    },
  },
];

export default benefits;
