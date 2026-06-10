import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import 'dayjs/locale/th';

import { Locale } from '../models/_commons/localized';

dayjs.extend(buddhistEra);

export const localizedDate = (
  locale: Locale,
  dateText: string | undefined
): string => {
  const date = dayjs(dateText);
  return locale === 'th'
    ? date.locale('th').format('D MMM BBBB')
    : date.format('D MMM YYYY');
};
