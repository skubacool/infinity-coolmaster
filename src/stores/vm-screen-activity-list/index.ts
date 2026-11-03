import { useCallback, useMemo } from 'react';
import { atom, useAtom } from 'jotai';

import { seededAtom } from '../../lib/seed';

import { Activity } from '../../models/activity';
import { listActivities } from '../../apis/activity';

const loadingState = atom<boolean>(false);
const activitiesState = seededAtom<Activity[]>('activityList.activities', []);

export interface IVmScreenActivityList {
  // Observables
  loading?: boolean;
  headActivity?: Activity | null;
  otherActivities?: Activity[];
  // Actions
  bind?: () => void;
}

const store: IVmScreenActivityList = {};

export const useVmScreenActivityList = (): IVmScreenActivityList => {
  const [loading, setLoading] = useAtom(loadingState);
  const [activities, setActivities] = useAtom(activitiesState);

  const bind = useCallback(() => {
    // Pre-rendered pages arrive with content; refresh it without a spinner.
    if (!activities.length) setLoading(true);
    (async () => {
      try {
        const activities = await listActivities();
        setActivities(activities);
      } catch (error) {
        console.error('>>error<< list_activities', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [activities.length, setActivities, setLoading]);

  const headActivity = useMemo(() => activities[0] ?? null, [activities]);
  const otherActivities = useMemo(() => activities.slice(1), [activities]);

  // Observables
  store.loading = loading;
  store.headActivity = headActivity;
  store.otherActivities = otherActivities;

  // Actions
  store.bind = bind;

  return store;
};
