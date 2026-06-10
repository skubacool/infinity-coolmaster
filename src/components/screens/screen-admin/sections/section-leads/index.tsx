import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import {
  LeadRow,
  listLeads,
  updateLeadStatus,
} from '../../../../../apis/admin';
import Loading from '../../../../_commons/loading';

const STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost'];

const statusColor = (status: string): string => {
  switch (status) {
    case 'new':
      return 'bg-brand-blue-soft text-brand-blue';
    case 'contacted':
      return 'bg-pale text-title-light';
    case 'qualified':
      return 'bg-brand-green-soft text-brand-green';
    case 'won':
      return 'bg-brand-green text-white';
    case 'lost':
      return 'bg-sep-pale text-title-pale';
    default:
      return 'bg-pale text-title-light';
  }
};

/** Leads inbox — submissions from the website audit-request form. */
const SectionLeads = () => {
  const [leads, setLeads] = useState<LeadRow[] | null>(null);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    setLeads(null);
    try {
      setLeads(await listLeads());
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Failed to load');
      setLeads([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onStatus = useCallback(
    async (id: number, status: string) => {
      setMessage('');
      try {
        await updateLeadStatus(id, status);
        setLeads((prev) =>
          prev ? prev.map((l) => (l.id === id ? { ...l, status } : l)) : prev
        );
      } catch (e) {
        setMessage(e instanceof Error ? e.message : 'Update failed');
      }
    },
    []
  );

  if (!leads) return <Loading />;
  return (
    <div className="gap-y-4 flex flex-col justify-start items-stretch">
      <div className="gap-x-3 flex flex-row items-center">
        <p className="flex-1 text-sm text-text-muted">
          Audit requests from the website form, newest first.
        </p>
        <button
          type="button"
          className="rounded-lg border border-sep-light text-xs font-semibold text-text-muted px-3 py-1.5 hover:border-brand-blue hover:text-brand-blue"
          onClick={load}
        >
          Refresh
        </button>
      </div>
      {message && <p className="text-sm text-red-500">{message}</p>}
      {leads.length === 0 ? (
        <div className="card-premium p-8 text-center text-sm text-title-pale">
          No leads yet. They will appear here as soon as someone submits the
          form on the website.
        </div>
      ) : (
        <ul className="gap-y-2 flex flex-col">
          {leads.map((lead) => (
            <li
              key={lead.id}
              className="card-premium p-4 gap-y-2 flex flex-col"
            >
              <div className="gap-x-3 flex flex-row items-center flex-wrap">
                <span className="text-base font-semibold text-text-main">
                  {lead.company_name}
                </span>
                <span
                  className={`text-2xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusColor(lead.status)}`}
                >
                  {lead.status}
                </span>
                <span className="flex-1" />
                <span className="text-xs text-title-pale">
                  {dayjs(lead.created_at).format('D MMM YYYY HH:mm')}
                </span>
              </div>
              <div className="gap-x-6 gap-y-1 flex flex-row flex-wrap text-sm text-text-muted">
                <span>{lead.contact_person}</span>
                <a className="underline" href={`mailto:${lead.email}`}>
                  {lead.email}
                </a>
                <a className="underline" href={`tel:${lead.phone}`}>
                  {lead.phone}
                </a>
                <span>{lead.current_bill}</span>
                <span className="uppercase text-xs self-center tracking-wider text-title-pale">
                  {lead.industry}
                </span>
              </div>
              <div className="gap-x-2 flex flex-row items-center">
                <span className="text-xs text-title-pale">Status:</span>
                <select
                  className="rounded-lg border border-sep-light bg-white px-2 py-1 text-xs focus:outline-none"
                  value={lead.status}
                  onChange={(e) => onStatus(lead.id, e.target.value)}
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SectionLeads;
