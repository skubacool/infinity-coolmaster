/**
 * GA4 page-view tracking for this single-page app.
 *
 * The site uses HashRouter, so navigating between pages never reloads the
 * document — the gtag snippet in index.html only fires once. To count every
 * page we disable gtag's automatic page_view (send_page_view: false in
 * index.html) and call trackPageView() on each route change instead.
 *
 * Because the real URL keeps the route in the hash (…/#/en/about), which GA4
 * strips when deriving the page path, we send a synthesized path-based
 * page_location (…/en/about) so GA4 reports show each route as a distinct page.
 */

export const GA_MEASUREMENT_ID = 'G-K5VY9GKJYV';

type GtagFn = (...args: unknown[]) => void;

const getGtag = (): GtagFn | null => {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { gtag?: GtagFn };
  return typeof w.gtag === 'function' ? w.gtag : null;
};

/**
 * Sends a GA4 page_view for the given SPA route path (e.g. "/en/about").
 * No-op when gtag is unavailable (local dev without the tag, or blocked by
 * a privacy extension), so it never throws.
 */
export const trackPageView = (path: string): void => {
  const gtag = getGtag();
  if (!gtag) return;
  gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.origin + path,
    send_to: GA_MEASUREMENT_ID,
  });
};
