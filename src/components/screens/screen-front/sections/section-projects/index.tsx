import { Link } from 'react-router-dom';

import { l } from '../../../../../utils/localization-utils';
import { useVmScreen } from '../../../../../stores/vm-screen';
import { useVmScreenFront } from '../../../../../stores/vm-screen-front';
import SafeArea from '../../../../_commons/safe-area';
import ProjectGrid from '../../../../_commons/project-grid';
import Icon from '../../../../_commons/icon';

const SectionProjects = () => {
  const { locale = 'en', localizations = [] } = useVmScreen();
  const { projects = [], projectSummary } = useVmScreenFront();

  return (
    <section className="py-12 lg:py-20 bg-bg-soft flex flex-col justify-start items-stretch">
      <SafeArea>
        <div className="gap-y-10 lg:gap-y-14 flex flex-col justify-start items-stretch">
          <h2 className="text-center text-text-main text-2xl lg:text-4hxl font-semibold">
            {l(locale, localizations, 'front.title-projects')}
          </h2>
          <ProjectGrid locale={locale} projects={projects} />
          <div className="flex flex-row justify-center items-center">
            <Link to={`/${locale}/project`}>
              <span className="btn-navy">
                {l(locale, localizations, 'front.all-projects')} (
                {projectSummary?.totalProjects ?? 0})
                <Icon name="arrow-right" size={18} />
              </span>
            </Link>
          </div>
        </div>
      </SafeArea>
    </section>
  );
};

export default SectionProjects;
