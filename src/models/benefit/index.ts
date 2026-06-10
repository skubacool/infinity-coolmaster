import { LocalizedText } from '../_commons/localized';

/** A pillar of the CaaS value proposition (Zero CapEx, Guaranteed Savings, ...). */
export interface Benefit {
  id: number;
  seq: number;
  /** Icon key resolved by the shared <Icon /> component. */
  icon: string;
  title: LocalizedText;
  excerpt: LocalizedText;
}
