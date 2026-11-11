import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Locale } from '../../../models/_commons/localized';
import { paths } from '../../../config/routes';

/** localStorage key; index.html reads the same key before loading analytics. */
const KEY = 'icm-consent';
/** Window event that reopens the notice (footer "Cookie settings"). */
export const OPEN_EVENT = 'icm:cookie-settings';

const TEXT = {
  en: {
    label: 'Cookie notice',
    text: 'We use analytics cookies to see which pages are useful. The site works without them.',
    more: 'Privacy notice',
    accept: 'Accept',
    decline: 'Decline',
  },
  th: {
    label: 'แจ้งเตือนคุกกี้',
    text: 'เราใช้คุกกี้เพื่อการวิเคราะห์ เพื่อดูว่าหน้าใดเป็นประโยชน์ เว็บไซต์ใช้งานได้แม้ไม่ยอมรับ',
    more: 'นโยบายความเป็นส่วนตัว',
    accept: 'ยอมรับ',
    decline: 'ไม่ยอมรับ',
  },
};

type Choice = 'granted' | 'denied';

const read = (): Choice | null => {
  try {
    const value = window.localStorage.getItem(KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
};

const apply = (choice: Choice) => {
  try {
    window.localStorage.setItem(KEY, choice);
  } catch {
    // Private mode: the choice then lasts for this page only.
  }
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  gtag?.('consent', 'update', { analytics_storage: choice });
};

/**
 * PDPA cookie notice. Analytics storage stays denied (set in index.html)
 * until the visitor accepts; the choice is remembered in localStorage.
 */
const CookieConsent = (props: { locale: Locale }) => {
  const { locale } = props;
  const t = TEXT[locale];
  // Never rendered on the server or on first paint, so prerendered HTML and
  // hydration agree.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (read() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: Choice) => {
    apply(choice);
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label={t.label}
      className="fixed z-50 bottom-3 left-3 right-3 sm:left-auto sm:right-5 sm:bottom-5 sm:max-w-[420px] rounded-2xl bg-white border border-sep-light shadow-premium p-5 gap-y-3 flex flex-col"
    >
      <p className="text-sm leading-relaxed text-text-main">
        {t.text}{' '}
        <Link
          className="text-brand-blue-ink underline underline-offset-2"
          to={paths.page(locale, 'privacy-policy')}
        >
          {t.more}
        </Link>
      </p>
      <div className="gap-x-3 flex flex-row justify-end items-center">
        <button
          type="button"
          className="rounded-full border border-sep-light px-4 py-2 text-sm font-medium text-text-main hover:border-brand-blue"
          onClick={() => choose('denied')}
        >
          {t.decline}
        </button>
        <button
          type="button"
          className="rounded-full bg-brand-green-ink px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          onClick={() => choose('granted')}
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
