/**
 * GA4 page-view tracking for this single-page app.
 *
 * Navigating between pages happens client-side (history API), so the gtag
 * snippet in index.html only fires once per visit. To count every page we
 * disable gtag's automatic page_view (send_page_view: false in index.html)
 * and call trackPageView() on each route change instead, after the page's
 * <title> has been updated.
 */

export const GA_MEASUREMENT_ID = 'G-K5VY9GKJYV';

type GtagFn = (...args: unknown[]) => void;

const getGtag = (): GtagFn | null => {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { gtag?: GtagFn };
  return typeof w.gtag === 'function' ? w.gtag : null;
};

/**
 * Sends a GA4 page_view for the given route path (e.g. "/en/about/").
 * No-op when gtag is unavailable (local dev without the tag, or blocked by
 * a privacy extension), so it never throws.
 */
export const trackPageView = (path: string): void => {
  const gtag = getGtag();
  if (!gtag) return;
  gtag('event', 'page_view', {
    page_title: document.title,
    // Keep the query string so UTM campaign tags are attributed.
    page_location: window.location.origin + path + window.location.search,
    send_to: GA_MEASUREMENT_ID,
  });
};
