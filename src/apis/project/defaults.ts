import { Project } from '../../models/project';
import { p } from '../../utils/path-utils';

const photoSet = (key: string): string[] => [
  p(`assets/placeholders/${key}.svg`),
  p('assets/placeholders/banner-soft.svg'),
  p(`assets/placeholders/${key}.svg`),
  p('assets/placeholders/banner-soft.svg'),
  p(`assets/placeholders/${key}.svg`),
];

/** Default CaaS case studies; override via cms_content collection 'projects'. */
const projects: Project[] = [
  {
    id: 1,
    thumbnail: p('assets/placeholders/facility-commercial.svg'),
    banner: p('assets/placeholders/banner-soft.svg'),
    title: {
      en: 'Grade-A Office Tower, Sathorn',
      th: 'อาคารสำนักงานเกรดเอ ย่านสาทร',
    },
    excerpt: {
      en: 'A 38-storey tower replaced its aging plant under CaaS — 28% verified savings from day one, with zero capital outlay.',
      th: 'อาคารสูง 38 ชั้นเปลี่ยนระบบทำความเย็นเดิมเป็น CaaS — ประหยัดพลังงาน 28% ตั้งแต่วันแรก โดยไม่ใช้เงินลงทุน',
    },
    details: {
      en: 'The landlord faced a THB 120M chiller replacement with no budget appetite. Under our CaaS contract we financed and installed a new high-efficiency plant — magnetic-bearing chillers, variable primary flow and our CPMS control layer. Machine-learning optimization now sequences the plant against live occupancy and weather. Verified savings have averaged 28% against the IPMVP baseline, and tenant comfort complaints are down 70%.',
      th: 'เจ้าของอาคารต้องเผชิญค่าเปลี่ยนชิลเลอร์กว่า 120 ล้านบาทโดยไม่มีงบประมาณ ภายใต้สัญญา CaaS เราเป็นผู้ลงทุนและติดตั้งระบบใหม่ประสิทธิภาพสูง — ชิลเลอร์ Magnetic Bearing ระบบ Variable Primary Flow และชั้นควบคุม CPMS ของเรา ปัจจุบัน Machine Learning ปรับการทำงานตามการใช้อาคารและสภาพอากาศจริง ผลประหยัดเฉลี่ย 28% เทียบกับ Baseline ตามมาตรฐาน IPMVP และข้อร้องเรียนด้านความสบายลดลง 70%',
    },
    client: { en: 'Confidential REIT', th: 'กองทรัสต์อสังหาริมทรัพย์' },
    location: { en: 'Sathorn, Bangkok', th: 'สาทร กรุงเทพฯ' },
    sector: 'commercial',
    capacityTr: 2400,
    savingsPct: 28,
    completion: 2025,
    energySavedKwh: 3800000,
    co2AvoidedTons: 1900,
    photos: photoSet('facility-commercial'),
    nextProjectId: 2,
  },
  {
    id: 2,
    thumbnail: p('assets/placeholders/facility-healthcare.svg'),
    banner: p('assets/placeholders/banner-soft.svg'),
    title: {
      en: 'Regional Hospital, Chonburi',
      th: 'โรงพยาบาลประจำภูมิภาค ชลบุรี',
    },
    excerpt: {
      en: '24/7 mission-critical cooling with 99.95% uptime — and 22% verified energy savings across the campus.',
      th: 'ความเย็นสำหรับภารกิจ 24/7 ด้วยความพร้อมใช้งาน 99.95% พร้อมผลประหยัดที่พิสูจน์แล้ว 22% ทั่วทั้งโรงพยาบาล',
    },
    details: {
      en: 'Operating theatres and ICUs cannot tolerate cooling interruptions. We deployed an N+1 plant configuration with predictive fault detection: anomalies are flagged by the CPMS hours before failure thresholds. The hospital redirected its capital budget to medical equipment while cutting its largest utility line item by 22%, independently verified each month.',
      th: 'ห้องผ่าตัดและ ICU ไม่อาจยอมรับการหยุดชะงักของระบบความเย็นได้ เราติดตั้งระบบแบบ N+1 พร้อมการตรวจจับความผิดปกติเชิงคาดการณ์ — CPMS แจ้งเตือนล่วงหน้าหลายชั่วโมงก่อนถึงจุดวิกฤติ โรงพยาบาลสามารถนำงบลงทุนไปใช้กับอุปกรณ์การแพทย์ พร้อมลดค่าไฟส่วนที่ใหญ่ที่สุดลง 22% โดยมีการตรวจสอบอิสระทุกเดือน',
    },
    client: { en: 'Leading Hospital Group', th: 'เครือโรงพยาบาลชั้นนำ' },
    location: { en: 'Chonburi', th: 'ชลบุรี' },
    sector: 'healthcare',
    capacityTr: 1800,
    savingsPct: 22,
    completion: 2024,
    energySavedKwh: 2600000,
    co2AvoidedTons: 1300,
    photos: photoSet('facility-healthcare'),
    nextProjectId: 3,
  },
  {
    id: 3,
    thumbnail: p('assets/placeholders/facility-hospitality.svg'),
    banner: p('assets/placeholders/banner-soft.svg'),
    title: {
      en: 'Luxury Beach Resort, Phuket',
      th: 'รีสอร์ทหรูริมหาด ภูเก็ต',
    },
    excerpt: {
      en: 'Guest comfort untouched, energy bill down 31% — the resort’s biggest sustainability win to date.',
      th: 'ความสบายของแขกคงเดิม แต่ค่าพลังงานลดลง 31% — ก้าวสำคัญด้านความยั่งยืนของรีสอร์ท',
    },
    details: {
      en: 'Tropical humidity, all-day occupancy swings and an oversized legacy plant made this resort a perfect CaaS candidate. Our ML models now anticipate check-in waves and ambient conditions, right-sizing chilled-water production hour by hour. The 31% verified saving funds the resort’s wider net-zero program, and the GM reports comfort scores at an all-time high.',
      th: 'ความชื้นเขตร้อน การเข้าพักที่ผันผวนตลอดวัน และระบบเดิมที่ใหญ่เกินจำเป็น ทำให้รีสอร์ทแห่งนี้เหมาะกับ CaaS อย่างยิ่ง โมเดล ML ของเราคาดการณ์ช่วงเช็คอินและสภาพอากาศ เพื่อผลิตน้ำเย็นให้พอดีทุกชั่วโมง ผลประหยัด 31% ที่พิสูจน์แล้วถูกนำไปสนับสนุนโครงการ Net-Zero ของรีสอร์ท พร้อมคะแนนความพึงพอใจของแขกที่สูงเป็นประวัติการณ์',
    },
    client: { en: 'International Hotel Brand', th: 'เครือโรงแรมระดับสากล' },
    location: { en: 'Phuket', th: 'ภูเก็ต' },
    sector: 'hospitality',
    capacityTr: 1200,
    savingsPct: 31,
    completion: 2025,
    energySavedKwh: 2100000,
    co2AvoidedTons: 1050,
    photos: photoSet('facility-hospitality'),
    nextProjectId: 4,
  },
  {
    id: 4,
    thumbnail: p('assets/placeholders/facility-industrial.svg'),
    banner: p('assets/placeholders/banner-soft.svg'),
    title: {
      en: 'Cold-Chain Distribution Hub, Bang Na',
      th: 'ศูนย์กระจายสินค้าควบคุมอุณหภูมิ บางนา',
    },
    excerpt: {
      en: 'Tighter temperature compliance and 18% energy savings across 40,000 m² of refrigerated logistics.',
      th: 'ควบคุมอุณหภูมิแม่นยำขึ้น พร้อมประหยัดพลังงาน 18% บนพื้นที่คลังเย็นกว่า 40,000 ตร.ม.',
    },
    details: {
      en: 'For cold-chain operators, every temperature excursion is lost inventory. Our CPMS holds zone setpoints within ±0.3°C while floating suction and condensing pressures with ambient conditions. The operator gained full HACCP-ready temperature audit trails and an 18% verified reduction in refrigeration energy.',
      th: 'สำหรับผู้ให้บริการคลังเย็น ทุกครั้งที่อุณหภูมิคลาดเคลื่อนคือสินค้าที่เสียหาย CPMS ของเราควบคุมอุณหภูมิแต่ละโซนภายใน ±0.3°C พร้อมปรับแรงดันระบบตามสภาพแวดล้อม ผู้ประกอบการได้บันทึกอุณหภูมิพร้อมตรวจสอบตามมาตรฐาน HACCP และลดพลังงานระบบทำความเย็นลง 18% ที่พิสูจน์ได้',
    },
    client: { en: 'Logistics Operator', th: 'ผู้ให้บริการโลจิสติกส์' },
    location: { en: 'Bang Na, Bangkok', th: 'บางนา กรุงเทพฯ' },
    sector: 'industrial',
    capacityTr: 950,
    savingsPct: 18,
    completion: 2023,
    energySavedKwh: 1500000,
    co2AvoidedTons: 750,
    photos: photoSet('facility-industrial'),
    nextProjectId: 5,
  },
  {
    id: 5,
    thumbnail: p('assets/placeholders/facility-retail.svg'),
    banner: p('assets/placeholders/banner-soft.svg'),
    title: {
      en: 'Premium Retail Mall, Ratchadaphisek',
      th: 'ศูนย์การค้าพรีเมียม รัชดาภิเษก',
    },
    excerpt: {
      en: 'A 3,200 TR plant retuned by machine learning — 24% savings while footfall grew 12% year on year.',
      th: 'ระบบ 3,200 ตันความเย็นที่ปรับจูนด้วย Machine Learning — ประหยัด 24% แม้จำนวนผู้ใช้บริการเพิ่มขึ้น 12%',
    },
    details: {
      en: 'Malls live and die by comfort, yet cooling is their single largest controllable cost. We retrofitted CPMS onto the existing plant — no chiller replacement required — and layered ML optimization across 86 AHUs. Savings reached 24% verified against the IPMVP baseline even as visitor numbers grew, proving optimization scales with demand.',
      th: 'ศูนย์การค้าอยู่ได้ด้วยความเย็นสบาย แต่ระบบทำความเย็นคือต้นทุนที่ควบคุมได้ก้อนใหญ่ที่สุด เราติดตั้ง CPMS บนระบบเดิมโดยไม่ต้องเปลี่ยนชิลเลอร์ พร้อมปรับจูน AHU 86 ตัวด้วย ML ผลประหยัดแตะ 24% ตาม Baseline มาตรฐาน IPMVP แม้จำนวนผู้เข้าใช้บริการจะเพิ่มขึ้น พิสูจน์ว่าการปรับจูนรองรับการเติบโตได้จริง',
    },
    client: { en: 'Retail Property Group', th: 'กลุ่มอสังหาริมทรัพย์ค้าปลีก' },
    location: { en: 'Ratchadaphisek, Bangkok', th: 'รัชดาภิเษก กรุงเทพฯ' },
    sector: 'retail',
    capacityTr: 3200,
    savingsPct: 24,
    completion: 2024,
    energySavedKwh: 4400000,
    co2AvoidedTons: 2200,
    photos: photoSet('facility-retail'),
    nextProjectId: 6,
  },
  {
    id: 6,
    thumbnail: p('assets/placeholders/facility-datacenter.svg'),
    banner: p('assets/placeholders/banner-soft.svg'),
    title: {
      en: 'Tier-III Data Center, Samut Prakan',
      th: 'ดาต้าเซ็นเตอร์ Tier-III สมุทรปราการ',
    },
    excerpt: {
      en: 'PUE improved from 1.78 to 1.52 with concurrent maintainability intact — 15% verified cooling savings.',
      th: 'ค่า PUE ดีขึ้นจาก 1.78 เป็น 1.52 โดยคงความสามารถบำรุงรักษาขณะใช้งาน — ประหยัดพลังงานความเย็น 15%',
    },
    details: {
      en: 'Mission-critical loads leave no room for experimentation, so our optimization rolled out in shadow mode first: the ML engine recommended setpoints that operators approved for weeks before automation was enabled. The result — PUE down 0.26, a 15% verified cooling energy reduction, and zero impact on the facility’s concurrent maintainability certification.',
      th: 'โหลดสำคัญยิ่งยวดไม่มีพื้นที่ให้ทดลอง การปรับจูนของเราจึงเริ่มแบบ Shadow Mode — ML แนะนำค่าการทำงานให้ผู้ดูแลอนุมัติเป็นเวลาหลายสัปดาห์ก่อนเปิดอัตโนมัติเต็มรูปแบบ ผลลัพธ์คือ PUE ลดลง 0.26 ประหยัดพลังงานความเย็น 15% โดยไม่กระทบการรับรอง Concurrent Maintainability ของศูนย์',
    },
    client: { en: 'Cloud Infrastructure Provider', th: 'ผู้ให้บริการโครงสร้างพื้นฐานคลาวด์' },
    location: { en: 'Samut Prakan', th: 'สมุทรปราการ' },
    sector: 'data-center',
    capacityTr: 1500,
    savingsPct: 15,
    completion: 2026,
    energySavedKwh: 2900000,
    co2AvoidedTons: 1450,
    photos: photoSet('facility-datacenter'),
    nextProjectId: 1,
  },
];

export default projects;
