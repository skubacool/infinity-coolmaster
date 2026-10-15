/**
 * Thin client for the Infinity CoolMaster API (a Cloudflare Worker, see /worker).
 * VITE_API_URL is the Worker's origin, e.g. https://icm-api.<account>.workers.dev
 */

/** Origin of the API without a trailing slash ('' when not configured). */
export const API_BASE: string = (import.meta.env.VITE_API_URL ?? '').replace(
  /\/+$/,
  ''
);

/**
 * True when VITE_API_URL is set. When false the site renders entirely from the
 * typed default content (src/apis/* /defaults.ts), so a local preview without a
 * backend never breaks.
 */
export const isApiConfigured: boolean = API_BASE !== '';

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ------------------------------------------------------- admin session ----

export interface AdminSession {
  token: string;
  email: string;
  /** Expiry as epoch seconds. */
  expiresAt: number;
}

const SESSION_KEY = 'icm_admin_session';
const listeners = new Set<(session: AdminSession | null) => void>();
let current: AdminSession | null | undefined; // undefined = not read yet

/** Returns the signed-in session, or null when absent or expired. */
export const readSession = (): AdminSession | null => {
  if (current === undefined) {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      current = raw ? (JSON.parse(raw) as AdminSession) : null;
    } catch {
      current = null;
    }
  }
  if (current && current.expiresAt * 1000 <= Date.now()) current = null;
  return current;
};

/** Saves (or clears, with null) the session and notifies every listener. */
export const storeSession = (session: AdminSession | null): void => {
  current = session;
  try {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    // Storage blocked (private window): the session simply lasts until reload.
  }
  listeners.forEach((listener) => listener(session));
};

export const subscribeSession = (
  listener: (session: AdminSession | null) => void
): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

// ---------------------------------------------------------------- fetch ----

export interface ApiOptions {
  method?: string;
  /** Sent as a JSON body. */
  json?: unknown;
  /** Sent as-is (e.g. FormData for image uploads). */
  body?: BodyInit;
  /** Attach the admin token; a 401 reply signs the user out. */
  auth?: boolean;
}

/** Calls the API and returns the parsed JSON, throwing ApiError on failure. */
export const apiFetch = async <T>(
  path: string,
  options: ApiOptions = {}
): Promise<T> => {
  if (!isApiConfigured) {
    throw new ApiError(0, 'The API is not configured. Set VITE_API_URL.');
  }
  const headers: Record<string, string> = {};
  let body = options.body;
  if (options.json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(options.json);
  }
  if (options.auth) {
    const session = readSession();
    if (!session) throw new ApiError(401, 'Not signed in');
    headers.Authorization = `Bearer ${session.token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method: options.method ?? 'GET',
      headers,
      body,
    });
  } catch {
    throw new ApiError(
      0,
      'Could not reach the server. Check your connection and try again.'
    );
  }

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    if (response.status === 401 && options.auth) storeSession(null);
    const message =
      payload && typeof payload === 'object' && 'error' in payload
        ? String((payload as { error: unknown }).error)
        : `Request failed (${response.status})`;
    throw new ApiError(response.status, message);
  }
  return payload as T;
};
