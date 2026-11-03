import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';

import { seededAtom } from '../../lib/seed';

import { Project } from '../../models/project';
import { ProjectSummary } from '../../models/project-summary';
import { listProjects, findProjectSummary } from '../../apis/project';

const loadingState = atom<boolean>(false);
const projectsState = seededAtom<Project[]>('projectList.projects', []);
const projectSummaryState = seededAtom<ProjectSummary | null>(
  'projectList.projectSummary',
  null
);

export interface IVmScreenProjectList {
  // Observables
  loading?: boolean;
  projects?: Project[];
  projectSummary?: ProjectSummary | null;
  // Actions
  bind?: () => void;
}

const store: IVmScreenProjectList = {};

export const useVmScreenProjectList = (): IVmScreenProjectList => {
  const [loading, setLoading] = useAtom(loadingState);
  const [projects, setProjects] = useAtom(projectsState);
  const [projectSummary, setProjectSummary] = useAtom(projectSummaryState);

  const bind = useCallback(() => {
    // Pre-rendered pages arrive with content; refresh it without a spinner.
    if (!projects.length) setLoading(true);
    (async () => {
      try {
        const results = await Promise.allSettled([
          listProjects().then(setProjects),
          findProjectSummary().then(setProjectSummary),
        ]);
        for (const result of results) {
          if (result.status === 'rejected') {
            console.error(
              '>>error<< vm-screen-project-list bind',
              result.reason
            );
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [projects.length, setLoading, setProjects, setProjectSummary]);

  // Observables
  store.loading = loading;
  store.projects = projects;
  store.projectSummary = projectSummary;

  // Actions
  store.bind = bind;

  return store;
};
