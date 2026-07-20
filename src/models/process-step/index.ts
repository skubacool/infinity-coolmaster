import { LocalizedText } from '../_commons/localized';

/** One step of the CaaS engagement journey ("How It Works"). */
export interface ProcessStep {
  id: number;
  seq: number;
  /** Icon key resolved by the shared <Icon /> component. */
  icon: string;
  title: LocalizedText;
  excerpt: LocalizedText;
}
