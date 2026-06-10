import { Locale, LocalizedKeyText } from '../models/_commons/localized';

export const l = (
  locale: Locale,
  localizations: LocalizedKeyText[],
  key: string
): string => {
  const localization = localizations.find((l) => l.key === key);
  if (!localization) return '';
  return localization.text[locale];
};
