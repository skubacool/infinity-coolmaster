import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';

import { Project } from '../../models/project';
import { ProjectSummary } from '../../models/project-summary';
import { listProjects, findProjectSummary } from '../../apis/project';

const loadingState = atom<boolean>(false);
const projectsState = atom<Project[]>([]);
const projectSummaryState = atom<ProjectSummary | null>(null);

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
    setLoading(true);
    (async () => {
      try {
        const results = await Promise.allSettled([
          listProjects().then(setProjects),
          findProjectSummary().then(setProjectSummary),
        ]);
        for (const result of results) {
          if (result.status === 'rejected') {
            console.error('>>error<< vm-screen-project-list bind', result.reason);
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [setLoading, setProjects, setProjectSummary]);

  // Observables
  store.loading = loading;
  store.projects = projects;
  store.projectSummary = projectSummary;

  // Actions
  store.bind = bind;

  return store;
};
