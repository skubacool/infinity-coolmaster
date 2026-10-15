import { LeadPayload } from '../../models/lead';
import { ApiError, apiFetch } from '../../lib/apiClient';

export class LeadSubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LeadSubmissionError';
  }
}

/**
 * Sends a lead-form submission to the API, which stores it in the `leads`
 * table with status 'new'. `website` is a honeypot that people never fill in.
 * Throws LeadSubmissionError so callers can render a friendly failure state.
 */
export const insertLead = async (
  payload: Omit<LeadPayload, 'status'> & { website?: string }
): Promise<void> => {
  try {
    await apiFetch('/api/leads', { method: 'POST', json: payload });
  } catch (error) {
    throw new LeadSubmissionError(
      error instanceof ApiError ? error.message : 'Submission failed'
    );
  }
};
