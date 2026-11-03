import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';

import { seededAtom } from '../../lib/seed';
import { Project } from '../../models/project';
import { listProjects } from '../../apis/project';
import { findBySlug } from '../../config/routes';

const loadingState = atom<boolean>(false);
/** Slug whose lookup has finished (found or not). */
const resolvedState = seededAtom<string | null>('project.resolved', null);
const projectState = seededAtom<Project | null>('project.project', null);
const nextProjectState = seededAtom<Project | null>('project.next', null);

export interface IVmScreenProject {
  // Observables
  loading?: boolean;
  /** Slug whose lookup has finished; with a null item it means "not found". */
  resolved?: string | null;
  project?: Project | null;
  /** Case study linked from the bottom of the page (nextProjectId). */
  nextProject?: Project | null;
  // Actions
  /** Loads the case study for a URL slug (or a numeric id from old links). */
  bind?: (slug: string) => void;
}

const store: IVmScreenProject = {};

/** Resolves a case study and the one its "next" link points to. */
export const resolveProject = async (
  slug: string
): Promise<{ project: Project | null; next: Project | null }> => {
  const projects = await listProjects();
  const project = findBySlug(projects, slug);
  const next =
    project?.nextProjectId != null
      ? (projects.find((p) => p.id === project.nextProjectId) ?? null)
      : null;
  return { project, next };
};

export const useVmScreenProject = (): IVmScreenProject => {
  const [loading, setLoading] = useAtom(loadingState);
  const [resolved, setResolved] = useAtom(resolvedState);
  const [project, setProject] = useAtom(projectState);
  const [nextProject, setNextProject] = useAtom(nextProjectState);

  const bind = useCallback(
    (slug: string) => {
      // Keep pre-rendered content on screen while it refreshes from the CMS.
      const shown = project ? findBySlug([project], slug) : null;
      if (!shown) {
        setProject(null);
        setNextProject(null);
        setLoading(true);
      }
      (async () => {
        try {
          const result = await resolveProject(slug);
          setProject(result.project);
          setNextProject(result.next);
        } catch (error) {
          console.error('>>error<< find_project_by_slug', error);
        } finally {
          setResolved(slug);
          setLoading(false);
        }
      })();
    },
    [project, setResolved, setLoading, setProject, setNextProject]
  );

  // Observables
  store.loading = loading;
  store.resolved = resolved;
  store.project = project;
  store.nextProject = nextProject;

  // Actions
  store.bind = bind;

  return store;
};
