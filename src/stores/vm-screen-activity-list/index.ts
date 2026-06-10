import { useCallback, useMemo } from 'react';
import { atom, useAtom } from 'jotai';

import { Activity } from '../../models/activity';
import { listActivities } from '../../apis/activity';

const loadingState = atom<boolean>(false);
const activitiesState = atom<Activity[]>([]);

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
    setLoading(true);
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
  }, [setActivities, setLoading]);

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
