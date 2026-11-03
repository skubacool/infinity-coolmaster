import { Partner } from '../../models/partner';
import { fetchCollection } from '../_commons/cms';
import defaultPartners from './defaults';

/**
 * Partner and client logos from the CMS. The built-in defaults are design
 * placeholders (not real companies), so they are never shown on the site —
 * they only seed the admin form. Without real entries the logo strips hide.
 */
export const listPartners = async (): Promise<Partner[]> => {
  const partners = await fetchCollection<Partner>('partners', defaultPartners);
  return partners === defaultPartners ? [] : partners;
};
