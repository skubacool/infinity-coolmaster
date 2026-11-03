import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { l } from '../../../utils/localization-utils';
import { paths, projectSlug } from '../../../config/routes';
import { useVmScreen } from '../../../stores/vm-screen';
import { useVmScreenProject } from '../../../stores/vm-screen-project';
import LayoutStandard from '../../layouts/layout-standard';
import SectionBanner from './sections/section-banner';
import SectionDetails from './sections/section-details';
import SectionNext from '../../sections/section-next';
import ScreenNotFound from '../screen-not-found';

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
