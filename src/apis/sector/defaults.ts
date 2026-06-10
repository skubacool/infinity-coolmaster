import { Sector } from '../../models/sector';

const sectors: Sector[] = [
  {
    id: 1,
    seq: 1,
    key: 'commercial',
    icon: 'commercial',
    title: { en: 'Commercial', th: 'อาคารพาณิชย์' },
    excerpt: {
      en: 'Office towers and mixed-use estates — comfort cooling at the lowest cost per square meter.',
      th: 'อาคารสำนักงานและโครงการมิกซ์ยูส — ความเย็นสบายในต้นทุนต่อตารางเมตรที่ต่ำที่สุด',
    },
  },
  {
    id: 2,
    seq: 2,
    key: 'industrial',
    icon: 'industrial',
    title: { en: 'Industrial', th: 'โรงงานอุตสาหกรรม' },
    excerpt: {
      en: 'Process and cold-chain cooling engineered for reliability, throughput and energy intensity targets.',
      th: 'ความเย็นสำหรับกระบวนการผลิตและคลังความเย็น ออกแบบเพื่อความเสถียรและเป้าหมายการใช้พลังงาน',
    },
  },
  {
    id: 3,
    seq: 3,
    key: 'healthcare',
    icon: 'healthcare',
    title: { en: 'Healthcare', th: 'โรงพยาบาล' },
    excerpt: {
      en: 'Hospitals demand 24/7 uptime and strict air quality — we guarantee both, while cutting the bill.',
      th: 'โรงพยาบาลต้องการความพร้อม 24/7 และคุณภาพอากาศที่เข้มงวด — เราการันตีทั้งสองพร้อมลดค่าไฟ',
    },
  },
  {
    id: 4,
    seq: 4,
    key: 'hospitality',
    icon: 'hospitality',
    title: { en: 'Hospitality', th: 'โรงแรมและรีสอร์ท' },
    excerpt: {
      en: 'Hotels and resorts: guest comfort first, with savings that flow straight to GOP.',
      th: 'โรงแรมและรีสอร์ท: ความสบายของแขกมาก่อน พร้อมผลประหยัดที่ส่งตรงถึงกำไรขั้นต้น',
    },
  },
  {
    id: 5,
    seq: 5,
    key: 'retail',
    icon: 'retail',
    title: { en: 'Retail', th: 'ศูนย์การค้า' },
    excerpt: {
      en: 'Malls and big-box retail — stable comfort across huge, variable footfall at minimum kW/TR.',
      th: 'ศูนย์การค้าและค้าปลีกขนาดใหญ่ — ความเย็นสม่ำเสมอรองรับผู้ใช้บริการที่ผันผวน ด้วย kW/TR ต่ำสุด',
    },
  },
  {
    id: 6,
    seq: 6,
    key: 'data-center',
    icon: 'data-center',
    title: { en: 'Data Centers', th: 'ดาต้าเซ็นเตอร์' },
    excerpt: {
      en: 'Mission-critical cooling with redundancy, predictive maintenance and PUE you can report.',
      th: 'ความเย็นสำหรับระบบสำคัญยิ่งยวด พร้อมความซ้ำซ้อน การบำรุงรักษาเชิงคาดการณ์ และค่า PUE ที่รายงานได้',
    },
  },
];

export default sectors;
