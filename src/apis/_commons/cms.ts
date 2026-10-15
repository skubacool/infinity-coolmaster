import { apiFetch, isApiConfigured } from '../../lib/apiClient';

type CmsBundle = Record<string, unknown[]>;

let bundlePromise: Promise<CmsBundle | null> | null = null;

/**
 * Every collection arrives in ONE request (GET /api/cms). The promise is
 * shared, so the dozen fetchCollection() calls a page makes cost a single
 * round trip.
 */
const loadBundle = (): Promise<CmsBundle | null> => {
  if (!isApiConfigured) return Promise.resolve(null);
  if (!bundlePromise) {
    bundlePromise = apiFetch<CmsBundle>('/api/cms').catch((error) => {
      console.error('[cms] could not load content, using defaults', error);
      bundlePromise = null; // let the next call retry
      return null;
    });
  }
  return bundlePromise;
};

/** Forget the loaded content so the next read fetches it fresh (after an admin save). */
export const invalidateCmsCache = (): void => {
  bundlePromise = null;
};

/**
 * Returns one CMS collection from the API.
 *
 * Each item is the JSON stored in the row's `data` column, ordered by `seq`.
 * Falls back to the provided typed defaults when the API is not configured,
 * the request fails, or the collection is empty — the UI never breaks. The
 * fallback is returned by identity so callers can tell defaults from CMS rows.
 */
export const fetchCollection = async <T>(
  collection: string,
  fallback: T[]
): Promise<T[]> => {
  const bundle = await loadBundle();
  const items = bundle?.[collection];
  if (!items || items.length === 0) return fallback;
  return items as T[];
};
