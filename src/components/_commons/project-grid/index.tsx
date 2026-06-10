import { PropsWithChildren } from 'react';

import { Locale } from '../../../models/_commons/localized';
import { Project } from '../../../models/project';
import ProjectBox from '../project-box';

export interface ProjectGridProps {
  locale?: Locale;
  projects: Project[];
}

const ProjectGrid = (props: PropsWithChildren<ProjectGridProps>) => {
  const { locale = 'en', projects } = props;

  return (
    <ul className="gap-x-0 lg:gap-x-8 gap-y-10 grid grid-cols-1 lg:grid-cols-3">
      {projects.map((project) => {
        const { id } = project;
        return (
          <li key={id}>
            <ProjectBox locale={locale} project={project} />
          </li>
        );
      })}
    </ul>
  );
};

export default ProjectGrid;
