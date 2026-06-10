import { LocalizedText } from '../_commons/localized';

/** A service pillar shown in the services carousel (CPMS, ML optimization, ...). */
export interface HeroBanner {
  id: number;
  title: LocalizedText;
  subtitle: LocalizedText;
  excerpt: LocalizedText;
  /** Icon key resolved by the shared <Icon /> component. */
  icon: string;
  /** Optional artwork URL; bright gradient is used when empty. */
  banner: string;
}
