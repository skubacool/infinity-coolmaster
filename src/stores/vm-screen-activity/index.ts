import { useCallback, useMemo } from 'react';
import { atom, useAtom } from 'jotai';

import { seededAtom } from '../../lib/seed';
import { Activity } from '../../models/activity';
import { listActivities } from '../../apis/activity';
import { findBySlug } from '../../config/routes';

const loadingState = atom<boolean>(false);
/** Slug whose lookup has finished (found or not). */
const resolvedState = seededAtom<string | null>('activity.resolved', null);
const activityState = seededAtom<Activity | null>('activity.activity', null);
const activitiesState = seededAtom<Activity[]>('activity.activities', []);
const nextActivityState = seededAtom<Activity | null>('activity.next', null);

export interface IVmScreenActivity {
  // Observables
  loading?: boolean;
  /** Slug whose lookup has finished; with a null item it means "not found". */
  resolved?: string | null;
  activity?: Activity | null;
  otherActivities?: Activity[];
  /** Article linked from the bottom of the page (nextActivityId). */
  nextActivity?: Activity | null;
  // Actions
  /** Loads the article for a URL slug (or a numeric id from old links). */
  bind?: (slug: string) => void;
}

const store: IVmScreenActivity = {};

/** Resolves an article, the latest articles and the "next" article. */
export const resolveActivity = async (
  slug: string
): Promise<{
  activity: Activity | null;
  latest: Activity[];
  next: Activity | null;
}> => {
  const activities = await listActivities();
  const activity = findBySlug(activities, slug);
  const next =
    activity?.nextActivityId != null
      ? (activities.find((a) => a.id === activity.nextActivityId) ?? null)
      : null;
  return { activity, latest: activities.slice(0, 3), next };
};

export const useVmScreenActivity = (): IVmScreenActivity => {
  const [loading, setLoading] = useAtom(loadingState);
  const [resolved, setResolved] = useAtom(resolvedState);
  const [activity, setActivity] = useAtom(activityState);
  const [activities, setActivities] = useAtom(activitiesState);
  const [nextActivity, setNextActivity] = useAtom(nextActivityState);

  const bind = useCallback(
    (slug: string) => {
      // Keep pre-rendered content on screen while it refreshes from the CMS.
      const shown = activity ? findBySlug([activity], slug) : null;
      if (!shown) {
        setActivity(null);
        setActivities([]);
        setNextActivity(null);
        setLoading(true);
      }
      (async () => {
        try {
          const result = await resolveActivity(slug);
          setActivity(result.activity);
          setActivities(result.latest);
          setNextActivity(result.next);
        } catch (error) {
          console.error('>>error<< vm-screen-activity bind', error);
        } finally {
          setResolved(slug);
          setLoading(false);
        }
      })();
    },
    [
      activity,
      setResolved,
      setActivity,
      setActivities,
      setNextActivity,
      setLoading,
    ]
  );

  const otherActivities = useMemo(
    () => activities.filter((a) => a.id !== activity?.id),
    [activities, activity]
  );

  // Observables
  store.loading = loading;
  store.resolved = resolved;
  store.activity = activity;
  store.otherActivities = otherActivities;
  store.nextActivity = nextActivity;

  // Actions
  store.bind = bind;

  return store;
};
