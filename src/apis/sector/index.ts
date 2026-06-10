import { Sector } from '../../models/sector';
import { fetchCollection } from '../_commons/cms';
import defaultSectors from './defaults';

export const listSectors = async (): Promise<Sector[]> => {
  const sectors = await fetchCollection<Sector>('sectors', defaultSectors);
  return [...sectors].sort((a, b) => a.seq - b.seq);
};
