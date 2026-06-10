import { supabase } from '../../lib/supabaseClient';
import { CMS_TABLE } from '../../config/constants';

/**
 * Fetches a CMS collection from the Supabase `cms_content` table.
 *
 * Table shape: { id, collection: text, key: text | null, seq: int, data: jsonb }
 * Each row's `data` column holds one serialized entity of type T.
 *
 * Falls back to the provided typed defaults when Supabase is not configured,
 * the query fails, or the collection is empty — the UI never breaks.
 */
export const fetchCollection = async <T>(
  collection: string,
  fallback: T[]
): Promise<T[]> => {
  if (!supabase) return fallback;
  try {
    const { data, error } = await supabase
      .from(CMS_TABLE)
      .select('data, seq')
      .eq('collection', collection)
      .order('seq', { ascending: true });
    if (error) throw error;
    if (!data || data.length === 0) return fallback;
    return data.map((row) => row.data as T);
  } catch (error) {
    console.error(`[cms] using defaults for collection "${collection}"`, error);
    return fallback;
  }
};
