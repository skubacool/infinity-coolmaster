/** Row payload for the Supabase `leads` table. */
export interface LeadPayload {
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  /** Approximate current monthly electricity bill (free-form / range label). */
  current_bill: string;
  industry: string;
  status: string;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'lost';
