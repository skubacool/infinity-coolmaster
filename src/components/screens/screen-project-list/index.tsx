import { useEffect, useMemo } from 'react';

import { l } from '../../../utils/localization-utils';
import { useVmScreen } from '../../../stores/vm-screen';
import { useVmScreenProjectList } from '../../../stores/vm-screen-project-list';
import LayoutBanner from '../../layouts/layout-banner';
import ProjectBannerRow from '../../_commons/project-banner-row';
import SafeArea from '../../_commons/safe-area';
import ProjectGrid from '../../_commons/project-grid';
import TextLines from '../../_commons/text-lines';
import Loading from '../../_commons/loading';

const ScreenProjectList = () => {
  const { locale = 'en', localizations = [] } = useVmScreen();

  const vmScreenProjectList = useVmScreenProjectList();
  const { loading, projects = [], projectSummary } = vmScreenProjectList;

  useEffect(() => {
    if (!vmScreenProjectList.bind) return;
    vmScreenProjectList.bind();
  }, [vmScreenProjectList]);

  const banner = useMemo(() => {
    return (
      <div className="flex-1 bg-gradient-hero flex flex-col justify-start items-stretch">
        {projectSummary ? (
          <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center">
            <div className="gap-y-10 lg:gap-y-12 px-6 flex flex-col justify-center items-center">
              <div className="gap-y-4 flex flex-col justify-start items-center">
                <h1 className="hidden lg:block text-center text-text-main text-8xl font-semibold">
                  {l(locale, localizations, 'project-list.title-projects')}
                </h1>
                <h1 className="lg:hidden text-center text-text-main text-6xl font-semibold !leading-[1.1]">
                  <TextLines
                    text={l(
                      locale,
                      localizations,
                      'project-list.sm:title-projects'
                    )}
                  />
                </h1>
                <p className="max-w-[640px] text-center text-text-muted text-base lg:text-lg">
                  {l(locale, localizations, 'project-list.excerpt-projects')}
                </p>
              </div>
              <div className="gap-y-12 lg:gap-y-0 lg:gap-x-16 flex flex-col lg:flex-row justify-center items-center">
                <ProjectBannerRow
                  title={l(locale, localizations, 'project-list.no-of-sites')}
                  value={`${projectSummary.totalProjects}`}
                />
                <div className="hidden lg:block w-px h-full max-h-16 bg-sep-smoke" />
                <ProjectBannerRow
                  title={l(
                    locale,
                    localizations,
                    'project-list.total-capacities'
                  )}
                  value={`${projectSummary.totalCapacityTr.toLocaleString()} ${l(locale, localizations, 'general.tr')}`}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center items-center">
            <Loading />
          </div>
        )}
      </div>
    );
  }, [locale, localizations, projectSummary]);

  return (
    <LayoutBanner banner={banner}>
      <div className="py-12 lg:py-20 bg-bg-soft flex flex-col justify-start items-stretch">
        <SafeArea>
          <div className="gap-y-10 lg:gap-y-14 flex flex-col justify-start items-stretch">
            {!loading ? (
              <ProjectGrid locale={locale} projects={projects} />
            ) : (
              <Loading />
            )}
          </div>
        </SafeArea>
      </div>
    </LayoutBanner>
  );
};

export default ScreenProjectList;
