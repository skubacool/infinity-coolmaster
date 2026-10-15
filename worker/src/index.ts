/**
 * Infinity CoolMaster API — Cloudflare Worker + D1 (content, leads) + R2 (images).
 *
 * Public   GET  /api/cms             every CMS collection in one response
 *          POST /api/leads           audit-request form submission
 *          GET  /img/<folder>/<file> uploaded images (R2)
 * Admin    POST /api/admin/login     email + password -> signed token (24 h)
 *          GET  /api/admin/me
 *          GET | PUT | DELETE /api/admin/rows      PUT /api/admin/rows/bulk
 *          POST /api/admin/upload
 *          GET  /api/admin/leads     PATCH /api/admin/leads/:id
 *
 * Every /api/admin/* route except login needs `Authorization: Bearer <token>`.
 */

export interface Env {
  DB: D1Database;
  IMAGES: R2Bucket;
  /** Secrets — set with `wrangler secret put` (see README.md). */
  AUTH_SECRET: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
  /** Comma-separated browser origins allowed to call the API (CORS). */
  ALLOWED_ORIGINS: string;
}

const TOKEN_TTL_SECONDS = 24 * 60 * 60;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES_PER_IP = 5;
const MAX_FAILURES_GLOBAL = 30;
const MAX_LEADS_PER_HOUR = 100;
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const MAX_ROW_CHARS = 200_000;
const MAX_BULK_ROWS = 200;
const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost'];
const IMAGE_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/svg+xml',
]);

const encoder = new TextEncoder();
const decoder = new TextDecoder();

class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message);
  }
}

// ------------------------------------------------------------- helpers ----

const json = (
  body: unknown,
  status = 200,
  headers: Record<string, string> = {}
): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
  });

const corsHeaders = (request: Request, env: Env): Headers => {
  const headers = new Headers({ Vary: 'Origin' });
  const origin = request.headers.get('Origin');
  const allowed = (env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  if (origin && allowed.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    headers.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    headers.set('Access-Control-Max-Age', '86400');
  }
  return headers;
};

const readJson = async (
  request: Request,
  maxChars: number
): Promise<Record<string, unknown>> => {
  const text = await request.text();
  if (text.length > maxChars) throw new HttpError(413, 'Request too large');
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new HttpError(400, 'Invalid JSON');
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new HttpError(400, 'Invalid JSON body');
  }
  return value as Record<string, unknown>;
};

const textField = (
  value: unknown,
  label: string,
  max: number,
  required: boolean
): string => {
  const text = typeof value === 'string' ? value.trim() : '';
  if (required && !text) throw new HttpError(400, `${label} is required`);
  if (text.length > max) throw new HttpError(400, `${label} is too long`);
  return text;
};

// ---------------------------------------------------------------- auth ----

interface TokenPayload {
  sub: string;
  exp: number;
}

const toBase64Url = (bytes: Uint8Array): string => {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const fromBase64Url = (value: string): Uint8Array => {
  const padded = value
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(value.length / 4) * 4, '=');
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
};

const hmacKey = (secret: string, usage: 'sign' | 'verify'): Promise<CryptoKey> =>
  crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    [usage]
  );

const signToken = async (
  env: Env,
  email: string
): Promise<{ token: string; exp: number }> => {
  const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
  const payload = toBase64Url(
    encoder.encode(JSON.stringify({ sub: email, exp } satisfies TokenPayload))
  );
  const key = await hmacKey(env.AUTH_SECRET, 'sign');
  const signature = new Uint8Array(
    await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  );
  return { token: `${payload}.${toBase64Url(signature)}`, exp };
};

const verifyToken = async (
  env: Env,
  token: string
): Promise<TokenPayload | null> => {
  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra !== undefined) return null;
  try {
    const key = await hmacKey(env.AUTH_SECRET, 'verify');
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      fromBase64Url(signature),
      encoder.encode(payload)
    );
    if (!valid) return null;
    const data = JSON.parse(
      decoder.decode(fromBase64Url(payload))
    ) as TokenPayload;
    return typeof data.exp === 'number' && data.exp > Date.now() / 1000
      ? data
      : null;
  } catch {
    return null;
  }
};

const requireAdmin = async (
  request: Request,
  env: Env
): Promise<TokenPayload> => {
  if (!env.AUTH_SECRET) throw new HttpError(500, 'Admin login is not configured');
  const header = request.headers.get('Authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const session = token ? await verifyToken(env, token) : null;
  if (!session) throw new HttpError(401, 'Not signed in');
  return session;
};

const sha256 = async (value: string): Promise<Uint8Array> =>
  new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value)));

/** Constant-time string comparison (digests first, so lengths always match). */
const safeEqual = async (a: string, b: string): Promise<boolean> =>
  crypto.subtle.timingSafeEqual(await sha256(a), await sha256(b));

const login = async (request: Request, env: Env): Promise<Response> => {
  if (!env.AUTH_SECRET || !env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
    throw new HttpError(500, 'Admin login is not configured');
  }
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const windowStart = Date.now() - LOGIN_WINDOW_MS;

  const perIp = await env.DB.prepare(
    'SELECT COUNT(*) AS n FROM login_failures WHERE ip = ? AND at > ?'
  )
    .bind(ip, windowStart)
    .first<{ n: number }>();
  const global = await env.DB.prepare(
    'SELECT COUNT(*) AS n FROM login_failures WHERE at > ?'
  )
    .bind(windowStart)
    .first<{ n: number }>();
  if (
    (perIp?.n ?? 0) >= MAX_FAILURES_PER_IP ||
    (global?.n ?? 0) >= MAX_FAILURES_GLOBAL
  ) {
    throw new HttpError(429, 'Too many attempts. Try again in 15 minutes.');
  }

  const body = await readJson(request, 2_000);
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const emailOk = await safeEqual(email, env.ADMIN_EMAIL.trim().toLowerCase());
  const passwordOk = await safeEqual(password, env.ADMIN_PASSWORD);

  if (!emailOk || !passwordOk) {
    await env.DB.batch([
      env.DB.prepare('INSERT INTO login_failures (ip, at) VALUES (?, ?)').bind(
        ip,
        Date.now()
      ),
      env.DB.prepare('DELETE FROM login_failures WHERE at < ?').bind(
        Date.now() - 24 * 60 * 60 * 1000
      ),
    ]);
    throw new HttpError(401, 'Invalid login credentials');
  }

  await env.DB.prepare('DELETE FROM login_failures WHERE ip = ?').bind(ip).run();
  const { token, exp } = await signToken(env, env.ADMIN_EMAIL.trim());
  return json({ token, email: env.ADMIN_EMAIL.trim(), expiresAt: exp });
};

// -------------------------------------------------------------- public ----

interface RowRecord {
  collection: string;
  key: string;
  seq: number;
  data: string;
}

const parseData = (raw: string): Record<string, unknown> | null => {
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null; // skip a corrupt row rather than break the whole site
  }
};

const getCms = async (env: Env): Promise<Response> => {
  const { results } = await env.DB.prepare(
    'SELECT collection, data FROM cms_content ORDER BY collection, seq, id'
  ).all<Pick<RowRecord, 'collection' | 'data'>>();
  const bundle: Record<string, unknown[]> = {};
  for (const row of results) {
    const data = parseData(row.data);
    if (data) (bundle[row.collection] ??= []).push(data);
  }
  // Always revalidate so a Save in the admin shows on the very next page load.
  return json(bundle, 200, { 'Cache-Control': 'no-cache' });
};

const postLead = async (request: Request, env: Env): Promise<Response> => {
  const body = await readJson(request, 10_000);
  // Honeypot: real visitors never see or fill this field, bots do.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return json({ ok: true }, 201);
  }
  const lead = {
    company_name: textField(body.company_name, 'Company name', 200, true),
    contact_person: textField(body.contact_person, 'Contact person', 200, true),
    email: textField(body.email, 'Email', 254, true),
    phone: textField(body.phone, 'Phone', 50, false),
    current_bill: textField(body.current_bill, 'Monthly bill', 100, false),
    industry: textField(body.industry, 'Industry', 100, true),
  };
  if (!/^\S+@\S+\.\S+$/.test(lead.email)) {
    throw new HttpError(400, 'Email address is not valid');
  }

  // Global cap so a script cannot flood the table.
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const recent = await env.DB.prepare(
    'SELECT COUNT(*) AS n FROM leads WHERE created_at > ?'
  )
    .bind(since)
    .first<{ n: number }>();
  if ((recent?.n ?? 0) >= MAX_LEADS_PER_HOUR) {
    throw new HttpError(429, 'Too many requests, please try again later');
  }

  await env.DB.prepare(
    "INSERT INTO leads (company_name, contact_person, email, phone, current_bill, industry, status) VALUES (?, ?, ?, ?, ?, ?, 'new')"
  )
    .bind(
      lead.company_name,
      lead.contact_person,
      lead.email,
      lead.phone,
      lead.current_bill,
      lead.industry
    )
    .run();
  return json({ ok: true }, 201);
};

const getImage = async (
  request: Request,
  env: Env,
  key: string
): Promise<Response> => {
  if (!/^[a-z0-9_-]+\/[A-Za-z0-9._-]+$/.test(key)) {
    throw new HttpError(404, 'Not found');
  }
  const object = await env.IMAGES.get(key);
  if (!object) throw new HttpError(404, 'Not found');

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('ETag', object.httpEtag);
  // File names carry a timestamp, so a given URL never changes content.
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('X-Content-Type-Options', 'nosniff');
  // Neutralise scripts if an SVG is ever opened directly in a tab.
  headers.set(
    'Content-Security-Policy',
    "default-src 'none'; style-src 'unsafe-inline'; sandbox"
  );
  headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
  if (request.headers.get('If-None-Match') === object.httpEtag) {
    return new Response(null, { status: 304, headers });
  }
  return new Response(request.method === 'HEAD' ? null : object.body, {
    headers,
  });
};

// --------------------------------------------------------------- admin ----

const COLLECTION_PATTERN = /^[a-z0-9_]{1,40}$/;

const parseRow = (value: unknown): RowRecord => {
  if (!value || typeof value !== 'object') throw new HttpError(400, 'Invalid row');
  const row = value as Record<string, unknown>;
  const collection = typeof row.collection === 'string' ? row.collection : '';
  const key = typeof row.key === 'string' ? row.key : '';
  const seq = Number(row.seq ?? 0);
  if (!COLLECTION_PATTERN.test(collection)) {
    throw new HttpError(400, 'Invalid collection name');
  }
  if (!key || key.length > 120) throw new HttpError(400, 'Invalid row key');
  if (!Number.isInteger(seq)) throw new HttpError(400, 'Invalid display order');
  if (!row.data || typeof row.data !== 'object' || Array.isArray(row.data)) {
    throw new HttpError(400, 'Row data must be an object');
  }
  const data = JSON.stringify(row.data);
  if (data.length > MAX_ROW_CHARS) throw new HttpError(413, 'Row is too large');
  return { collection, key, seq, data };
};

const upsertStatement = (env: Env, row: RowRecord): D1PreparedStatement =>
  env.DB.prepare(
    `INSERT INTO cms_content (collection, "key", seq, data, updated_at)
     VALUES (?, ?, ?, ?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
     ON CONFLICT (collection, "key") DO UPDATE SET
       seq = excluded.seq, data = excluded.data, updated_at = excluded.updated_at`
  ).bind(row.collection, row.key, row.seq, row.data);

const listRows = async (url: URL, env: Env): Promise<Response> => {
  const collection = url.searchParams.get('collection') ?? '';
  if (!COLLECTION_PATTERN.test(collection)) {
    throw new HttpError(400, 'Invalid collection name');
  }
  const { results } = await env.DB.prepare(
    'SELECT collection, "key" AS key, seq, data FROM cms_content WHERE collection = ? ORDER BY seq, id'
  )
    .bind(collection)
    .all<RowRecord>();
  const rows = results.flatMap((row) => {
    const data = parseData(row.data);
    return data ? [{ ...row, data }] : [];
  });
  return json(rows);
};

const putRow = async (request: Request, env: Env): Promise<Response> => {
  const row = parseRow(await readJson(request, MAX_ROW_CHARS + 1_000));
  await upsertStatement(env, row).run();
  return json({ ok: true });
};

const putRowsBulk = async (request: Request, env: Env): Promise<Response> => {
  const body = await readJson(request, MAX_ROW_CHARS * 20);
  if (!Array.isArray(body.rows) || body.rows.length === 0) {
    throw new HttpError(400, 'rows must be a non-empty array');
  }
  if (body.rows.length > MAX_BULK_ROWS) throw new HttpError(413, 'Too many rows');
  const rows = body.rows.map(parseRow);
  await env.DB.batch(rows.map((row) => upsertStatement(env, row)));
  return json({ ok: true, count: rows.length });
};

const deleteRow = async (url: URL, env: Env): Promise<Response> => {
  const collection = url.searchParams.get('collection') ?? '';
  const key = url.searchParams.get('key') ?? '';
  if (!COLLECTION_PATTERN.test(collection) || !key) {
    throw new HttpError(400, 'collection and key are required');
  }
  await env.DB.prepare('DELETE FROM cms_content WHERE collection = ? AND "key" = ?')
    .bind(collection, key)
    .run();
  return json({ ok: true });
};

const upload = async (
  request: Request,
  url: URL,
  env: Env
): Promise<Response> => {
  const folder = url.searchParams.get('folder') ?? 'misc';
  if (!/^[a-z0-9_-]{1,40}$/.test(folder)) throw new HttpError(400, 'Invalid folder');
  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) throw new HttpError(400, 'No file uploaded');
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new HttpError(413, 'Image is larger than 10 MB');
  }
  if (!IMAGE_TYPES.has(file.type)) {
    throw new HttpError(415, 'Only PNG, JPG, WebP, GIF, AVIF or SVG images are allowed');
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-80);
  const key = `${folder}/${Date.now()}-${safeName}`;
  await env.IMAGES.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  });
  return json({ url: `${url.origin}/img/${key}` }, 201);
};

const listLeads = async (env: Env): Promise<Response> => {
  const { results } = await env.DB.prepare(
    'SELECT id, company_name, contact_person, email, phone, current_bill, industry, status, created_at FROM leads ORDER BY id DESC LIMIT 1000'
  ).all();
  return json(results);
};

const patchLead = async (
  request: Request,
  env: Env,
  id: number
): Promise<Response> => {
  const body = await readJson(request, 1_000);
  const status = typeof body.status === 'string' ? body.status : '';
  if (!LEAD_STATUSES.includes(status)) throw new HttpError(400, 'Invalid status');
  await env.DB.prepare('UPDATE leads SET status = ? WHERE id = ?')
    .bind(status, id)
    .run();
  return json({ ok: true });
};

// -------------------------------------------------------------- router ----

const route = async (request: Request, env: Env): Promise<Response> => {
  const url = new URL(request.url);
  const { pathname } = url;
  const { method } = request;

  if (pathname === '/' && method === 'GET') {
    return json({ service: 'infinity-coolmaster-api', ok: true });
  }
  if (pathname === '/api/cms' && method === 'GET') return getCms(env);
  if (pathname === '/api/leads' && method === 'POST') return postLead(request, env);
  if (pathname.startsWith('/img/') && (method === 'GET' || method === 'HEAD')) {
    return getImage(request, env, decodeURIComponent(pathname.slice('/img/'.length)));
  }
  if (pathname === '/api/admin/login' && method === 'POST') {
    return login(request, env);
  }

  if (pathname.startsWith('/api/admin/')) {
    const session = await requireAdmin(request, env);
    if (pathname === '/api/admin/me' && method === 'GET') {
      return json({ email: session.sub, expiresAt: session.exp });
    }
    if (pathname === '/api/admin/rows') {
      if (method === 'GET') return listRows(url, env);
      if (method === 'PUT') return putRow(request, env);
      if (method === 'DELETE') return deleteRow(url, env);
    }
    if (pathname === '/api/admin/rows/bulk' && method === 'PUT') {
      return putRowsBulk(request, env);
    }
    if (pathname === '/api/admin/upload' && method === 'POST') {
      return upload(request, url, env);
    }
    if (pathname === '/api/admin/leads' && method === 'GET') return listLeads(env);
    const leadMatch = pathname.match(/^\/api\/admin\/leads\/(\d+)$/);
    if (leadMatch && method === 'PATCH') {
      return patchLead(request, env, Number(leadMatch[1]));
    }
  }
  throw new HttpError(404, 'Not found');
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = corsHeaders(request, env);
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    let response: Response;
    try {
      response = await route(request, env);
    } catch (error) {
      if (error instanceof HttpError) {
        response = json({ error: error.message }, error.status);
      } else {
        console.error('Unhandled error', error);
        response = json({ error: 'Internal error' }, 500);
      }
    }
    cors.forEach((value, name) => response.headers.set(name, value));
    return response;
  },
} satisfies ExportedHandler<Env>;
