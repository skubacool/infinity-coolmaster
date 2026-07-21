import {
  FormEvent,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { Locale } from '../../../models/_commons/localized';
import { Sector } from '../../../models/sector';
import { l } from '../../../utils/localization-utils';
import { useVmScreen } from '../../../stores/vm-screen';
import { insertLead } from '../../../apis/lead';
import Icon from '../icon';

export interface LeadFormProps {
  locale?: Locale;
  sectors?: Sector[];
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const BILL_RANGES = [
  '< 500,000 THB / month',
  '500,000 – 1,000,000 THB / month',
  '1,000,000 – 5,000,000 THB / month',
  '> 5,000,000 THB / month',
];

const inputClass =
  'w-full rounded-xl border border-sep-light bg-white px-4 py-3 text-base text-text-main placeholder:text-title-pale focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-shadow';

const LeadForm = (props: PropsWithChildren<LeadFormProps>) => {
  const { locale = 'en', sectors = [] } = props;

  const { localizations = [] } = useVmScreen();

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentBill, setCurrentBill] = useState('');
  const [industry, setIndustry] = useState('');
  const [state, setState] = useState<SubmitState>('idle');
  const [validationError, setValidationError] = useState(false);

  const t = useCallback(
    (key: string) => l(locale, localizations, key),
    [locale, localizations]
  );

  // Only the essentials are required — phone and bill are optional to reduce
  // friction; we qualify the rest on the follow-up call.
  const isValid = useMemo(() => {
    return Boolean(
      companyName.trim() &&
        contactPerson.trim() &&
        /^\S+@\S+\.\S+$/.test(email) &&
        industry
    );
  }, [companyName, contactPerson, email, industry]);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!isValid) {
        setValidationError(true);
        return;
      }
      setValidationError(false);
      setState('submitting');
      try {
        await insertLead({
          company_name: companyName.trim(),
          contact_person: contactPerson.trim(),
          email: email.trim(),
          phone: phone.trim(),
          current_bill: currentBill,
          industry,
        });
        setState('success');
      } catch (error) {
        console.error('>>error<< insert_lead', error);
        setState('error');
      }
    },
    [isValid, companyName, contactPerson, email, phone, currentBill, industry]
  );

  if (state === 'success') {
    return (
      <div className="card-premium p-8 lg:p-12 gap-y-4 flex flex-col justify-center items-center text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-caas-soft flex flex-col justify-center items-center text-brand-green">
          <Icon name="guaranteed" size={32} />
        </div>
        <h3 className="text-2xl font-semibold text-text-main">
          {t('form.success-title')}
        </h3>
        <p className="text-base text-text-muted max-w-[420px]">
          {t('form.success-message')}
        </p>
      </div>
    );
  }

  return (
    <form
      className="card-premium p-6 lg:p-10 gap-y-5 flex flex-col justify-start items-stretch"
      onSubmit={onSubmit}
      noValidate
    >
      <h3 className="text-xl lg:text-2hxl font-semibold text-text-main">
        {t('form.title')}
      </h3>
      <div className="gap-5 grid grid-cols-1 lg:grid-cols-2">
        <label className="gap-y-1.5 flex flex-col justify-start items-stretch">
          <span className="text-sm font-medium text-text-muted">
            {t('form.company')} *
          </span>
          <input
            className={inputClass}
            type="text"
            name="company_name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </label>
        <label className="gap-y-1.5 flex flex-col justify-start items-stretch">
          <span className="text-sm font-medium text-text-muted">
            {t('form.contact-person')} *
          </span>
          <input
            className={inputClass}
            type="text"
            name="contact_person"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            required
          />
        </label>
        <label className="gap-y-1.5 flex flex-col justify-start items-stretch">
          <span className="text-sm font-medium text-text-muted">
            {t('form.email')} *
          </span>
          <input
            className={inputClass}
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="gap-y-1.5 flex flex-col justify-start items-stretch">
          <span className="text-sm font-medium text-text-muted">
            {t('form.phone')}
          </span>
          <input
            className={inputClass}
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label className="gap-y-1.5 flex flex-col justify-start items-stretch">
          <span className="text-sm font-medium text-text-muted">
            {t('form.current-bill')}
          </span>
          <select
            className={inputClass}
            name="current_bill"
            value={currentBill}
            onChange={(e) => setCurrentBill(e.target.value)}
          >
            <option value="" disabled>
              {t('form.select-placeholder')}
            </option>
            {BILL_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </label>
        <label className="gap-y-1.5 flex flex-col justify-start items-stretch">
          <span className="text-sm font-medium text-text-muted">
            {t('form.industry')} *
          </span>
          <select
            className={inputClass}
            name="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          >
            <option value="" disabled>
              {t('form.select-placeholder')}
            </option>
            {sectors.map((sector) => (
              <option key={sector.key} value={sector.key}>
                {sector.title[locale]}
              </option>
            ))}
          </select>
        </label>
      </div>
      {validationError && (
        <p className="text-sm text-red-500">{t('form.required')}</p>
      )}
      {state === 'error' && (
        <p className="text-sm text-red-500">{t('form.error-message')}</p>
      )}
      <button
        className="btn-caas disabled:opacity-60 disabled:cursor-not-allowed"
        type="submit"
        disabled={state === 'submitting'}
      >
        {state === 'submitting' ? t('form.submitting') : t('form.submit')}
        <Icon name="arrow-right" size={18} />
      </button>
      <p className="text-xs text-title-pale text-center">
        {t('form.privacy-note')}
      </p>
    </form>
  );
};

export default LeadForm;
