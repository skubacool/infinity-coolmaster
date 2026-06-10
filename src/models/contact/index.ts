import { LocalizedText } from '../_commons/localized';

export interface Contact {
  id: number;
  type: string; // address | tel | email | maps | linkedin | facebook | line
  /** Icon key resolved by the shared <Icon /> component. */
  icon: string;
  text: LocalizedText;
  url: string | null;
}
