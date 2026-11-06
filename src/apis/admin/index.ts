import {
  AdminSession,
  apiFetch,
  readSession,
  storeSession,
  subscribeSession,
} from '../../lib/apiClient';
import { invalidateCmsCache } from '../_commons/cms';

export type { AdminSession };

// ---------------------------------------------------------------- auth ----

export const getSession = async (): Promise<AdminSession | null> =>
  readSession();

export const onAuthChange = (
  callback: (session: AdminSession | null) => void
): (() => void) => subscribeSession(callback);

export const signIn = async (
  email: string,
  password: string
): Promise<void> => {
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

const MAX_IMAGE_WIDTH = 2400;
const OPTIMIZE_ABOVE_BYTES = 300 * 1024;

/**
 * Photos straight from a camera or an AI tool are often several MB of PNG,
 * which makes the page slow on mobile. Before uploading, scale large photos
 * down to 2400 px wide and re-encode them as WebP. Keeps the original when it
 * is already small, is not a photo format (SVG, GIF) or the browser cannot
 * encode WebP.
 */
const optimizeImage = async (file: File): Promise<File> => {
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
    return file;
  }
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_IMAGE_WIDTH / bitmap.width);
    if (scale === 1 && file.size <= OPTIMIZE_ABOVE_BYTES) {
      bitmap.close();
      return file;
    }
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas
      .getContext('2d')
      ?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/webp', 0.82)
    );
    if (!blob || blob.type !== 'image/webp' || blob.size >= file.size) {
      return file;
    }
    const name = file.name.replace(/\.[^.]+$/, '') + '.webp';
    return new File([blob], name, { type: 'image/webp' });
  } catch {
    return file;
  }
};

/** Uploads an image to the R2 bucket; returns the public URL the site serves it from. */
export const uploadImage = async (
  file: File,
  folder: string
): Promise<string> => {
  const form = new FormData();
  form.append('file', await optimizeImage(file));
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
