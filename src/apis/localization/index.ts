import { LocalizedKeyText } from '../../models/_commons/localized';
import { fetchCollection } from '../_commons/cms';
import defaultLocalizations from './defaults';

export const listLocalizations = async (): Promise<LocalizedKeyText[]> => {
  const remote = await fetchCollection<LocalizedKeyText>(
    'localizations',
    defaultLocalizations
  );
  if (remote === defaultLocalizations) return defaultLocalizations;
  // Merge: remote rows override defaults, defaults fill any gaps.
  const merged = new Map<string, LocalizedKeyText>();
  for (const item of defaultLocalizations) merged.set(item.key, item);
  for (const item of remote) merged.set(item.key, item);
  return Array.from(merged.values());
};
