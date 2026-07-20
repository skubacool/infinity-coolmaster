import { LocalizedText } from '../_commons/localized';

/** A frequently-asked question shown on the home page. */
export interface Faq {
  id: number;
  seq: number;
  question: LocalizedText;
  answer: LocalizedText;
}
