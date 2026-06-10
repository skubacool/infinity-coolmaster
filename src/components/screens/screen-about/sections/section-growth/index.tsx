import { useMemo } from 'react';

import { l } from '../../../../../utils/localization-utils';
import { useVmScreen } from '../../../../../stores/vm-screen';
import { useVmScreenAbout } from '../../../../../stores/vm-screen-about';
import StatRow, { StatRowTheme } from '../../../../_commons/stat-row';
import StatBox, { StatBoxTheme } from '../../../../_commons/stat-box';

const SectionGrowth = () => {
  const { locale = 'en', localizations = [] } = useVmScreen();

  const { projectSummary } = useVmScreenAbout();
  const { totalProjects, totalCapacityTr } = projectSummary ?? {};

  const totalCapacityText = useMemo(
    () => (totalCapacityTr ?? 0).toLocaleString(),
    [totalCapacityTr]
  );

  if (!projectSummary) return null;
  return (
    <section className="bg-bg-soft py-20 flex flex-col justify-start items-stretch">
      <div className="w-full max-w-[1328px] gap-y-12 px-6 mx-auto flex flex-col justify-start items-stretch">
        <h2 className="text-text-main font-semibold text-2xl lg:text-4hxl text-center">
          {l(locale, localizations, 'about.title-impact')}
        </h2>
        <div className="gap-y-16 lg:gap-y-0 lg:gap-x-4 flex flex-col lg:flex-row justify-start items-stretch">
          <div className="gap-y-16 lg:gap-y-20 flex-1 flex-shrink-0 flex flex-col justify-start items-center">
            <ul className="gap-y-16 lg:gap-y-0 mx-auto w-full max-w-[656px] flex flex-col lg:flex-row justify-start lg:justify-between items-center lg:items-start">
              <li>
                <StatBox
                  icon="pin"
                  value={`${totalProjects}`}
                  title={l(locale, localizations, 'general.active-sites')}
                  theme={StatBoxTheme.secondary}
                />
              </li>
              <li>
                <StatBox
                  icon="snowflake"
                  value={totalCapacityText}
                  title={l(locale, localizations, 'general.total-capacities')}
                  theme={StatBoxTheme.primary}
                />
              </li>
            </ul>
          </div>
          <div className="flex-1 flex-shrink-0 flex flex-col justify-center items-center">
            <ul className="mx-auto w-full max-w-[340px] lg:max-w-[528px] gap-y-12 flex flex-col justify-start items-stretch">
              <li>
                <StatRow
                  theme={StatRowTheme.secondary}
                  icon="growth"
                  value={l(locale, localizations, 'about.qty-success-rate')}
                  title={l(locale, localizations, 'about.title-success-rate')}
                  excerpt={l(
                    locale,
                    localizations,
                    'about.excerpt-success-rate'
                  )}
                />
              </li>
              <li>
                <StatRow
                  theme={StatRowTheme.primary}
                  icon="medal"
                  value={l(locale, localizations, 'about.qty-experience')}
                  title={l(locale, localizations, 'about.title-experience')}
                  excerpt={l(locale, localizations, 'about.excerpt-experience')}
                />
              </li>
              <li>
                <StatRow
                  theme={StatRowTheme.secondary}
                  icon="uptime"
                  value={l(locale, localizations, 'about.qty-output')}
                  title={l(locale, localizations, 'about.title-output')}
                  excerpt={l(locale, localizations, 'about.excerpt-output')}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionGrowth;
