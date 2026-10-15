import { AdminSession, apiFetch, readSession, storeSession, subscribeSession } from '../../lib/apiClient';
import { invalidateCmsCache } from '../_commons/cms';

export type { AdminSession };

// ---------------------------------------------------------------- auth ----

export const getSession = async (): Promise<AdminSession | null> =>
  readSession();

export const onAuthChange = (
  callback: (session: AdminSession | null) => void
): (() => void) => subscribeSession(callback);

export const signIn = async (email: string, password: string): Promise<void> => {
  const session = await apiFetch<AdminSession>('/api/admin/login', {
    method: 'POST',
    json: { email, password },
  });
  storeSession(session);
};

export const signOut = async (): Promise<void> => {
  storeSession(null);
};

// ------------------------------------------------------------ cms rows ----

export interface CmsRow {
  collection: string;
  key: string;
  seq: number;
  data: Record<string, unknown>;
}

export const listRows = (collection: string): Promise<CmsRow[]> =>
  apiFetch<CmsRow[]>(
    `/api/admin/rows?collection=${encodeURIComponent(collection)}`,
    { auth: true }
  );

export const upsertRow = async (row: CmsRow): Promise<void> => {
  await apiFetch('/api/admin/rows', { method: 'PUT', json: row, auth: true });
  invalidateCmsCache();
};

export const bulkUpsertRows = async (rows: CmsRow[]): Promise<void> => {
  if (!rows.length) return;
  await apiFetch('/api/admin/rows/bulk', {
    method: 'PUT',
    json: { rows },
    auth: true,
  });
  invalidateCmsCache();
};

export const deleteRow = async (
  collection: string,
  key: string
): Promise<void> => {
  await apiFetch(
    `/api/admin/rows?collection=${encodeURIComponent(collection)}&key=${encodeURIComponent(key)}`,
    { method: 'DELETE', auth: true }
  );
  invalidateCmsCache();
};

// ------------------------------------------------------------- storage ----

/** Uploads an image to the R2 bucket; returns the public URL the site serves it from. */
export const uploadImage = async (
  file: File,
  folder: string
): Promise<string> => {
  const form = new FormData();
  form.append('file', file);
  const { url } = await apiFetch<{ url: string }>(
    `/api/admin/upload?folder=${encodeURIComponent(folder)}`,
    { method: 'POST', body: form, auth: true }
  );
  return url;
};

// --------------------------------------------------------------- leads ----

export interface LeadRow {
  id: number;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  current_bill: string;
  industry: string;
  status: string;
  created_at: string;
}

export const listLeads = (): Promise<LeadRow[]> =>
  apiFetch<LeadRow[]>('/api/admin/leads', { auth: true });

export const updateLeadStatus = async (
  id: number,
  status: string
): Promise<void> => {
  await apiFetch(`/api/admin/leads/${id}`, {
    method: 'PATCH',
    json: { status },
    auth: true,
  });
};
