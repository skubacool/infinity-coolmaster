import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { l } from '../../../utils/localization-utils';
import { paths, projectSlug } from '../../../config/routes';
import { useVmScreen } from '../../../stores/vm-screen';
import { useVmScreenProject } from '../../../stores/vm-screen-project';
import LayoutStandard from '../../layouts/layout-standard';
import SectionBanner from './sections/section-banner';
import SectionDetails from './sections/section-details';
import SectionNext from '../../sections/section-next';
import ScreenNotFound from '../screen-not-found';
import SafeArea from '../../_commons/safe-area';
import { SECTOR_PAGE_BY_KEY, siteMeta } from '../../../seo/pages';

const ScreenProject = () => {
  const { slug = '' } = useParams();

  const { locale = 'en', localizations = [] } = useVmScreen();

  const vmScreenProject = useVmScreenProject();
  const { project, nextProject, loading, resolved } = vmScreenProject;

  useEffect(() => {
    if (!vmScreenProject.bind) return;
    vmScreenProject.bind(slug);
  }, [slug, vmScreenProject]);

  if (!project && resolved === slug && !loading) return <ScreenNotFound />;
  // Old numeric links (/case-studies/1/) move to the descriptive URL.
  if (project && projectSlug(project) !== slug) {
    return <Navigate to={paths.caseStudy(locale, project)} replace />;
  }

  return (
    <LayoutStandard>
      <div className="flex flex-col justify-start items-stretch">
        <SectionBanner />
        <SectionDetails />
        {project && SECTOR_PAGE_BY_KEY[project.sector] && (
          <div className="pb-10 flex flex-col">
            <SafeArea>
              <Link
                className="text-base lg:text-lg font-medium text-brand-blue-ink underline underline-offset-4"
                to={paths.page(locale, SECTOR_PAGE_BY_KEY[project.sector])}
              >
                {siteMeta(locale).sectorLinkLabel}:{' '}
                {
                  siteMeta(locale).pages[SECTOR_PAGE_BY_KEY[project.sector]]
                    .label
                }
              </Link>
            </SafeArea>
          </div>
        )}
        {nextProject && (
          <SectionNext
            url={paths.caseStudy(locale, nextProject)}
            text={l(locale, localizations, 'project.next-project')}
          />
        )}
      </div>
    </LayoutStandard>
  );
};

export default ScreenProject;
