import { Partner } from '../../models/partner';
import { fetchCollection } from '../_commons/cms';
import defaultPartners from './defaults';

export const listPartners = async (): Promise<Partner[]> => {
  return fetchCollection<Partner>('partners', defaultPartners);
};
