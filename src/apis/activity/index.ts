import { Activity } from '../../models/activity';
import { fetchCollection } from '../_commons/cms';
import { activitySlug, findBySlug } from '../../config/routes';
import { loadBuiltInGuides } from '../../content/articles/load';
import defaultActivities from './defaults';

/**
 * CMS (or default) articles plus the built-in guides, newest first. A CMS
 * article whose slug matches a guide replaces it.
 */
const listAll = async (): Promise<Activity[]> => {
  const articles = await fetchCollection<Activity>(
    'activities',
    defaultActivities
  );
  const builtInGuides = await loadBuiltInGuides();
  const taken = new Set(articles.map((a) => activitySlug(a)));
  const merged = [
    ...articles,
    ...builtInGuides.filter((g) => !taken.has(activitySlug(g))),
  ];
  // Stable sort: newest publish date first; undated items keep their order.
  return merged
    .map((item, index) => ({ item, index }))
    .sort(
      (a, b) =>
        (b.item.publishedAt ?? '').localeCompare(a.item.publishedAt ?? '') ||
        a.index - b.index
    )
    .map(({ item }) => item);
};

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

/** Looks an article up by URL slug (or numeric id, for old links). */
export const findActivityBySlug = async (
  slug: string
): Promise<Activity | null> => findBySlug(await listAll(), slug);
