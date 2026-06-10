import { useMemo } from 'react';

import { l } from '../../../../../utils/localization-utils';
import { useVmScreen } from '../../../../../stores/vm-screen';
import { useVmScreenFront } from '../../../../../stores/vm-screen-front';
import TextLines from '../../../../_commons/text-lines';
import Icon from '../../../../_commons/icon';

/** Verified portfolio impact — stats with gradient accents on white. */
const SectionImpact = () => {
  const { locale = 'en', localizations = [] } = useVmScreen();

  const { projectSummary } = useVmScreenFront();
  const {
    totalProjects = 0,
    totalCapacityTr = 0,
    totalEnergySavedGwh = 0,
    avgSavingsPct = 0,
  } = projectSummary ?? {};

  const totalCapacityText = useMemo(
    () => totalCapacityTr.toLocaleString(),
    [totalCapacityTr]
  );

  const localizedExcerptImpact = useMemo(() => {
    const excerpt = l(locale, localizations, 'front.excerpt-impact') ?? '';
    return excerpt
      .replace(/\{\{total-projects}}/g, `${totalProjects}`)
      .replace(/\{\{total-capabilities}}/g, totalCapacityText);
  }, [locale, localizations, totalProjects, totalCapacityText]);

  const stats = useMemo(
    () => [
      {
        key: 'sites',
        value: `${totalProjects}`,
        label: l(locale, localizations, 'general.active-sites'),
      },
      {
        key: 'capacity',
        value: totalCapacityText,
        label: l(locale, localizations, 'general.total-capacities'),
      },
      {
        key: 'energy',
        value: totalEnergySavedGwh.toFixed(1),
        label: l(locale, localizations, 'general.gwh-saved'),
      },
      {
        key: 'savings',
        value: `${avgSavingsPct.toFixed(0)}%`,
        label: l(locale, localizations, 'general.avg-savings'),
      },
    ],
    [
      locale,
      localizations,
      totalProjects,
      totalCapacityText,
      totalEnergySavedGwh,
      avgSavingsPct,
    ]
  );

  return (
    <section className="py-16 lg:pt-[140px] lg:pb-[120px] bg-bg-base flex flex-col justify-start items-stretch">
      <div className="gap-y-10 lg:gap-y-[100px] w-full max-w-[1328px] px-6 mx-auto flex flex-col justify-start items-stretch">
        <div className="gap-y-16 lg:gap-y-0 lg:gap-x-20 flex flex-col lg:flex-row justify-start items-stretch">
          <div className="lg:flex-1 lg:flex-shrink-0 flex flex-col justify-start items-stretch">
            <div className="gap-y-6 lg:gap-y-8 flex flex-col justify-start items-start">
              <span className="kicker">
                {l(locale, localizations, 'front.title-impact')}
              </span>
              <h6 className="text-4xl lg:text-5xl font-semibold leading-[1.2] text-text-main">
                <TextLines
                  text={l(locale, localizations, 'front.cta-impact')}
                />
              </h6>
              <p className="text-lg text-text-muted">
                {localizedExcerptImpact}
              </p>
            </div>
          </div>
          <div className="lg:flex-1 lg:flex-shrink-0 flex flex-col justify-center items-stretch">
            {projectSummary && (
              <div className="gap-x-8 gap-y-12 grid grid-cols-2">
                {stats.map((stat) => (
                  <div
                    key={stat.key}
                    className="gap-y-3 flex flex-col justify-start items-start"
                  >
                    <div className="w-12 h-1 rounded-full bg-gradient-caas" />
                    <span className="block text-5xl lg:text-7xl font-semibold text-text-main">
                      {stat.value}
                    </span>
                    <span className="block text-sm lg:text-base text-text-muted uppercase tracking-wide">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <span className="gap-x-3 inline-flex flex-row justify-center items-center text-lg lg:text-2xl font-semibold text-gradient-caas text-center">
          {l(locale, localizations, 'front.more-to-come')}
        </span>
      </div>
    </section>
  );
};

export default SectionImpact;
