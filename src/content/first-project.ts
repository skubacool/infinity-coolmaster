import { Locale } from '../models/_commons/localized';

/**
 * The company's first Cooling-as-a-Service project.
 *
 * The client is NOT named anywhere on the site until `clientConsent` is set to
 * true, which should happen only once the client has signed the publicity
 * consent. Until then the site describes them generically.
 */
export const FIRST_PROJECT = {
  clientName: { en: 'Platinum Pro Plastic', th: 'แพลตตินั่ม โปร พลาสติก' },
  /** What the client does, from their own website (platinumproplastic.com). */
  clientDescription: {
    en: 'a Thai plastic injection-moulding manufacturer of pallets, crates, bins and OEM/ODM parts, with its factory in Rayong',
    th: 'ผู้ผลิตชิ้นงานพลาสติกฉีดขึ้นรูปของไทย ทั้งพาเลท ลังพลาสติก ถังขยะ และงาน OEM/ODM มีโรงงานที่จังหวัดระยอง',
  },
  /** Facts from the client's own About page (platinumproplastic.com, Nov 2026). */
  clientFacts: {
    en: 'According to its website, Platinum Pro Plastic Co., Ltd. runs more than 100 injection-moulding machines from 75 to 3,150 tonnes, with a production capacity of over 28,000 tonnes a year, at its factory in Nikhom Phatthana, Rayong. It is certified to ISO 9001:2015 and ISO 14001:2015, and supplies plastic pallets, crates, bins and custom-made parts to industries including food and beverage, paper, electronics, electrical equipment, chemicals and pharmaceuticals.',
    th: 'ตามข้อมูลบนเว็บไซต์ของบริษัท บริษัท แพลตตินั่ม โปร พลาสติก จำกัด มีเครื่องฉีดพลาสติกขนาด 75–3,150 ตัน มากกว่า 100 เครื่อง กำลังการผลิตกว่า 28,000 ตันต่อปี ที่โรงงานในอำเภอนิคมพัฒนา จังหวัดระยอง ได้รับการรับรองมาตรฐาน ISO 9001:2015 และ ISO 14001:2015 และผลิตพาเลทพลาสติก ลังพลาสติก ถังขยะ และงานรับจ้างผลิตตามแบบ ให้อุตสาหกรรมต่าง ๆ เช่น อาหารและเครื่องดื่ม กระดาษ อิเล็กทรอนิกส์ อุปกรณ์ไฟฟ้า เคมีภัณฑ์ และยา',
  },
  clientUrl: 'https://platinumproplastic.com/th/',
  /** Set to true once the client has agreed in writing to be named. */
  clientConsent: true,
  genericName: {
    en: 'a plastics manufacturer in Thailand',
    th: 'ผู้ผลิตชิ้นงานพลาสติกในประเทศไทย',
  },
  status: { en: 'testing and commissioning', th: 'ทดสอบและเดินระบบ' },
  month: { en: 'November 2026', th: 'พฤศจิกายน 2569' },
};

/** How the client is referred to in running text, per the consent switch. */
export const firstProjectClient = (locale: Locale): string =>
  FIRST_PROJECT.clientConsent
    ? FIRST_PROJECT.clientName[locale]
    : FIRST_PROJECT.genericName[locale];
