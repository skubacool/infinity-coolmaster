import { Contact } from '../../models/contact';
import { fetchCollection } from '../_commons/cms';
import defaultContacts from './defaults';

export const listContacts = async (): Promise<Contact[]> => {
  return fetchCollection<Contact>('contacts', defaultContacts);
};
