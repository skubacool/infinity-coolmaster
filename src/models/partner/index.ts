import { LocalizedText } from '../_commons/localized';

export interface Partner {
  id: number;
  logo: string;
  name: LocalizedText;
  type: string; // vendor | client
  seq: number;
}
