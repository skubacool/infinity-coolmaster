import { LocalizedKeyText } from '../../models/_commons/localized';

/**
 * Default localization catalog (EN/TH). Overridable per-key via the
 * `cms_content` table, collection = 'localizations'.
 */
const localizations: LocalizedKeyText[] = [
  // ---------- General ----------
  {
    key: 'general.explore',
    text: { th: 'เลื่อนลงเพื่อดูเพิ่มเติม', en: 'Explore' },
  },
  {
    key: 'general.slide-more',
    text: { th: 'เลื่อนลงเพื่อดูเพิ่มเติม', en: 'Scroll down for more' },
  },
  {
    key: 'general.active-sites',
    text: { th: 'โครงการที่เปิดดำเนินการ', en: 'Facilities Optimized' },
  },
  {
    key: 'general.total-capacities',
    text: { th: 'ตันความเย็นที่ดูแลทั้งหมด', en: 'TR Under Management' },
  },
  {
    key: 'general.tr',
    text: { th: 'ตันความเย็น', en: 'TR' },
  },
  {
    key: 'general.gwh-saved',
    text: { th: 'กิกะวัตต์-ชั่วโมงที่ประหยัดได้ต่อปี', en: 'GWh Saved Annually' },
  },
  {
    key: 'general.avg-savings',
    text: { th: 'อัตราประหยัดพลังงานเฉลี่ย', en: 'Average Verified Savings' },
  },
  {
    key: 'general.copyrights',
    text: {
      th: '© Infinity CoolMaster Co., Ltd. สงวนลิขสิทธิ์',
      en: '© Infinity CoolMaster Co., Ltd. All rights reserved.',
    },
  },
  {
    key: 'general.read-more',
    text: { th: 'อ่านต่อ', en: 'Read More' },
  },
  {
    key: 'general.see-more',
    text: { th: 'ดูเพิ่มเติม', en: 'See more' },
  },
  {
    key: 'general.photos',
    text: { th: 'รูปภาพ', en: 'photos' },
  },
  {
    key: 'general.kwh',
    text: { th: 'กิโลวัตต์-ชั่วโมง/ปี', en: 'kWh / year' },
  },
  {
    key: 'general.tons-co2',
    text: { th: 'ตัน CO₂ / ปี', en: 'tons CO₂ / year' },
  },

  // ---------- Menu ----------
  { key: 'menu.home', text: { th: 'หน้าแรก', en: 'Home' } },
  { key: 'menu.about', text: { th: 'เกี่ยวกับเรา', en: 'About' } },
  { key: 'menu.projects', text: { th: 'ผลงานของเรา', en: 'Case Studies' } },
  { key: 'menu.activities', text: { th: 'บทความ', en: 'Insights' } },
  {
    key: 'menu.contact',
    text: { th: 'ขอรับการประเมินฟรี', en: 'Request a Free Audit' },
  },

  // ---------- Front: hero ----------
  {
    key: 'front.kicker',
    text: {
      th: 'COOLING-AS-A-SERVICE (CaaS)',
      en: 'COOLING-AS-A-SERVICE (CaaS)',
    },
  },
  {
    key: 'front.cta',
    text: {
      th: 'ประหยัดพลังงานแบบมีการันตี\nไม่ต้องลงทุน ขับเคลื่อนด้วย AI',
      en: 'Guaranteed energy savings.\nZero CapEx. AI-optimized.',
    },
  },
  {
    key: 'front.excerpt-cta',
    text: {
      th: 'เราออกแบบ ลงทุน ติดตั้ง และดูแลระบบทำความเย็นประสิทธิภาพสูงให้คุณภายใต้สัญญาเดียว — คุณจ่ายเฉพาะความเย็นที่ใช้ และประหยัดมากขึ้นทุกวัน',
      en: 'We design, finance, install and operate high-efficiency cooling systems under one performance contract — so you save more, every day.',
    },
  },
  {
    key: 'front.cta-primary',
    text: { th: 'ขอรับการประเมินฟรี', en: 'Request a Free Cooling Audit' },
  },
  {
    key: 'front.cta-secondary',
    text: { th: 'ดูผลงานของเรา', en: 'Explore Case Studies' },
  },

  // ---------- Front: benefits ----------
  {
    key: 'front.title-benefits',
    text: {
      th: '{{total-benefits}} เหตุผลที่องค์กรชั้นนำเลือก\nInfinity CoolMaster',
      en: '{{total-benefits}} reasons leading enterprises choose\nInfinity CoolMaster',
    },
  },

  // ---------- Front: services ----------
  {
    key: 'front.title-business',
    text: { th: 'บริการของเรา', en: 'What We Deliver' },
  },
  {
    key: 'front.excerpt-business',
    text: {
      th: 'แพลตฟอร์มบริหารจัดการระบบทำความเย็นครบวงจร ตั้งแต่การควบคุมอัจฉริยะไปจนถึงการพิสูจน์ผลประหยัดตามมาตรฐานสากล',
      en: 'A complete cooling performance platform — from intelligent plant control to internationally verified savings.',
    },
  },

  // ---------- Front: sectors ----------
  {
    key: 'front.title-sectors',
    text: { th: 'กลุ่มอุตสาหกรรมที่เราดูแล', en: 'Sectors We Serve' },
  },
  {
    key: 'front.excerpt-sectors',
    text: {
      th: 'โซลูชันความเย็นที่ออกแบบเฉพาะสำหรับทุกประเภทอาคารและโรงงาน',
      en: 'Purpose-built cooling solutions for every facility type and load profile.',
    },
  },

  // ---------- Front: projects ----------
  {
    key: 'front.title-projects',
    text: { th: 'ผลงานล่าสุด', en: 'Recent Deployments' },
  },
  {
    key: 'front.all-projects',
    text: { th: 'ดูผลงานทั้งหมด', en: 'All Case Studies' },
  },

  // ---------- Front: impact ----------
  {
    key: 'front.title-impact',
    text: { th: 'ผลลัพธ์ที่พิสูจน์ได้', en: 'Verified Impact' },
  },
  {
    key: 'front.cta-impact',
    text: {
      th: 'ประหยัดจริง วัดผลได้จริง\nทุกกิโลวัตต์-ชั่วโมง',
      en: 'Real savings,\nmeasured to the kilowatt-hour.',
    },
  },
  {
    key: 'front.excerpt-impact',
    text: {
      th: 'ลูกค้าของเรา {{total-projects}} แห่งทั่วประเทศ ไว้วางใจให้เราดูแลระบบทำความเย็นรวม {{total-capabilities}} ตันความเย็น พร้อมรายงานผลประหยัดตามมาตรฐาน IPMVP ทุกเดือน',
      en: 'Across {{total-projects}} facilities nationwide, we operate {{total-capabilities}} TR of cooling capacity — with IPMVP-aligned savings reports delivered every month.',
    },
  },
  {
    key: 'front.more-to-come',
    text: {
      th: 'และเรากำลังขยายผลความประหยัดนี้สู่อาคารของคุณ',
      en: 'And we are just getting started.',
    },
  },

  // ---------- Front: activities ----------
  {
    key: 'front.title-activities',
    text: { th: 'บทความและข่าวสาร', en: 'Insights & News' },
  },

  // ---------- Front: contact / lead form ----------
  {
    key: 'front.title-contact',
    text: { th: 'เริ่มต้นกับเรา', en: 'Start Saving' },
  },
  {
    key: 'front.cta-contact',
    text: {
      th: 'ขอรับการประเมินศักยภาพการประหยัดพลังงานฟรี\nทีมวิศวกรของเราจะวิเคราะห์ระบบทำความเย็นของคุณ และเสนอแนวทางประหยัดแบบมีการันตี โดยไม่มีค่าใช้จ่ายและไม่มีข้อผูกมัด',
      en: 'Request a free cooling audit.\nOur engineers will analyze your plant and quantify your guaranteed savings potential — no cost, no obligation.',
    },
  },

  // ---------- Lead form ----------
  {
    key: 'form.title',
    text: { th: 'ขอรับการประเมินฟรี', en: 'Request Your Free Audit' },
  },
  {
    key: 'form.company',
    text: { th: 'ชื่อบริษัท', en: 'Company name' },
  },
  {
    key: 'form.contact-person',
    text: { th: 'ชื่อผู้ติดต่อ', en: 'Contact person' },
  },
  { key: 'form.email', text: { th: 'อีเมล', en: 'Work email' } },
  { key: 'form.phone', text: { th: 'เบอร์โทรศัพท์', en: 'Phone' } },
  {
    key: 'form.current-bill',
    text: {
      th: 'ค่าไฟฟ้าต่อเดือนโดยประมาณ',
      en: 'Approx. monthly electricity bill',
    },
  },
  { key: 'form.industry', text: { th: 'กลุ่มอุตสาหกรรม', en: 'Industry' } },
  {
    key: 'form.select-placeholder',
    text: { th: '— โปรดเลือก —', en: '— Please select —' },
  },
  { key: 'form.submit', text: { th: 'ส่งคำขอ', en: 'Submit Request' } },
  { key: 'form.submitting', text: { th: 'กำลังส่ง…', en: 'Submitting…' } },
  {
    key: 'form.success-title',
    text: { th: 'ได้รับคำขอของคุณแล้ว', en: 'Request received' },
  },
  {
    key: 'form.success-message',
    text: {
      th: 'ขอบคุณที่สนใจ Infinity CoolMaster ทีมงานของเราจะติดต่อกลับภายใน 1 วันทำการ',
      en: 'Thank you for your interest in Infinity CoolMaster. Our team will get back to you within one business day.',
    },
  },
  {
    key: 'form.error-message',
    text: {
      th: 'ไม่สามารถส่งคำขอได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง หรือติดต่อเราทางอีเมล',
      en: 'We could not submit your request right now. Please try again, or reach us directly by email.',
    },
  },
  {
    key: 'form.required',
    text: {
      th: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน',
      en: 'Please complete all required fields.',
    },
  },
  {
    key: 'form.privacy-note',
    text: {
      th: 'ข้อมูลของคุณจะถูกใช้เพื่อการติดต่อกลับเท่านั้น',
      en: 'Your information is used solely to respond to your request.',
    },
  },

  // ---------- Contact details ----------
  {
    key: 'contact.address',
    text: {
      th: '128 อาคารพญาไทพลาซ่า ชั้น 23 ถนนพญาไท แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพมหานคร 10400',
      en: '128 Phayathai Plaza, 23rd Floor, Phayathai Road, Ratchathewi, Bangkok 10400, Thailand',
    },
  },
  { key: 'contact.tel', text: { th: '02-026-3344', en: '+66 (0)2 026 3344' } },
  {
    key: 'contact.email',
    text: {
      th: 'sales@infinitycoolmaster.com',
      en: 'sales@infinitycoolmaster.com',
    },
  },
  {
    key: 'contact.map-link',
    text: { th: 'เปิดใน Google Maps', en: 'Open in Google Maps' },
  },

  // ---------- Partners ----------
  {
    key: 'partners.title-vendors',
    text: {
      th: 'พันธมิตรด้านเทคโนโลยีที่ได้รับความไว้วางใจ',
      en: 'Trusted Technology Partners',
    },
  },
  {
    key: 'partners.title-clients',
    text: {
      th: 'องค์กรชั้นนำที่ไว้วางใจเรา',
      en: 'Enterprises That Trust Us',
    },
  },

  // ---------- Project (case study) ----------
  {
    key: 'project-box.client',
    text: { th: 'ลูกค้า', en: 'Client' },
  },
  {
    key: 'project-box.location',
    text: { th: 'สถานที่', en: 'Location' },
  },
  {
    key: 'project-box.capacity',
    text: { th: 'ขนาดระบบ', en: 'Plant Size' },
  },
  {
    key: 'project-box.savings',
    text: { th: 'ผลประหยัด', en: 'Verified Savings' },
  },
  {
    key: 'project-box.completion',
    text: { th: 'ปีที่เริ่มดำเนินการ', en: 'In Service' },
  },
  {
    key: 'project.title-project',
    text: { th: 'กรณีศึกษา', en: 'Case Study' },
  },
  {
    key: 'project.next-project',
    text: { th: 'กรณีศึกษาถัดไป', en: 'Next Case Study' },
  },
  {
    key: 'project.title-energy-savings',
    text: {
      th: 'พลังงานที่ประหยัดได้\n(ตรวจวัดตามมาตรฐาน IPMVP)',
      en: 'Energy saved annually\n(IPMVP-verified)',
    },
  },
  {
    key: 'project.title-co2-avoided',
    text: {
      th: 'คาร์บอนที่ลดได้ต่อปี',
      en: 'CO₂ emissions avoided per year',
    },
  },

  // ---------- Project list ----------
  {
    key: 'project-list.title-projects',
    text: { th: 'ผลงานของเรา', en: 'Case Studies' },
  },
  {
    key: 'project-list.sm:title-projects',
    text: { th: 'ผลงาน\nของเรา', en: 'Case\nStudies' },
  },
  {
    key: 'project-list.excerpt-projects',
    text: {
      th: 'ทุกโครงการมาพร้อมผลประหยัดที่ตรวจวัดและพิสูจน์ได้ตามมาตรฐาน IPMVP',
      en: 'Every deployment ships with IPMVP-verified savings — measured, reported, and guaranteed.',
    },
  },
  {
    key: 'project-list.no-of-sites',
    text: { th: 'โครงการทั้งหมด', en: 'Facilities' },
  },
  {
    key: 'project-list.total-capacities',
    text: { th: 'กำลังความเย็นรวม', en: 'Total Capacity' },
  },

  // ---------- Activity (insights) ----------
  {
    key: 'activity-list.subtitle-activities',
    text: { th: 'มุมมองจากผู้เชี่ยวชาญ', en: 'From Our Experts' },
  },
  {
    key: 'activity-list.title-activities',
    text: { th: 'บทความและข่าวสาร', en: 'Insights & News' },
  },
  {
    key: 'activity-list.excerpt-activities',
    text: {
      th: 'แนวคิด เทคนิค และข่าวสารล่าสุดเกี่ยวกับ Cooling-as-a-Service และการเพิ่มประสิทธิภาพระบบทำความเย็นด้วย AI',
      en: 'Thinking, techniques and news on Cooling-as-a-Service and AI-driven HVAC optimization.',
    },
  },
  {
    key: 'activity.next-activity',
    text: { th: 'บทความถัดไป', en: 'Next Article' },
  },
  {
    key: 'activity.other-activities',
    text: { th: 'บทความอื่น ๆ', en: 'More Insights' },
  },

  // ---------- About ----------
  {
    key: 'about.title-company',
    text: { th: 'Infinity CoolMaster', en: 'Infinity CoolMaster' },
  },
  {
    key: 'about.sm:title-company',
    text: { th: 'Infinity\nCoolMaster', en: 'Infinity\nCoolMaster' },
  },
  {
    key: 'about.excerpt-company',
    text: {
      th: 'ผู้ให้บริการ Cooling-as-a-Service ที่ผสานวิศวกรรมระบบทำความเย็นเข้ากับปัญญาประดิษฐ์',
      en: 'The Cooling-as-a-Service company where chiller-plant engineering meets artificial intelligence.',
    },
  },
  {
    key: 'about.story',
    text: {
      th: 'Infinity CoolMaster ก่อตั้งขึ้นด้วยความเชื่อว่าองค์กรไม่ควรต้องแบกรับภาระการลงทุนและความเสี่ยงในการดูแลระบบทำความเย็นด้วยตนเอง เราจึงให้บริการในรูปแบบ Cooling-as-a-Service อย่างครบวงจร — ออกแบบ ลงทุน ติดตั้ง และดูแลระบบตลอดอายุสัญญา พร้อมการันตีผลประหยัดขั้นต่ำ 10% ในทุกสัญญา\n\nหัวใจของบริการคือแพลตฟอร์ม Chiller Plant Management System (CPMS) ที่ใช้ Machine Learning ปรับจูนการทำงานของชิลเลอร์ ปั๊ม และหอผึ่งเย็นแบบเรียลไทม์ ควบคู่กับศูนย์เฝ้าระวัง 24/7 และการตรวจวัดพิสูจน์ผลตามมาตรฐาน IPMVP ทำให้ทุกบาทที่ประหยัดได้โปร่งใสและตรวจสอบได้',
      en: 'Infinity CoolMaster was founded on a simple conviction: enterprises should not have to tie up capital — or carry operational risk — to get world-class cooling. We deliver Cooling-as-a-Service end to end: we design, finance, install and operate your chilled-water plant for the life of the contract, with a minimum 10% energy saving guaranteed in writing.\n\nAt the core is our Chiller Plant Management System (CPMS), where machine-learning models tune chillers, pumps and cooling towers in real time. Combined with a 24/7 monitoring center and IPMVP-aligned measurement & verification, every kilowatt-hour we save you is transparent and auditable.',
    },
  },
  {
    key: 'about.story-highlight',
    text: {
      th: 'การันตีผลประหยัดขั้นต่ำ 10% ในทุกสัญญา',
      en: 'a minimum 10% energy saving guaranteed in writing',
    },
  },
  {
    key: 'about.caption-established',
    text: { th: 'ก่อตั้งเมื่อ', en: 'Established' },
  },
  {
    key: 'about.text-established',
    text: { th: 'พ.ศ. 2561', en: '2018' },
  },
  {
    key: 'about.caption-capital',
    text: { th: 'ทุนจดทะเบียน', en: 'Registered Capital' },
  },
  {
    key: 'about.text-capital',
    text: { th: '100 ล้านบาท', en: 'THB 100,000,000' },
  },
  {
    key: 'about.caption-headquarter',
    text: { th: 'สำนักงานใหญ่', en: 'Headquarters' },
  },
  {
    key: 'about.text-headquarter',
    text: { th: 'กรุงเทพมหานคร ประเทศไทย', en: 'Bangkok, Thailand' },
  },
  {
    key: 'about.title-impact',
    text: { th: 'ตัวเลขที่เราภูมิใจ', en: 'Performance at a Glance' },
  },
  {
    key: 'about.qty-success-rate',
    text: { th: '10–35%', en: '10–35%' },
  },
  {
    key: 'about.title-success-rate',
    text: { th: 'ผลประหยัดที่ส่งมอบ', en: 'Savings Delivered' },
  },
  {
    key: 'about.excerpt-success-rate',
    text: {
      th: 'ช่วงผลประหยัดพลังงานที่ตรวจวัดได้จริงในทุกโครงการ — สูงกว่าการันตีขั้นต่ำเสมอ',
      en: 'The verified savings range across our portfolio — consistently above the contractual minimum.',
    },
  },
  {
    key: 'about.qty-experience',
    text: { th: '120+ ปี', en: '120+ yrs' },
  },
  {
    key: 'about.title-experience',
    text: { th: 'ประสบการณ์วิศวกรรมรวม', en: 'Combined Engineering Experience' },
  },
  {
    key: 'about.excerpt-experience',
    text: {
      th: 'ทีมวิศวกรเครื่องกล ไฟฟ้า และ Data Science ที่เชี่ยวชาญระบบทำความเย็นขนาดใหญ่',
      en: 'Mechanical, electrical and data-science engineers specialized in large chilled-water plants.',
    },
  },
  {
    key: 'about.qty-output',
    text: { th: '99.9%', en: '99.9%' },
  },
  {
    key: 'about.title-output',
    text: { th: 'ความพร้อมของระบบ', en: 'Plant Uptime' },
  },
  {
    key: 'about.excerpt-output',
    text: {
      th: 'ความพร้อมใช้งานเฉลี่ยของระบบภายใต้การดูแล ด้วยการเฝ้าระวังและคาดการณ์ความผิดปกติล่วงหน้า',
      en: 'Average availability across managed plants, protected by 24/7 monitoring and predictive fault detection.',
    },
  },
];

export default localizations;
