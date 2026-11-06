import { Locale } from '../models/_commons/localized';
import { PageKey } from '../config/routes';
import { PageBody } from './types';

/**
 * Long-form copy of a standalone page, loaded on demand (one chunk per
 * language) so it stays out of the JavaScript every page downloads.
 */
export const loadPageBody = async (
  locale: Locale,
  key: PageKey
): Promise<PageBody | null> => {
  const pages =
    locale === 'th'
      ? (await import('./pages.th')).default
      : (await import('./pages.en')).default;
  return pages[key] ?? null;
};
