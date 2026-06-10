import { HeroBanner } from '../../models/hero-banner';
import { fetchCollection } from '../_commons/cms';
import defaultHeroBanners from './defaults';

export const listHeroBanners = async (): Promise<HeroBanner[]> => {
  return fetchCollection<HeroBanner>('hero_banners', defaultHeroBanners);
};
