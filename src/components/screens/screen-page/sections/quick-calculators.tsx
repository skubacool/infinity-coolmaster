import { ReactNode, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Locale } from '../../../../models/_commons/localized';
import { paths } from '../../../../config/routes';
import { trackEvent } from '../../../../utils/analytics';
import SafeArea from '../../../_commons/safe-area';

/** TGO grid emission factor for electricity consumption, 2021 (announced 2022). */
export const TGO_GRID_FACTOR = 0.4857;

const num = (value: string): number => {
  const parsed = Number(value.replace(/,/g, ''));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};
const fmt = (value: number, digits = 0) =>
  value.toLocaleString('en-US', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });

const inputClass =
  'w-full rounded-xl border border-sep-light bg-white px-4 py-3 text-base text-text-main focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue';

const Field = (props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: ReactNode;
  onBlur?: () => void;
}) => (
  <label className="gap-y-1.5 flex flex-col text-sm font-medium text-text-main">
    {props.label}
    <input
      className={inputClass}
      inputMode="decimal"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      onBlur={props.onBlur}
    />
    {props.hint && (
      <span className="text-xs font-normal text-text-muted">{props.hint}</span>
    )}
  </label>
);

const Shell = (props: {
  inputs: ReactNode;
  result: ReactNode;
  inputsTitle: string;
  resultTitle: string;
}) => (
  <section className="py-10 lg:py-14 flex flex-col">
    <SafeArea>
      <div className="mx-auto w-full max-w-[960px] card-premium p-6 lg:p-10 gap-8 grid grid-cols-1 lg:grid-cols-2">
        <div className="gap-y-5 flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-wider text-title-light">
            {props.inputsTitle}
          </span>
          {props.inputs}
        </div>
        <div
          className="rounded-2xl bg-gradient-caas-soft p-6 gap-y-4 flex flex-col"
          aria-live="polite"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-title-light">
            {props.resultTitle}
          </span>
          {props.result}
        </div>
      </div>
    </SafeArea>
  </section>
);

const WAIT = {
  en: {
    inputs: 'Your plant',
    result: 'The cost of waiting',
    current: 'Current whole-plant kW/TR',
    currentHint: 'Not sure? Use the chiller efficiency check.',
    target: 'Target kW/TR',
    targetHint:
      'Default 0.75: inside the rough 0.6–0.8 band for a well-run modern water-cooled plant.',
    load: 'Average cooling load (TR)',
    hours: 'Operating hours per year',
    hoursHint: 'For example 8,760 for a plant running 24/7.',
    price: 'Average electricity price (THB per kWh, incl. Ft)',
    r22: 'The plant still runs on R-22 refrigerant',
    perMonth: 'extra electricity cost per month',
    perYear: 'per year',
    perDay: 'per day',
    kwh: 'extra kWh per year',
    r22Note:
      'R-22 is being phased out in Thailand, so recharging after a leak gets harder and more expensive every year.',
    r22Link: 'Read about the refrigerant phase-down',
    fine: 'Your plant is already at or better than the target. A full-year measurement will confirm it holds there.',
    empty: 'Enter your plant’s kW/TR, load, hours and electricity price.',
    note: 'Estimate only. Actual figures must be measured and verified on site and agreed by both parties.',
    cta: 'Stop the extra cost: request a free audit',
  },
  th: {
    inputs: 'ระบบของคุณ',
    result: 'ต้นทุนของการรอ',
    current: 'kW/TR ทั้งระบบในปัจจุบัน',
    currentHint: 'ไม่แน่ใจ? ใช้เครื่องมือตรวจประสิทธิภาพชิลเลอร์',
    target: 'kW/TR เป้าหมาย',
    targetHint:
      'ค่าเริ่มต้น 0.75 อยู่ในช่วงคร่าว ๆ 0.6–0.8 ของระบบระบายความร้อนด้วยน้ำสมัยใหม่ที่ดูแลดี',
    load: 'ภาระความเย็นเฉลี่ย (TR)',
    hours: 'ชั่วโมงทำงานต่อปี',
    hoursHint: 'เช่น 8,760 สำหรับระบบที่ทำงานตลอด 24 ชั่วโมง',
    price: 'ค่าไฟเฉลี่ย (บาทต่อหน่วย รวมค่า Ft)',
    r22: 'ระบบยังใช้สารทำความเย็น R-22',
    perMonth: 'ค่าไฟส่วนเกินต่อเดือน',
    perYear: 'ต่อปี',
    perDay: 'ต่อวัน',
    kwh: 'หน่วยไฟฟ้าส่วนเกินต่อปี',
    r22Note:
      'R-22 กำลังถูกยกเลิกในประเทศไทย การเติมสารหลังเกิดการรั่วจะยากและแพงขึ้นทุกปี',
    r22Link: 'อ่านเรื่องการลดใช้สารทำความเย็น',
    fine: 'ระบบของคุณดีเท่าหรือดีกว่าเป้าหมายแล้ว การวัดตลอดทั้งปีจะยืนยันว่ารักษาระดับนี้ได้',
    empty: 'กรอกค่า kW/TR ภาระความเย็น ชั่วโมงทำงาน และค่าไฟของระบบ',
    note: 'เป็นเพียงค่าประมาณการ ตัวเลขจริงต้องผ่านการตรวจวัดและตรวจสอบที่หน้างาน และตกลงร่วมกันของทั้งสองฝ่าย',
    cta: 'หยุดค่าใช้จ่ายส่วนเกิน ขอรับการตรวจประเมินฟรี',
  },
};

/** Monthly cost of running an inefficient plant (cost-of-waiting-calculator page). */
export const CostOfWaiting = (props: { locale: Locale }) => {
  const { locale } = props;
  const t = WAIT[locale];
  const [v, setV] = useState({
    current: '',
    target: '0.75',
    load: '',
    hours: '',
    price: '',
  });
  const [r22, setR22] = useState(false);
  const set = (key: keyof typeof v) => (value: string) =>
    setV((c) => ({ ...c, [key]: value }));

  const result = useMemo(() => {
    const current = num(v.current);
    const target = num(v.target);
    const load = num(v.load);
    const hours = Math.min(num(v.hours), 8784);
    const price = num(v.price);
    if (!current || !target || !load || !hours || !price) return null;
    const extraKwh = Math.max(0, current - target) * load * hours;
    const perYear = extraKwh * price;
    return { extraKwh, perYear, perMonth: perYear / 12, perDay: perYear / 365 };
  }, [v]);

  const blur = () =>
    result &&
    trackEvent('cost_of_waiting', {
      per_month_thb: Math.round(result.perMonth),
    });
  const article = `/${locale}/insights/refrigerant-phase-down-r22-kigali-thailand/`;

  return (
    <Shell
      inputsTitle={t.inputs}
      resultTitle={t.result}
      inputs={
        <>
          <Field
            label={t.current}
            value={v.current}
            onChange={set('current')}
            onBlur={blur}
            hint={
              <Link
                className="underline underline-offset-2"
                to={paths.page(locale, 'chiller-efficiency-check')}
              >
                {t.currentHint}
              </Link>
            }
          />
          <Field
            label={t.target}
            value={v.target}
            onChange={set('target')}
            hint={t.targetHint}
            onBlur={blur}
          />
          <Field
            label={t.load}
            value={v.load}
            onChange={set('load')}
            onBlur={blur}
          />
          <Field
            label={t.hours}
            value={v.hours}
            onChange={set('hours')}
            hint={t.hoursHint}
            onBlur={blur}
          />
          <Field
            label={t.price}
            value={v.price}
            onChange={set('price')}
            onBlur={blur}
          />
          <label className="gap-x-3 flex flex-row items-center text-sm text-text-main">
            <input
              type="checkbox"
              checked={r22}
              onChange={(e) => setR22(e.target.checked)}
              className="w-4 h-4"
            />
            {t.r22}
          </label>
        </>
      }
      result={
        result ? (
          <>
            {result.perYear > 0 ? (
              <>
                <div>
                  <span className="block text-5xl font-semibold text-text-main">
                    ฿{fmt(result.perMonth)}
                  </span>
                  <span className="text-sm text-text-muted">{t.perMonth}</span>
                </div>
                <dl className="gap-y-2 grid grid-cols-2 text-sm">
                  <dt className="text-text-muted">{t.perYear}</dt>
                  <dd className="text-text-main font-medium">
                    ฿{fmt(result.perYear)}
                  </dd>
                  <dt className="text-text-muted">{t.perDay}</dt>
                  <dd className="text-text-main font-medium">
                    ฿{fmt(result.perDay)}
                  </dd>
                  <dt className="text-text-muted">{t.kwh}</dt>
                  <dd className="text-text-main font-medium">
                    {fmt(result.extraKwh)}
                  </dd>
                </dl>
              </>
            ) : (
              <p className="text-base text-text-main">{t.fine}</p>
            )}
            {r22 && (
              <p className="text-sm text-text-main">
                {t.r22Note}{' '}
                <Link
                  className="text-brand-blue underline underline-offset-2"
                  to={article}
                >
                  {t.r22Link}
                </Link>
              </p>
            )}
            <p className="text-xs text-text-muted">{t.note}</p>
            <Link className="btn-caas self-start" to={paths.contact(locale)}>
              {t.cta}
            </Link>
          </>
        ) : (
          <p className="text-base text-text-muted">{t.empty}</p>
        )
      }
    />
  );
};

const CO2 = {
  en: {
    inputs: 'Your plant',
    result: 'Emissions avoided',
    kwh: 'Chiller plant electricity per year (kWh)',
    kwhHint:
      'From meters or bills; if you only know baht, divide by your average price per kWh.',
    saving: 'Expected energy saving (%)',
    years: 'Contract term (years)',
    factor: 'Grid emission factor (tCO₂/MWh)',
    factorHint:
      'Default: TGO grid factor for electricity consumption, 2021. Use the factor your report requires.',
    perYear: 'tonnes CO₂ avoided per year',
    overTerm: 'over the contract term',
    saved: 'energy saved per year',
    empty: 'Enter your chiller plant’s annual electricity use.',
    note: 'Estimate only, for planning. Reported figures must come from measured, verified savings and the emission factor your verifier accepts.',
    cta: 'Get measured savings for your ESG report',
  },
  th: {
    inputs: 'ระบบของคุณ',
    result: 'ปริมาณการปล่อยที่ลดได้',
    kwh: 'การใช้ไฟฟ้าต่อปีของระบบชิลเลอร์ (kWh)',
    kwhHint:
      'จากมิเตอร์หรือบิลค่าไฟ หากทราบเป็นบาท ให้หารด้วยค่าไฟเฉลี่ยต่อหน่วย',
    saving: 'ผลประหยัดพลังงานที่คาด (%)',
    years: 'ระยะเวลาสัญญา (ปี)',
    factor: 'ค่าการปล่อยก๊าซเรือนกระจกของระบบไฟฟ้า (tCO₂/MWh)',
    factorHint:
      'ค่าเริ่มต้น: ค่าของ อบก. สำหรับการใช้ไฟฟ้า ปี 2564 ควรใช้ค่าที่รายงานของคุณกำหนด',
    perYear: 'ตัน CO₂ ที่ลดได้ต่อปี',
    overTerm: 'ตลอดอายุสัญญา',
    saved: 'พลังงานที่ประหยัดได้ต่อปี',
    empty: 'กรอกการใช้ไฟฟ้าต่อปีของระบบชิลเลอร์',
    note: 'เป็นเพียงค่าประมาณการเพื่อวางแผน ตัวเลขที่รายงานต้องมาจากผลประหยัดที่ตรวจวัดและพิสูจน์แล้ว และค่าการปล่อยที่ผู้ทวนสอบยอมรับ',
    cta: 'รับผลประหยัดที่ตรวจวัดได้สำหรับรายงาน ESG',
  },
};

/** kWh saved -> tonnes CO2 avoided (carbon-calculator page). */
export const CarbonCalculator = (props: { locale: Locale }) => {
  const { locale } = props;
  const t = CO2[locale];
  const [v, setV] = useState({
    kwh: '',
    saving: '20',
    years: '7',
    factor: String(TGO_GRID_FACTOR),
  });
  const set = (key: keyof typeof v) => (value: string) =>
    setV((c) => ({ ...c, [key]: value }));

  const result = useMemo(() => {
    const kwh = num(v.kwh);
    const saving = Math.min(num(v.saving), 90) / 100;
    const factor = num(v.factor);
    const years = Math.round(num(v.years)) || 1;
    if (!kwh || !saving || !factor) return null;
    const savedKwh = kwh * saving;
    const tonnes = (savedKwh / 1000) * factor;
    return { savedKwh, tonnes, overTerm: tonnes * years, years };
  }, [v]);

  const blur = () =>
    result &&
    trackEvent('carbon_calculator', {
      tco2_per_year: Math.round(result.tonnes),
    });

  return (
    <Shell
      inputsTitle={t.inputs}
      resultTitle={t.result}
      inputs={
        <>
          <Field
            label={t.kwh}
            value={v.kwh}
            onChange={set('kwh')}
            hint={t.kwhHint}
            onBlur={blur}
          />
          <Field
            label={t.saving}
            value={v.saving}
            onChange={set('saving')}
            onBlur={blur}
          />
          <Field
            label={t.years}
            value={v.years}
            onChange={set('years')}
            onBlur={blur}
          />
          <Field
            label={t.factor}
            value={v.factor}
            onChange={set('factor')}
            hint={t.factorHint}
            onBlur={blur}
          />
        </>
      }
      result={
        result ? (
          <>
            <div>
              <span className="block text-5xl font-semibold text-brand-green">
                {fmt(result.tonnes, 1)}
              </span>
              <span className="text-sm text-text-muted">{t.perYear}</span>
            </div>
            <dl className="gap-y-2 grid grid-cols-2 text-sm">
              <dt className="text-text-muted">{t.overTerm}</dt>
              <dd className="text-text-main font-medium">
                {fmt(result.overTerm, 1)} tCO₂
              </dd>
              <dt className="text-text-muted">{t.saved}</dt>
              <dd className="text-text-main font-medium">
                {fmt(result.savedKwh)} kWh
              </dd>
            </dl>
            <p className="text-xs text-text-muted">{t.note}</p>
            <Link className="btn-caas self-start" to={paths.contact(locale)}>
              {t.cta}
            </Link>
          </>
        ) : (
          <p className="text-base text-text-muted">{t.empty}</p>
        )
      }
    />
  );
};
