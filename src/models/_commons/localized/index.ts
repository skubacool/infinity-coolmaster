export type Locale = 'th' | 'en';

export type LocalizedText = {
  [key in Locale]: string;
};

export interface LocalizedKeyText {
  key: string;
  text: LocalizedText;
}
