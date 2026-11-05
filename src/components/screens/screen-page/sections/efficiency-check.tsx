import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Locale } from '../../../../models/_commons/localized';
import { paths } from '../../../../config/routes';
import { trackEvent } from '../../../../utils/analytics';
import SafeArea from '../../../_commons/safe-area';

/** kW of heat removed per TR (12,000 BTU/h). */
const KW_PER_TR = 3.517;
/** kW of heat per (m³/h × K) of water. */
const WATER_KW_PER_M3H_K = 1.163;

const TEXT = {
  en: {
    power: 'Electrical power (kW)',
    chillers: 'Chillers',
    chwPumps: 'Chilled-water pumps',
    cwPumps: 'Condenser-water pumps',
    towers: 'Cooling-tower fans',
    cooling: 'Cooling output',
    byTr: 'I know the cooling load in TR',
    byFlow: 'I know the flow and temperatures',
    tr: 'Cooling load (TR)',
    flow: 'Chilled-water flow (m³/h)',
    supply: 'Supply temperature (°C)',
    ret: 'Return temperature (°C)',
    result: 'Your result',
    plant: 'Whole-plant kW/TR',
    chillerOnly: 'Chillers only kW/TR',
    cop: 'Whole-plant COP',
    load: 'Cooling load',
    empty: 'Enter the chiller power and the cooling output to see your result.',
    bands: {
      good: 'About 0.6–0.8 kW/TR or better: a well-designed, well-controlled plant. A full-year average will tell you if it stays there.',
      fair: 'About 0.8–1.0 kW/TR: reasonable, usually with room to improve.',
      poor: 'Above 1.0 kW/TR: typical of older or poorly controlled plants, often with large savings potential.',
    },
    note: 'A single reading is a snapshot. Rough bands for water-cooled plants, not a standard.',
    cta: 'Request a free cooling audit',
  },
  th: {
    power: 'กำลังไฟฟ้า (kW)',
    chillers: 'ชิลเลอร์',
    chwPumps: 'ปั๊มน้ำเย็น',
    cwPumps: 'ปั๊มน้ำระบายความร้อน',
    towers: 'พัดลมคูลลิ่งทาวเวอร์',
    cooling: 'ความเย็นที่ผลิตได้',
    byTr: 'ทราบภาระความเย็นเป็น TR',
    byFlow: 'ทราบอัตราการไหลและอุณหภูมิ',
    tr: 'ภาระความเย็น (TR)',
    flow: 'อัตราการไหลน้ำเย็น (m³/h)',
    supply: 'อุณหภูมิน้ำจ่าย (°C)',
    ret: 'อุณหภูมิน้ำกลับ (°C)',
    result: 'ผลของคุณ',
    plant: 'kW/TR ทั้งระบบ',
    chillerOnly: 'kW/TR เฉพาะชิลเลอร์',
    cop: 'COP ทั้งระบบ',
    load: 'ภาระความเย็น',
    empty: 'กรอกกำลังไฟฟ้าของชิลเลอร์และความเย็นที่ผลิตได้ เพื่อดูผล',
    bands: {
      good: 'ประมาณ 0.6–0.8 kW/TR หรือดีกว่า: ระบบที่ออกแบบและควบคุมดี ค่าเฉลี่ยทั้งปีจะบอกได้ว่ารักษาระดับนี้ได้หรือไม่',
      fair: 'ประมาณ 0.8–1.0 kW/TR: พอใช้ มักยังปรับปรุงได้',
      poor: 'สูงกว่า 1.0 kW/TR: พบบ่อยในระบบเก่าหรือควบคุมไม่ดี มักมีศักยภาพประหยัดสูง',
    },
    note: 'ค่าที่อ่านครั้งเดียวคือภาพ ณ ขณะนั้น เกณฑ์เป็นช่วงคร่าว ๆ สำหรับระบบระบายความร้อนด้วยน้ำ ไม่ใช่มาตรฐาน',
    cta: 'ขอรับการตรวจประเมินระบบทำความเย็นฟรี',
  },
};

const num = (value: string): number => {
  const parsed = Number(value.replace(/,/g, ''));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

const inputClass =
  'w-full rounded-xl border border-sep-light bg-white px-4 py-3 text-base text-text-main focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue';

/** Whole-plant kW/TR calculator (chiller-efficiency-check page). */
const EfficiencyCheck = (props: { locale: Locale }) => {
  const { locale } = props;
  const t = TEXT[locale];
  const [values, setValues] = useState({
    chillers: '',
    chwPumps: '',
    cwPumps: '',
    towers: '',
    tr: '',
    flow: '',
    supply: '',
    ret: '',
  });
  const [mode, setMode] = useState<'tr' | 'flow'>('tr');
  const set = (key: keyof typeof values) => (value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  const result = useMemo(() => {
    const chillerKw = num(values.chillers);
    const totalKw =
      chillerKw +
      num(values.chwPumps) +
      num(values.cwPumps) +
      num(values.towers);
    const deltaT = num(values.ret) - num(values.supply);
    const tr =
      mode === 'tr'
        ? num(values.tr)
        : deltaT > 0
          ? (num(values.flow) * deltaT * WATER_KW_PER_M3H_K) / KW_PER_TR
          : 0;
    if (!chillerKw || !tr) return null;
    const plant = totalKw / tr;
    return {
      tr,
      plant,
      chillerOnly: chillerKw / tr,
      cop: KW_PER_TR / plant,
      band: plant <= 0.8 ? 'good' : plant <= 1.0 ? 'fair' : 'poor',
    } as const;
  }, [values, mode]);

  const field = (key: keyof typeof values, label: string) => (
    <label className="gap-y-1.5 flex flex-col text-sm font-medium text-text-main">
      {label}
      <input
        className={inputClass}
        inputMode="decimal"
        value={values[key]}
        onChange={(event) => set(key)(event.target.value)}
        onBlur={() =>
          result &&
          trackEvent('efficiency_check', {
            kw_per_tr: Number(result.plant.toFixed(2)),
          })
        }
      />
    </label>
  );

  const bandColor =
    result?.band === 'good'
      ? 'text-brand-green'
      : result?.band === 'fair'
        ? 'text-brand-blue'
        : 'text-text-main';

  return (
    <section className="py-10 lg:py-14 flex flex-col">
      <SafeArea>
        <div className="mx-auto w-full max-w-[960px] card-premium p-6 lg:p-10 gap-8 grid grid-cols-1 lg:grid-cols-2">
          <div className="gap-y-5 flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-wider text-title-light">
              {t.power}
            </span>
            {field('chillers', t.chillers)}
            {field('chwPumps', t.chwPumps)}
            {field('cwPumps', t.cwPumps)}
            {field('towers', t.towers)}
            <span className="mt-2 text-sm font-semibold uppercase tracking-wider text-title-light">
              {t.cooling}
            </span>
            <div className="gap-2 flex flex-row flex-wrap">
              {(['tr', 'flow'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMode(option)}
                  className={`rounded-full border px-4 py-2 text-sm ${
                    mode === option
                      ? 'border-brand-blue text-brand-blue font-semibold'
                      : 'border-sep-light text-text-muted'
                  }`}
                >
                  {option === 'tr' ? t.byTr : t.byFlow}
                </button>
              ))}
            </div>
            {mode === 'tr' ? (
              field('tr', t.tr)
            ) : (
              <>
                {field('flow', t.flow)}
                <div className="gap-4 grid grid-cols-2">
                  {field('supply', t.supply)}
                  {field('ret', t.ret)}
                </div>
              </>
            )}
          </div>
          <div
            className="rounded-2xl bg-gradient-caas-soft p-6 gap-y-4 flex flex-col"
            aria-live="polite"
          >
            <span className="text-sm font-semibold uppercase tracking-wider text-title-light">
              {t.result}
            </span>
            {result ? (
              <>
                <div>
                  <span className={`block text-5xl font-semibold ${bandColor}`}>
                    {result.plant.toFixed(2)}
                  </span>
                  <span className="text-sm text-text-muted">{t.plant}</span>
                </div>
                <dl className="gap-y-2 grid grid-cols-2 text-sm">
                  <dt className="text-text-muted">{t.chillerOnly}</dt>
                  <dd className="text-text-main font-medium">
                    {result.chillerOnly.toFixed(2)}
                  </dd>
                  <dt className="text-text-muted">{t.cop}</dt>
                  <dd className="text-text-main font-medium">
                    {result.cop.toFixed(1)}
                  </dd>
                  <dt className="text-text-muted">{t.load}</dt>
                  <dd className="text-text-main font-medium">
                    {Math.round(result.tr).toLocaleString('en-US')} TR
                  </dd>
                </dl>
                <p className="text-base text-text-main">
                  {t.bands[result.band]}
                </p>
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

export default EfficiencyCheck;
