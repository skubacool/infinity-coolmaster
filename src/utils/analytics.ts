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
 * Records a submitted audit request as GA4's recommended `generate_lead`
 * event. Mark it as a key event in GA4 (Admin → Events) to report audit
 * requests by traffic source, e.g. organic search.
 */
export const trackLead = (params: { industry?: string } = {}): void => {
  const gtag = getGtag();
  if (!gtag) return;
  gtag('event', 'generate_lead', {
    form_name: 'audit_request',
    page_location: window.location.origin + window.location.pathname,
    industry: params.industry || undefined,
    send_to: GA_MEASUREMENT_ID,
  });
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

/** Sends a named GA4 event; no-op without gtag (local dev, blockers). */
export const trackEvent = (
  name: string,
  params: Record<string, unknown> = {}
): void => {
  const gtag = getGtag();
  if (!gtag) return;
  gtag('event', name, { ...params, send_to: GA_MEASUREMENT_ID });
};

/**
 * Records clicks on phone, email and LINE links anywhere on the site as GA4
 * events (contact_click with method tel / email / line), so reports show
 * which pages lead to direct contact. Call once in the browser.
 */
export const installContactTracking = (): void => {
  if (typeof document === 'undefined') return;
  document.addEventListener(
    'click',
    (event) => {
      const link = (event.target as HTMLElement | null)?.closest?.('a');
      const href = link?.getAttribute('href') ?? '';
      const method = href.startsWith('tel:')
        ? 'tel'
        : href.startsWith('mailto:')
          ? 'email'
          : /(^|\/\/)(line\.me|lin\.ee)\//.test(href)
            ? 'line'
            : null;
      if (!method) return;
      trackEvent('contact_click', {
        method,
        link_url: href,
        page_location: window.location.origin + window.location.pathname,
      });
    },
    { capture: true }
  );
};
