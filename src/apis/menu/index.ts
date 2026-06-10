import { Menu } from '../../models/menu';

import navMenu from './mock/nav-menu';
import footerMenu from './mock/footer-menu';

/** Menus are part of the information architecture and stay code-defined. */
export const findMenu = async (type: string): Promise<Menu | null> => {
  if (type === 'nav') return navMenu;
  if (type === 'footer') return footerMenu;
  return null;
};
