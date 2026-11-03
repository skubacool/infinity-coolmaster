import { useCallback } from 'react';
import { useAtom } from 'jotai';

import { seededAtom } from '../../lib/seed';

import { ProjectSummary } from '../../models/project-summary';
import { Partner } from '../../models/partner';
import { findProjectSummary } from '../../apis/project';
import { listPartners } from '../../apis/partner';

const projectSummaryState = seededAtom<ProjectSummary | null>(
  'about.projectSummary',
  null
);
const partnersState = seededAtom<Partner[]>('about.partners', []);

export interface IVmScreenAbout {
  // Observables
  projectSummary?: ProjectSummary | null;
  partners?: Partner[];
  // Actions
  bind?: () => void;
}

const store: IVmScreenAbout = {};

export const useVmScreenAbout = (): IVmScreenAbout => {
  const [projectSummary, setProjectSummary] = useAtom(projectSummaryState);
  const [partners, setPartners] = useAtom(partnersState);

  const bind = useCallback(() => {
    (async () => {
      const results = await Promise.allSettled([
        findProjectSummary().then(setProjectSummary),
        listPartners().then((data) =>
          setPartners([...data].sort((a, b) => a.seq - b.seq))
        ),
      ]);
      for (const result of results) {
        if (result.status === 'rejected') {
          console.error('>>error<< vm-screen-about bind', result.reason);
        }
      }
    })();
  }, [setProjectSummary, setPartners]);

  // Observables
  store.projectSummary = projectSummary;
  store.partners = partners;

  // Actions
  store.bind = bind;

  return store;
};
