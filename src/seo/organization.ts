import { SITE_ORIGIN } from '../config/routes';

/**
 * Company facts used in structured data (JSON-LD). Only verified facts belong
 * here: leave a field null until it is confirmed and it is simply omitted.
 */
export const ORGANIZATION = {
  name: 'Infinity CoolMaster',
  /** DBD: บริษัท อินฟินิตี คูลมาสเตอร์ จำกัด. */
  legalName: 'Infinity CoolMaster Co., Ltd.' as string | null,
  legalNameTh: 'บริษัท อินฟินิตี คูลมาสเตอร์ จำกัด',
  /** DBD juristic person registration number (also the tax ID). */
  registrationNumber: '0105566016285',
  /** DBD registration date: 24 January 2023 (24/01/2566). */
  foundingDate: '2023-01-24' as string | null,
  url: `${SITE_ORIGIN}/`,
  logo: `${SITE_ORIGIN}/assets/brand/logo-official.png`,
  telephone: '+66 2 026 3344',
  email: 'sales@infinitycoolmaster.com',
  address: {
    streetAddress: '157/9 Soi Ari Samphan 2, Phahonyothin Road',
    addressLocality: 'Phaya Thai',
    addressRegion: 'Bangkok',
    postalCode: '10400',
    addressCountry: 'TH',
  },
  /** TODO: latitude/longitude of the office, e.g. { latitude: 13.0, longitude: 100.0 }. */
  geo: null as { latitude: number; longitude: number } | null,
  /** TODO: opening hours, e.g. ['Mo-Fr 08:30-17:30']. */
  openingHours: null as string[] | null,
  /** Fallback social profiles; the CMS contact list overrides these. */
  sameAs: [
    'https://www.linkedin.com/company/infinity-coolmaster',
    'https://www.facebook.com/infinitycoolmaster',
  ],
};

/** 1200×630 image used when a page has no photo of its own. */
export const DEFAULT_SHARE_IMAGE = `${SITE_ORIGIN}/assets/brand/og-image.png`;
