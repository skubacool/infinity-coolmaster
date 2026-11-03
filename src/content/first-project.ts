import { Locale } from '../models/_commons/localized';

/**
 * The company's first Cooling-as-a-Service project.
 *
 * The client is NOT named anywhere on the site until `clientConsent` is set to
 * true, which should happen only once the client has signed the publicity
 * consent. Until then the site describes them generically.
 */
export const FIRST_PROJECT = {
  clientName: { en: 'Platinum Pro Plastic', th: 'Platinum Pro Plastic' },
  /** What the client does, from their own website (platinumproplastic.com). */
  clientDescription: {
    en: 'a Thai plastic injection-moulding manufacturer of pallets, crates, bins and OEM parts',
    th: 'ผู้ผลิตชิ้นงานพลาสติกด้วยการฉีดขึ้นรูปของไทย ทั้งพาเลท ลังพลาสติก ถังขยะ และงาน OEM',
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
