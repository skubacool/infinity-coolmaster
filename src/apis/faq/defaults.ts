import { Faq } from '../../models/faq';

/** The questions CFOs and facility directors ask most; override via cms_content 'faqs'. */
const faqs: Faq[] = [
  {
    id: 1,
    seq: 1,
    question: { en: 'Who owns the equipment?', th: 'ใครเป็นเจ้าของอุปกรณ์?' },
    answer: {
      en: 'Infinity CoolMaster owns, insures and maintains the plant for the full contract term — it never sits on your balance sheet. At the end of the contract you can renew, or take ownership under agreed transfer terms.',
      th: 'Infinity CoolMaster เป็นเจ้าของ ทำประกัน และบำรุงรักษาระบบตลอดอายุสัญญา — ไม่อยู่ในงบดุลของคุณ เมื่อครบสัญญาสามารถต่ออายุ หรือรับโอนกรรมสิทธิ์ตามเงื่อนไขที่ตกลงกัน',
    },
  },
  {
    id: 2,
    seq: 2,
    question: {
      en: 'What happens if savings fall below the guarantee?',
      th: 'ถ้าผลประหยัดต่ำกว่าการันตีจะเกิดอะไรขึ้น?',
    },
    answer: {
      en: 'We compensate the shortfall. The minimum saving is written into the contract and measured against an independently verifiable baseline — it is a commercial commitment, not a marketing claim.',
      th: 'เราชดเชยส่วนต่างให้ ผลประหยัดขั้นต่ำระบุไว้ในสัญญาและตรวจวัดเทียบกับ Baseline ที่ตรวจสอบโดยอิสระได้ — เป็นข้อผูกพันทางการค้า ไม่ใช่คำโฆษณา',
    },
  },
  {
    id: 3,
    seq: 3,
    question: {
      en: 'How are the savings actually measured?',
      th: 'วัดผลประหยัดอย่างไร?',
    },
    answer: {
      en: 'Before any work begins we agree a baseline model with you, built from at least 12 months of interval data and aligned with the international IPMVP protocol. Every month, actual consumption is compared against the adjusted baseline and reported — auditable by you or a third party.',
      th: 'ก่อนเริ่มงาน เราตกลงโมเดล Baseline ร่วมกัน สร้างจากข้อมูลย้อนหลังอย่างน้อย 12 เดือน ตามมาตรฐานสากล IPMVP ทุกเดือนจะเทียบการใช้พลังงานจริงกับ Baseline และออกรายงาน — ตรวจสอบได้โดยคุณหรือผู้ตรวจสอบอิสระ',
    },
  },
  {
    id: 4,
    seq: 4,
    question: {
      en: 'Do we need to invest anything?',
      th: 'เราต้องลงทุนอะไรบ้าง?',
    },
    answer: {
      en: 'No. Design, equipment, installation, and lifetime operation are all financed by us. You pay from the savings the system creates — your cash flow is positive from day one.',
      th: 'ไม่ต้องลงทุน ค่าออกแบบ อุปกรณ์ การติดตั้ง และการดูแลตลอดอายุสัญญา เราเป็นผู้ลงทุนทั้งหมด คุณจ่ายจากผลประหยัดที่ระบบสร้างขึ้น — กระแสเงินสดเป็นบวกตั้งแต่วันแรก',
    },
  },
  {
    id: 5,
    seq: 5,
    question: { en: 'How long is the contract?', th: 'สัญญานานแค่ไหน?' },
    answer: {
      en: 'Typically 5–10 years, depending on plant size and scope. Longer terms let us invest in deeper upgrades and guarantee larger savings.',
      th: 'โดยทั่วไป 5–10 ปี ขึ้นอยู่กับขนาดระบบและขอบเขตงาน สัญญาที่ยาวขึ้นทำให้เราลงทุนปรับปรุงได้ลึกขึ้นและการันตีผลประหยัดที่สูงขึ้นได้',
    },
  },
  {
    id: 6,
    seq: 6,
    question: {
      en: 'Will installation disrupt our operations?',
      th: 'การติดตั้งกระทบการทำงานหรือไม่?',
    },
    answer: {
      en: 'No. Work is planned around your operating schedule, system switchovers happen off-hours, and redundancy is maintained throughout the transition — cooling never stops.',
      th: 'ไม่กระทบ งานติดตั้งวางแผนตามตารางการทำงานของคุณ การสลับระบบทำนอกเวลาทำการ และมีระบบสำรองตลอดช่วงเปลี่ยนผ่าน — ความเย็นไม่มีสะดุด',
    },
  },
];

export default faqs;
