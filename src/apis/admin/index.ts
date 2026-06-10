import type { Session } from '@supabase/supabase-js';

import { supabase } from '../../lib/supabaseClient';
import { CMS_TABLE, LEADS_TABLE } from '../../config/constants';

const STORAGE_BUCKET = 'site-images';

const client = () => {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    );
  }
  return supabase;
};

// ---------------------------------------------------------------- auth ----

export const getSession = async (): Promise<Session | null> => {
  const { data } = await client().auth.getSession();
  return data.session;
};

export const onAuthChange = (
  callback: (session: Session | null) => void
): (() => void) => {
  const { data } = client().auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
  return () => data.subscription.unsubscribe();
};

export const signIn = async (email: string, password: string): Promise<void> => {
  const { error } = await client().auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
};

export const signOut = async (): Promise<void> => {
  await client().auth.signOut();
};

// ------------------------------------------------------------ cms rows ----

export interface CmsRow {
  collection: string;
  key: string;
  seq: number;
  data: Record<string, unknown>;
}

export const listRows = async (collection: string): Promise<CmsRow[]> => {
  const { data, error } = await client()
    .from(CMS_TABLE)
    .select('collection, key, seq, data')
    .eq('collection', collection)
    .order('seq', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as CmsRow[];
};

export const upsertRow = async (row: CmsRow): Promise<void> => {
  const { error } = await client()
    .from(CMS_TABLE)
    .upsert(
      { ...row, updated_at: new Date().toISOString() },
      { onConflict: 'collection,key' }
    );
  if (error) throw new Error(error.message);
};

export const bulkUpsertRows = async (rows: CmsRow[]): Promise<void> => {
  if (!rows.length) return;
  const { error } = await client()
    .from(CMS_TABLE)
    .upsert(
      rows.map((row) => ({ ...row, updated_at: new Date().toISOString() })),
      { onConflict: 'collection,key' }
    );
  if (error) throw new Error(error.message);
};

export const deleteRow = async (
  collection: string,
  key: string
): Promise<void> => {
  const { error } = await client()
    .from(CMS_TABLE)
    .delete()
    .eq('collection', collection)
    .eq('key', key);
  if (error) throw new Error(error.message);
};

// ------------------------------------------------------------- storage ----

/** Uploads an image to the public site-images bucket; returns its public URL. */
export const uploadImage = async (
  file: File,
  folder: string
): Promise<string> => {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${folder}/${Date.now()}-${safeName}`;
  const { error } = await client()
    .storage.from(STORAGE_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) throw new Error(error.message);
  const { data } = client().storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
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

export const listLeads = async (): Promise<LeadRow[]> => {
  const { data, error } = await client()
    .from(LEADS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as LeadRow[];
};

export const updateLeadStatus = async (
  id: number,
  status: string
): Promise<void> => {
  const { error } = await client()
    .from(LEADS_TABLE)
    .update({ status })
    .eq('id', id);
  if (error) throw new Error(error.message);
};
