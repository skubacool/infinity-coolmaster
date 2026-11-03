import { Menu } from '../../../models/menu';

const navMenu: Menu = {
  id: 1,
  type: 'nav',
  items: [
    { id: 1, title: 'menu.home', url: '/' },
    { id: 2, title: 'menu.about', url: '/about' },
    { id: 3, title: 'menu.projects', url: '/case-studies' },
    { id: 4, title: 'menu.activities', url: '/insights' },
    {
      id: 5,
      title: 'menu.contact',
      url: '/contact',
      isCta: true,
    },
  ],
};

export default navMenu;
