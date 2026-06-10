import { HeroBanner } from '../../models/hero-banner';

/** The four CaaS service pillars shown in the services carousel. */
const heroBanners: HeroBanner[] = [
  {
    id: 1,
    icon: 'cpms',
    title: {
      en: 'Chiller Plant Management System (CPMS)',
      th: 'ระบบบริหารจัดการชิลเลอร์ (CPMS)',
    },
    subtitle: { en: 'Intelligent Control', th: 'การควบคุมอัจฉริยะ' },
    excerpt: {
      en: 'One unified control layer for chillers, pumps, cooling towers and AHUs — sequencing every asset for the lowest possible kW/TR.',
      th: 'ชั้นควบคุมเดียวสำหรับชิลเลอร์ ปั๊ม หอผึ่งเย็น และ AHU — จัดลำดับการทำงานของทุกอุปกรณ์เพื่อค่า kW/TR ที่ต่ำที่สุด',
    },
    banner: '',
  },
  {
    id: 2,
    icon: 'ai',
    title: {
      en: 'ML-Driven Dynamic Optimization',
      th: 'การปรับจูนแบบไดนามิกด้วย Machine Learning',
    },
    subtitle: { en: 'AI Optimization', th: 'ขับเคลื่อนด้วย AI' },
    excerpt: {
      en: 'Machine-learning models forecast load, weather and occupancy to set optimal plant setpoints in real time — no manual tuning required.',
      th: 'โมเดล Machine Learning พยากรณ์โหลด สภาพอากาศ และการใช้งานอาคาร เพื่อตั้งค่าการทำงานที่เหมาะสมที่สุดแบบเรียลไทม์',
    },
    banner: '',
  },
  {
    id: 3,
    icon: 'monitoring',
    title: {
      en: '24/7 Remote Monitoring & Fault Detection',
      th: 'เฝ้าระวังระยะไกลและตรวจจับความผิดปกติ 24/7',
    },
    subtitle: { en: 'Always On', th: 'ไม่มีวันหยุด' },
    excerpt: {
      en: 'Our operations center watches every sensor around the clock; predictive analytics flag faults before they cost you energy or uptime.',
      th: 'ศูนย์ปฏิบัติการของเราเฝ้าดูทุกเซนเซอร์ตลอดเวลา พร้อมการวิเคราะห์เชิงคาดการณ์ที่แจ้งเตือนก่อนปัญหาจะกระทบพลังงานหรือการใช้งาน',
    },
    banner: '',
  },
  {
    id: 4,
    icon: 'mv',
    title: {
      en: 'IPMVP-Aligned Measurement & Verification',
      th: 'การตรวจวัดพิสูจน์ผลตามมาตรฐาน IPMVP',
    },
    subtitle: { en: 'Transparent Results', th: 'ผลลัพธ์โปร่งใส' },
    excerpt: {
      en: 'Savings are measured against an agreed baseline using the international IPMVP protocol — independently verifiable, every month.',
      th: 'ผลประหยัดถูกตรวจวัดเทียบกับ Baseline ที่ตกลงร่วมกันตามมาตรฐานสากล IPMVP ตรวจสอบโดยอิสระได้ทุกเดือน',
    },
    banner: '',
  },
];

export default heroBanners;
