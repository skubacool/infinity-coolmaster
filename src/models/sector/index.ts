import { LocalizedText } from '../_commons/localized';

/** A target market sector served by the CaaS offering. */
export interface Sector {
  id: number;
  seq: number;
  /** Stable key, e.g. 'commercial' | 'industrial' | 'healthcare' | 'hospitality' | 'retail' | 'data-center'. */
  key: string;
  /** Icon key resolved by the shared <Icon /> component. */
  icon: string;
  title: LocalizedText;
  excerpt: LocalizedText;
}
