import { Activity } from '../../models/activity';
import { fetchCollection } from '../_commons/cms';
import defaultActivities from './defaults';

const listAll = async (): Promise<Activity[]> =>
  fetchCollection<Activity>('activities', defaultActivities);

export const listActivities = async (): Promise<Activity[]> => {
  return listAll();
};

export const listLatestActivities = async (): Promise<Activity[]> => {
  const activities = await listAll();
  return activities.slice(0, 3);
};

export const findActivityById = async (
  id: number
): Promise<Activity | null> => {
  const activities = await listAll();
  return activities.find((a) => a.id === id) ?? null;
};
