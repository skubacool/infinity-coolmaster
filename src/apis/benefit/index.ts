import { Benefit } from '../../models/benefit';
import { fetchCollection } from '../_commons/cms';
import defaultBenefits from './defaults';

export const listBenefits = async (): Promise<Benefit[]> => {
  const benefits = await fetchCollection<Benefit>('benefits', defaultBenefits);
  return [...benefits].sort((a, b) => a.seq - b.seq);
};
