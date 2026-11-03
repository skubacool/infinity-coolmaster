import { Locale } from '../models/_commons/localized';
import { PageKey } from '../config/routes';
import { PageBody } from './types';
import pagesEn from './pages.en';
import pagesTh from './pages.th';

export const pageBody = (locale: Locale, key: PageKey): PageBody | null =>
  (locale === 'th' ? pagesTh : pagesEn)[key] ?? null;
