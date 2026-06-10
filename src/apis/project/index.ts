import { Project } from '../../models/project';
import { ProjectSummary } from '../../models/project-summary';
import { fetchCollection } from '../_commons/cms';
import defaultProjects from './defaults';

const listAll = async (): Promise<Project[]> =>
  fetchCollection<Project>('projects', defaultProjects);

export const listProjects = async (): Promise<Project[]> => {
  return listAll();
};

export const listLatestProjects = async (): Promise<Project[]> => {
  const projects = await listAll();
  return projects.slice(0, 6);
};

export const findProjectById = async (id: number): Promise<Project | null> => {
  const projects = await listAll();
  return projects.find((p) => p.id === id) ?? null;
};

export const findProjectSummary = async (): Promise<ProjectSummary> => {
  const projects = await listAll();
  const totalProjects = projects.length;
  const totalCapacityTr = projects.reduce((acc, p) => acc + p.capacityTr, 0);
  const totalEnergySavedGwh =
    projects.reduce((acc, p) => acc + (p.energySavedKwh ?? 0), 0) / 1_000_000;
  const avgSavingsPct = totalProjects
    ? projects.reduce((acc, p) => acc + p.savingsPct, 0) / totalProjects
    : 0;
  return {
    totalProjects,
    totalCapacityTr,
    totalEnergySavedGwh,
    avgSavingsPct,
  };
};
