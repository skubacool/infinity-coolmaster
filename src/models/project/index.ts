import { LocalizedText } from '../_commons/localized';

/** A CaaS deployment / client success case study. */
export interface Project {
  id: number;
  thumbnail: string;
  banner: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  details: LocalizedText;
  client: LocalizedText;
  location: LocalizedText;
  /** Sector key, e.g. 'commercial' | 'healthcare' | 'data-center'. */
  sector: string;
  /** Installed chilled-water plant size in tons of refrigeration (TR). */
  capacityTr: number;
  /** Verified annual energy savings in percent. */
  savingsPct: number;
  /** Year the plant entered commercial operation under the CaaS contract. */
  completion: number;
  /** Annual energy saved (kWh, IPMVP-verified). Null until first M&V cycle. */
  energySavedKwh: number | null;
  /** Annual CO2 emissions avoided (tons). Null until first M&V cycle. */
  co2AvoidedTons: number | null;
  photos: string[];
  nextProjectId: number | null;
}
