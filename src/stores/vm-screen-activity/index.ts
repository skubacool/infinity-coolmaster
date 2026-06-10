import { useCallback, useMemo } from 'react';
import { atom, useAtom } from 'jotai';

import { Activity } from '../../models/activity';
import { findActivityById, listLatestActivities } from '../../apis/activity';

const loadingState = atom<boolean>(false);
const activityState = atom<Activity | null>(null);
const activitiesState = atom<Activity[]>([]);

export interface IVmScreenActivity {
  // Observables
  loading?: boolean;
  activity?: Activity | null;
  otherActivities?: Activity[];
  // Actions
  bind?: (id: string) => void;
}

const store: IVmScreenActivity = {};

export const useVmScreenActivity = (): IVmScreenActivity => {
  const [loading, setLoading] = useAtom(loadingState);
  const [activity, setActivity] = useAtom(activityState);
  const [activities, setActivities] = useAtom(activitiesState);

  const bind = useCallback(
    (id: string) => {
      setActivity(null);
      setActivities([]);
      setLoading(true);
      (async () => {
        try {
          const results = await Promise.allSettled([
            findActivityById(+(id ?? '0')).then(setActivity),
            listLatestActivities().then(setActivities),
          ]);
          for (const result of results) {
            if (result.status === 'rejected') {
              console.error('>>error<< vm-screen-activity bind', result.reason);
            }
          }
        } finally {
          setLoading(false);
        }
      })();
    },
    [setActivity, setActivities, setLoading]
  );

  const otherActivities = useMemo(
    () => activities.filter((a) => a.id !== activity?.id),
    [activities, activity]
  );

  // Observables
  store.loading = loading;
  store.activity = activity;
  store.otherActivities = otherActivities;

  // Actions
  store.bind = bind;

  return store;
};
