import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Locale } from '../../../../models/_commons/localized';
import { paths } from '../../../../config/routes';
import { trackEvent } from '../../../../utils/analytics';
import SafeArea from '../../../_commons/safe-area';

/** Guaranteed minimum energy saving under Cooling-as-a-Service. */
const MIN_GUARANTEE = 10;

const TEXT = {
  en: {
    inputs: 'Your figures',
    cooling: 'Chiller plant electricity cost per month (THB)',
    saving: 'Expected energy saving (%)',
    savingHint: `Cooling-as-a-Service guarantees at least ${MIN_GUARANTEE}%.`,
    term: 'Contract term (years)',
    caas: 'Cooling-as-a-Service',
    share: 'Our share of the savings (%)',
    lease: 'Lease with our maintenance',
    plantCost: 'New plant cost incl. installation (THB)',
    rate: 'Lease interest rate (% per year)',
    leaseHint: 'Enter the plant cost and rate to see the lease.',
    result: 'Your benefit over the contract',
    perYear: 'per year',
    perMonth: 'per month',
    total: 'total over',
    years: 'years',
    payment: 'Lease payment',
    fee: 'Our fee (share of savings)',
    saving_: 'Energy saved',
    chart: 'Cumulative benefit (THB)',
    empty:
      'Enter your monthly chiller plant electricity cost to see the comparison.',
    negative:
      'With these figures the lease payment is higher than the saving. A smaller plant, a longer term or Cooling-as-a-Service may suit you better.',
    note: 'Estimate only, for comparison. Our fee, the lease payment and the guaranteed saving are set in a written proposal after a free audit; savings must be measured and verified on site and agreed by both parties.',
    cta: 'Get a Cooling-as-a-Service proposal',
    recommended: 'Recommended',
    atMinimum: `If savings are only the guaranteed ${MIN_GUARANTEE}%`,
    caasBetter: (gap: string) =>
      `Cooling-as-a-Service leaves you ${gap} more per year than the lease, with no fixed payment and the performance risk on us.`,
    leaseBetter: (gap: string, caasMin: string, leaseMin: string) =>
      `If the expected saving is fully achieved, the lease returns ${gap} more per year. But the lease payment is fixed: if savings come in at the guaranteed ${MIN_GUARANTEE}%, you keep ${caasMin} a year under Cooling-as-a-Service and ${leaseMin} under the lease.`,
  },
  th: {
    inputs: 'ตัวเลขของคุณ',
    cooling: 'ค่าไฟของระบบชิลเลอร์ต่อเดือน (บาท)',
    saving: 'ผลประหยัดพลังงานที่คาด (%)',
    savingHint: `Cooling-as-a-Service รับประกันอย่างน้อย ${MIN_GUARANTEE}%`,
    term: 'ระยะเวลาสัญญา (ปี)',
    caas: 'Cooling-as-a-Service',
    share: 'ส่วนแบ่งผลประหยัดของเรา (%)',
    lease: 'เช่าพร้อมบริการบำรุงรักษา',
    plantCost: 'มูลค่าระบบใหม่รวมติดตั้ง (บาท)',
    rate: 'อัตราดอกเบี้ยค่าเช่า (% ต่อปี)',
    leaseHint: 'กรอกมูลค่าระบบและอัตราดอกเบี้ยเพื่อดูการเช่า',
    result: 'ผลตอบแทนของคุณตลอดสัญญา',
    perYear: 'ต่อปี',
    perMonth: 'ต่อเดือน',
    total: 'รวมตลอด',
    years: 'ปี',
    payment: 'ค่าเช่า',
    fee: 'ค่าบริการของเรา (ส่วนแบ่งผลประหยัด)',
    saving_: 'พลังงานที่ประหยัดได้',
    chart: 'ผลตอบแทนสะสม (บาท)',
    empty: 'กรอกค่าไฟของระบบชิลเลอร์ต่อเดือน เพื่อดูการเปรียบเทียบ',
    negative:
      'ด้วยตัวเลขนี้ ค่าเช่าสูงกว่าผลประหยัด ระบบที่เล็กลง สัญญาที่ยาวขึ้น หรือ Cooling-as-a-Service อาจเหมาะกว่า',
    note: 'เป็นเพียงค่าประมาณการเพื่อเปรียบเทียบ ค่าบริการ ค่าเช่า และผลประหยัดที่รับประกัน จะกำหนดในข้อเสนอเป็นลายลักษณ์อักษรหลังการตรวจประเมินฟรี ผลประหยัดต้องผ่านการตรวจวัดและตรวจสอบที่หน้างาน และตกลงร่วมกันของทั้งสองฝ่าย',
    cta: 'ขอข้อเสนอ Cooling-as-a-Service',
    recommended: 'แนะนำ',
    atMinimum: `หากประหยัดได้เพียง ${MIN_GUARANTEE}% ตามที่รับประกัน`,
    caasBetter: (gap: string) =>
      `Cooling-as-a-Service ให้ผลตอบแทนมากกว่าการเช่า ${gap} ต่อปี โดยไม่มีค่าใช้จ่ายคงที่ และเรารับความเสี่ยงด้านผลประหยัด`,
    leaseBetter: (gap: string, caasMin: string, leaseMin: string) =>
      `หากประหยัดได้ตามที่คาดทั้งหมด การเช่าให้ผลตอบแทนมากกว่า ${gap} ต่อปี แต่ค่าเช่าคงที่ หากประหยัดได้เพียง ${MIN_GUARANTEE}% ตามที่รับประกัน คุณจะได้ ${caasMin} ต่อปีกับ Cooling-as-a-Service และ ${leaseMin} ต่อปีกับการเช่า`,
  },
};

const num = (value: string): number => {
  const parsed = Number(value.replace(/,/g, ''));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};
const baht = (value: number) => `฿${Math.round(value).toLocaleString('en-US')}`;

/** Yearly payment of a loan of `principal` at `ratePct` % a year over `years`. */
const annuity = (principal: number, ratePct: number, years: number): number => {
  const r = ratePct / 100;
  if (!principal || !years) return 0;
  return r === 0
    ? principal / years
    : (principal * r) / (1 - (1 + r) ** -years);
};

const inputClass =
  'w-full rounded-xl border border-sep-light bg-white px-4 py-3 text-base text-text-main focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue';

/** Line chart of cumulative benefit by year for both contracts. */
const Chart = (props: {
  title: string;
  caas: number[];
  lease: number[] | null;
  labels: [string, string];
}) => {
  const { title, caas, lease, labels } = props;
  const W = 560;
  const H = 220;
  const pad = { l: 64, r: 16, t: 16, b: 28 };
  const all = [0, ...caas, ...(lease ?? [])];
  const max = Math.max(...all);
  const min = Math.min(...all);
  const span = max - min || 1;
  const x = (i: number) => pad.l + (i / caas.length) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + ((max - v) / span) * (H - pad.t - pad.b);
  const line = (values: number[]) =>
    [0, ...values]
      .map(
        (v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`
      )
      .join(' ');
  return (
    <figure className="gap-y-2 flex flex-col">
      <figcaption className="text-sm font-semibold text-text-main">
        {title}
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label={title}
      >
        <line x1={pad.l} x2={W - pad.r} y1={y(0)} y2={y(0)} stroke="#CBD5E1" />
        <text
          x={pad.l - 8}
          y={y(max) + 4}
          textAnchor="end"
          fontSize="11"
          fill="#475569"
        >
          {baht(max)}
        </text>
        {min < 0 && (
          <text
            x={pad.l - 8}
            y={y(min) + 4}
            textAnchor="end"
            fontSize="11"
            fill="#475569"
          >
            {baht(min)}
          </text>
        )}
        <text
          x={pad.l - 8}
          y={y(0) + 4}
          textAnchor="end"
          fontSize="11"
          fill="#475569"
        >
          0
        </text>
        {caas.map((_, i) => (
          <text
            key={i}
            x={x(i + 1)}
            y={H - 8}
            textAnchor="middle"
            fontSize="11"
            fill="#475569"
          >
            {i + 1}
          </text>
        ))}
        <path d={line(caas)} fill="none" stroke="#059669" strokeWidth="3" />
        {lease && (
          <path
            d={line(lease)}
            fill="none"
            stroke="#0284C7"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
        )}
      </svg>
      <div className="gap-x-5 flex flex-row flex-wrap text-xs text-text-muted">
        <span className="gap-x-2 inline-flex items-center">
          <span className="inline-block w-5 h-[3px] bg-[#059669]" /> {labels[0]}
        </span>
        {lease && (
          <span className="gap-x-2 inline-flex items-center">
            <span className="inline-block w-5 border-t-[3px] border-dashed border-[#0284C7]" />{' '}
            {labels[1]}
          </span>
        )}
      </div>
    </figure>
  );
};

/** Compares Cooling-as-a-Service (shared savings) with a lease (cooling-contract-calculator page). */
const ContractCalculator = (props: { locale: Locale }) => {
  const { locale } = props;
  const t = TEXT[locale];
  const [v, setV] = useState({
    monthly: '',
    saving: '20',
    share: '50',
    term: '7',
    plantCost: '',
    rate: '',
  });
  const set = (key: keyof typeof v) => (value: string) =>
    setV((c) => ({ ...c, [key]: value }));

  const result = useMemo(() => {
    const annualCost = num(v.monthly) * 12;
    const saving = Math.min(num(v.saving), 90) / 100;
    const share = Math.min(num(v.share), 100) / 100;
    const years = Math.max(1, Math.min(Math.round(num(v.term)) || 7, 15));
    if (!annualCost || !saving) return null;
    const energySaved = annualCost * saving;
    const caasYear = energySaved * (1 - share);
    const leasePay = num(v.plantCost)
      ? annuity(num(v.plantCost), Number(v.rate) || 0, years)
      : 0;
    const leaseYear = leasePay ? energySaved - leasePay : null;
    const cumulative = (perYear: number) =>
      Array.from({ length: years }, (_, i) => perYear * (i + 1));
    const minSaved = annualCost * (MIN_GUARANTEE / 100);
    return {
      years,
      energySaved,
      caasMin: minSaved * (1 - share),
      leaseMin: leasePay ? minSaved - leasePay : null,
      fee: energySaved * share,
      caasYear,
      leasePay,
      leaseYear,
      caasSeries: cumulative(caasYear),
      leaseSeries: leaseYear === null ? null : cumulative(leaseYear),
    };
  }, [v]);

  const field = (key: keyof typeof v, label: string, hint?: string) => (
    <label className="gap-y-1.5 flex flex-col text-sm font-medium text-text-main">
      {label}
      <input
        className={inputClass}
        inputMode="decimal"
        value={v[key]}
        onChange={(e) => set(key)(e.target.value)}
        onBlur={() =>
          result && trackEvent('contract_calculator', { years: result.years })
        }
      />
      {hint && (
        <span className="text-xs font-normal text-text-muted">{hint}</span>
      )}
    </label>
  );

  return (
    <section className="py-10 lg:py-14 flex flex-col">
      <SafeArea>
        <div className="mx-auto w-full max-w-[1040px] card-premium p-6 lg:p-10 gap-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="gap-y-5 flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-wider text-title-light">
              {t.inputs}
            </span>
            {field('monthly', t.cooling)}
            {field('saving', t.saving, t.savingHint)}
            {field('term', t.term)}
            <span className="mt-2 text-sm font-semibold text-brand-green">
              {t.caas}
            </span>
            {field('share', t.share)}
            <span className="mt-2 text-sm font-semibold text-brand-blue">
              {t.lease}
            </span>
            {field('plantCost', t.plantCost)}
            {field('rate', t.rate)}
          </div>
          <div
            className="rounded-2xl bg-gradient-caas-soft p-6 gap-y-5 flex flex-col"
            aria-live="polite"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-title-light">
              {t.result}
            </span>
            {result ? (
              <>
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
                  <div className="rounded-xl bg-white p-4 gap-y-1 flex flex-col ring-2 ring-brand-green">
                    <span className="gap-x-2 flex flex-row flex-wrap items-center text-sm font-semibold text-brand-green">
                      {t.caas}
                      <span className="rounded-full bg-brand-green px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                        {t.recommended}
                      </span>
                    </span>
                    <span className="text-2xl font-semibold text-text-main">
                      {baht(result.caasYear)}
                    </span>
                    <span className="text-xs text-text-muted">
                      {t.perYear} · {baht(result.caasYear / 12)} {t.perMonth}
                    </span>
                    <span className="text-xs text-text-muted">
                      {t.total} {result.years} {t.years}:{' '}
                      {baht(result.caasYear * result.years)}
                    </span>
                    <span className="text-xs text-text-muted">
                      {t.fee}: {baht(result.fee)} / {t.perYear}
                    </span>
                    <span className="text-xs text-text-muted">
                      {t.atMinimum}: {baht(result.caasMin)} / {t.perYear}
                    </span>
                  </div>
                  <div className="rounded-xl bg-white p-4 gap-y-1 flex flex-col">
                    <span className="text-sm font-semibold text-brand-blue">
                      {t.lease}
                    </span>
                    {result.leaseYear === null ? (
                      <span className="text-sm text-text-muted">
                        {t.leaseHint}
                      </span>
                    ) : (
                      <>
                        <span className="text-2xl font-semibold text-text-main">
                          {baht(result.leaseYear)}
                        </span>
                        <span className="text-xs text-text-muted">
                          {t.perYear} · {baht(result.leaseYear / 12)}{' '}
                          {t.perMonth}
                        </span>
                        <span className="text-xs text-text-muted">
                          {t.total} {result.years} {t.years}:{' '}
                          {baht(result.leaseYear * result.years)}
                        </span>
                        <span className="text-xs text-text-muted">
                          {t.payment}: {baht(result.leasePay / 12)} /{' '}
                          {t.perMonth}
                        </span>
                        <span className="text-xs text-text-muted">
                          {t.atMinimum}: {baht(result.leaseMin ?? 0)} /{' '}
                          {t.perYear}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-sm text-text-muted">
                  {t.saving_}: {baht(result.energySaved)} / {t.perYear}
                </p>
                <Chart
                  title={t.chart}
                  caas={result.caasSeries}
                  lease={result.leaseSeries}
                  labels={[t.caas, t.lease]}
                />
                {result.leaseYear !== null && (
                  <p className="rounded-xl bg-white p-4 text-sm font-medium text-text-main">
                    {result.caasYear >= result.leaseYear
                      ? t.caasBetter(baht(result.caasYear - result.leaseYear))
                      : t.leaseBetter(
                          baht(result.leaseYear - result.caasYear),
                          baht(result.caasMin),
                          baht(result.leaseMin ?? 0)
                        )}
                  </p>
                )}
                {result.leaseYear !== null && result.leaseYear < 0 && (
                  <p className="text-sm text-text-main">{t.negative}</p>
                )}
                <p className="text-xs text-text-muted">{t.note}</p>
                <Link
                  className="btn-caas self-start"
                  to={paths.contact(locale)}
                >
                  {t.cta}
                </Link>
              </>
            ) : (
              <p className="text-base text-text-muted">{t.empty}</p>
            )}
          </div>
        </div>
      </SafeArea>
    </section>
  );
};

export default ContractCalculator;
