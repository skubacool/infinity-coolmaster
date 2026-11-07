/**
 * Carries what a visitor typed into the savings estimator over to the audit
 * request form, so they never have to type it twice. Held in memory (and
 * sessionStorage, so it survives the client-side hop to the contact page).
 */
export interface LeadPrefill {
  /** Monthly electricity bill in THB. */
  bill: number;
  /** Sector key, if known. */
  industry?: string;
}

const KEY = 'icm_lead_prefill';
let current: LeadPrefill | null = null;

export const setLeadPrefill = (value: LeadPrefill): void => {
  current = value;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage can be blocked; the in-memory copy still works */
  }
};

export const getLeadPrefill = (): LeadPrefill | null => {
  if (current) return current;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) current = JSON.parse(raw) as LeadPrefill;
  } catch {
    /* ignore */
  }
  return current;
};

const RANGES = [
  { max: 500_000, label: '< 500,000 THB / month' },
  { max: 1_000_000, label: '500,000 – 1,000,000 THB / month' },
  { max: 5_000_000, label: '1,000,000 – 5,000,000 THB / month' },
  { max: Infinity, label: '> 5,000,000 THB / month' },
];

/** Maps a monthly bill to the matching option of the lead form's bill select. */
export const billToRange = (bill: number): string =>
  (RANGES.find((r) => bill < r.max) ?? RANGES[RANGES.length - 1]).label;
