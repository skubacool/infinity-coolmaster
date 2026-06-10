import { LeadPayload } from '../../models/lead';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';
import { LEADS_TABLE } from '../../config/constants';

export class LeadSubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LeadSubmissionError';
  }
}

/**
 * Inserts a lead-form submission into the Supabase `leads` table.
 * Throws LeadSubmissionError so callers can render a friendly failure state.
 */
export const insertLead = async (
  payload: Omit<LeadPayload, 'status'>
): Promise<void> => {
  if (!isSupabaseConfigured || !supabase) {
    throw new LeadSubmissionError(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    );
  }
  const row: LeadPayload = { ...payload, status: 'new' };
  const { error } = await supabase.from(LEADS_TABLE).insert([row]);
  if (error) {
    throw new LeadSubmissionError(error.message);
  }
};
