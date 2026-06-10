import { Media } from '../../models/media';
import { fetchCollection } from '../_commons/cms';
import defaultMedia from './defaults';

export const listMedia = async (): Promise<Media[]> => {
  const remote = await fetchCollection<Media>('media', defaultMedia);
  if (remote === defaultMedia) return defaultMedia;
  const merged = new Map<string, Media>();
  for (const item of defaultMedia) merged.set(item.key, item);
  for (const item of remote) merged.set(item.key, item);
  return Array.from(merged.values());
};
