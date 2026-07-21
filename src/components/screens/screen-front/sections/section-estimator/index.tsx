import { useMemo, useState } from 'react';

import { l } from '../../../../../utils/localization-utils';
import { useVmScreen } from '../../../../../stores/vm-screen';
import { useVmScreenFront } from '../../../../../stores/vm-screen-front';
import SafeArea from '../../../../_commons/safe-area';
import Icon from '../../../../_commons/icon';

/**
 * Savings estimator — a lightweight lead magnet.
 *
 * The visitor enters their monthly electricity bill and facility type and sees
 * an estimated annual-savings RANGE. The percentages are deliberately
 * conservative and expressed as a share of the TOTAL electricity bill:
 * cooling is typically ~40–55% of a facility's electricity, and we save
 * ~10–35% of the cooling load, so savings land at roughly 8–18% of the total
 * bill. We show a range (never a single false-precision figure) and frame it
 * as an estimate a free audit confirms — credibility matters more than a big
 * number to a B2B buyer.
 */
const SAVINGS_LOW = 0.08;
const SAVINGS_HIGH = 0.18;

const inputClass =
  'w-full rounded-xl border border-sep-light bg-white px-4 py-3 text-base text-text-main placeholder:text-title-pale focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue';

const formatThb = (value: number): string =>
  '฿' + Math.round(value).toLocaleString('en-US');

const SectionEstimator = () => {
  const { locale = 'en', localizations = [] } = useVmScreen();
  const { sectors = [] } = useVmScreenFront();

  const [bill, setBill] = useState('');
  const [industry, setIndustry] = useState('');

  const t = (key: string) => l(locale, localizations, key);

  const result = useMemo(() => {
    const monthly = Number(bill.replace(/[^0-9.]/g, ''));
    if (!monthly || monthly <= 0) return null;
    const annual = monthly * 12;
    return {
      low: annual * SAVINGS_LOW,
      high: annual * SAVINGS_HIGH,
    };
  }, [bill]);

  return (
    <section className="py-16 lg:py-24 bg-bg-base flex flex-col justify-start items-stretch">
      <SafeArea>
        <div className="mx-auto w-full max-w-[960px] card-premium overflow-hidden bg-gradient-caas-soft flex flex-col lg:flex-row justify-start items-stretch">
          {/* Left: intro + inputs */}
          <div className="flex-1 p-7 lg:p-10 gap-y-5 flex flex-col justify-center items-stretch">
            <div className="gap-y-2 flex flex-col">
              <span className="kicker">
                <Icon name="chart" size={14} />
                {t('estimator.kicker')}
              </span>
              <h2 className="text-2xl lg:text-3hxl font-semibold tracking-tight text-text-main">
                {t('front.title-estimator')}
              </h2>
              <p className="text-sm lg:text-base text-text-muted">
                {t('front.excerpt-estimator')}
              </p>
            </div>
            <label className="gap-y-1.5 flex flex-col">
              <span className="text-sm font-medium text-text-muted">
                {t('estimator.bill-label')}
              </span>
              <input
                className={inputClass}
                type="text"
                inputMode="numeric"
                placeholder={t('estimator.bill-placeholder')}
                value={bill}
                onChange={(e) => setBill(e.target.value)}
              />
            </label>
            <label className="gap-y-1.5 flex flex-col">
              <span className="text-sm font-medium text-text-muted">
                {t('estimator.sector-label')}
              </span>
              <select
                className={inputClass}
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="">{t('form.select-placeholder')}</option>
                {sectors.map((sector) => (
                  <option key={sector.key} value={sector.key}>
                    {sector.title[locale]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Right: result */}
          <div className="flex-1 p-7 lg:p-10 bg-white border-t lg:border-t-0 lg:border-l border-sep-pale flex flex-col justify-center items-stretch">
            {result ? (
              <div className="gap-y-3 flex flex-col justify-center items-start">
                <span className="text-sm font-medium text-text-muted uppercase tracking-wider">
                  {t('estimator.result-label')}
                </span>
                <span className="text-3xl lg:text-5xl font-semibold tracking-tight text-gradient-caas leading-tight">
                  {formatThb(result.low)} – {formatThb(result.high)}
                </span>
                <span className="text-sm text-text-muted">
                  {t('estimator.result-per-year')}
                </span>
                <p className="mt-2 text-xs text-title-pale leading-relaxed">
                  {t('estimator.result-note')}
                </p>
                <button
                  className="btn-caas mt-3"
                  onClick={() =>
                    document
                      .getElementById('contact')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  {t('estimator.cta')}
                  <Icon name="arrow-right" size={18} />
                </button>
              </div>
            ) : (
              <div className="gap-y-3 flex flex-col justify-center items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-caas-soft border border-sep-pale flex flex-col justify-center items-center text-brand-green">
                  <Icon name="bolt" size={28} />
                </div>
                <p className="text-sm text-text-muted max-w-[260px]">
                  {t('estimator.empty')}
                </p>
              </div>
            )}
          </div>
        </div>
      </SafeArea>
    </section>
  );
};

export default SectionEstimator;
