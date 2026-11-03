import { SITE_ORIGIN } from '../config/routes';

/**
 * Company facts used in structured data (JSON-LD). Only verified facts belong
 * here: leave a field null until it is confirmed and it is simply omitted.
 */
export const ORGANIZATION = {
  name: 'Infinity CoolMaster',
  /** TODO: registered company name exactly as on the DBD certificate. */
  legalName: null as string | null,
  /** TODO: year the company was founded. */
  foundingDate: null as string | null,
  url: `${SITE_ORIGIN}/`,
  logo: `${SITE_ORIGIN}/assets/brand/logo-official.png`,
  telephone: '+66 2 026 3344',
  email: 'sales@infinitycoolmaster.com',
  address: {
    streetAddress: '128 Phayathai Plaza, 23rd Floor, Phayathai Road',
    addressLocality: 'Ratchathewi',
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
