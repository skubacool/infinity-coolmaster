import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';

import { seededAtom } from '../../lib/seed';

import { Benefit } from '../../models/benefit';
import { HeroBanner } from '../../models/hero-banner';
import { Sector } from '../../models/sector';
import { Project } from '../../models/project';
import { ProjectSummary } from '../../models/project-summary';
import { Activity } from '../../models/activity';
import { Partner } from '../../models/partner';
import { ProcessStep } from '../../models/process-step';
import { Faq } from '../../models/faq';
import { listHeroBanners } from '../../apis/hero-banner';
import { listBenefits } from '../../apis/benefit';
import { listSectors } from '../../apis/sector';
import { listLatestProjects, findProjectSummary } from '../../apis/project';
import { listLatestActivities } from '../../apis/activity';
import { listPartners } from '../../apis/partner';
import { listProcessSteps } from '../../apis/process-step';
import { listFaqs } from '../../apis/faq';

const loadingState = atom<boolean>(false);
const loadedState = atom<boolean>(false);
const benefitsState = seededAtom<Benefit[]>('front.benefits', []);
const heroBannersState = seededAtom<HeroBanner[]>('front.heroBanners', []);
const sectorsState = seededAtom<Sector[]>('front.sectors', []);
const projectsState = seededAtom<Project[]>('front.projects', []);
const activitiesState = seededAtom<Activity[]>('front.activities', []);
const projectSummaryState = seededAtom<ProjectSummary | null>(
  'front.projectSummary',
  null
);
const partnersState = seededAtom<Partner[]>('front.partners', []);
const processStepsState = seededAtom<ProcessStep[]>('front.processSteps', []);
const faqsState = seededAtom<Faq[]>('front.faqs', []);

export interface IVmScreenFront {
  // Observables
  loading?: boolean;
  benefits?: Benefit[];
  heroBanners?: HeroBanner[];
  sectors?: Sector[];
  projects?: Project[];
  projectSummary?: ProjectSummary | null;
  activities?: Activity[];
  partners?: Partner[];
  processSteps?: ProcessStep[];
  faqs?: Faq[];
  // Actions
  bind?: () => void;
}

const store: IVmScreenFront = {};

export const useVmScreenFront = (): IVmScreenFront => {
  const [loading, setLoading] = useAtom(loadingState);
  const [loaded, setLoaded] = useAtom(loadedState);
  const [benefits, setBenefits] = useAtom(benefitsState);
  const [heroBanners, setHeroBanners] = useAtom(heroBannersState);
  const [sectors, setSectors] = useAtom(sectorsState);
  const [projects, setProjects] = useAtom(projectsState);
  const [projectSummary, setProjectSummary] = useAtom(projectSummaryState);
  const [activities, setActivities] = useAtom(activitiesState);
  const [partners, setPartners] = useAtom(partnersState);
  const [processSteps, setProcessSteps] = useAtom(processStepsState);
  const [faqs, setFaqs] = useAtom(faqsState);

  const bind = useCallback(() => {
    if (loaded) return;
    // Pre-rendered pages arrive with content; refresh it without a spinner.
    if (!benefits.length) setLoading(true);
    (async () => {
      try {
        const results = await Promise.allSettled([
          listBenefits().then((data) => setBenefits(data ?? [])),
          listHeroBanners().then((data) => setHeroBanners(data ?? [])),
          listSectors().then((data) => setSectors(data ?? [])),
          listLatestProjects().then((data) => setProjects(data ?? [])),
          findProjectSummary().then(setProjectSummary),
          listLatestActivities().then((data) => setActivities(data ?? [])),
          listPartners().then((data) =>
            setPartners([...data].sort((a, b) => a.seq - b.seq))
          ),
          listProcessSteps().then((data) => setProcessSteps(data ?? [])),
          listFaqs().then((data) => setFaqs(data ?? [])),
        ]);
        for (const result of results) {
          if (result.status === 'rejected') {
            console.error('>>error<< vm-screen-front bind', result.reason);
          }
        }
      } finally {
        setLoaded(true);
        setLoading(false);
      }
    })();
  }, [
    loaded,
    benefits.length,
    setLoaded,
    setLoading,
    setActivities,
    setBenefits,
    setHeroBanners,
    setSectors,
    setProjectSummary,
    setProjects,
    setPartners,
    setProcessSteps,
    setFaqs,
  ]);

  // Observables
  store.loading = loading;
  store.benefits = benefits;
  store.heroBanners = heroBanners;
  store.sectors = sectors;
  store.projects = projects;
  store.projectSummary = projectSummary;
  store.activities = activities;
  store.partners = partners;
  store.processSteps = processSteps;
  store.faqs = faqs;

  // Actions
  store.bind = bind;

  return store;
};
