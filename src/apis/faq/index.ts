import { Faq } from '../../models/faq';
import { fetchCollection } from '../_commons/cms';
import defaultFaqs from './defaults';

export const listFaqs = async (): Promise<Faq[]> => {
  const faqs = await fetchCollection<Faq>('faqs', defaultFaqs);
  return [...faqs].sort((a, b) => a.seq - b.seq);
};
