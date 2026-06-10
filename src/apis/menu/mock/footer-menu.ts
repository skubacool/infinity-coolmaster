import { Menu } from '../../../models/menu';

const footerMenu: Menu = {
  id: 2,
  type: 'footer',
  items: [
    { id: 1, title: 'menu.home', url: '/' },
    { id: 2, title: 'menu.about', url: '/about' },
    { id: 3, title: 'menu.projects', url: '/project' },
    { id: 4, title: 'menu.activities', url: '/activity' },
    { id: 5, title: 'menu.contact', url: '/?rand={{random}}#contact' },
  ],
};

export default footerMenu;
