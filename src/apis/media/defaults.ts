import { Media } from '../../models/media';
import { p } from '../../utils/path-utils';

/** Default media registry; override per-key via cms_content collection 'media'. */
const media: Media[] = [
  {
    id: 1,
    key: 'general.logo-official',
    type: 'image',
    url: p('assets/brand/logo-official.png'),
  },
  {
    id: 2,
    key: 'general.logo-mark',
    type: 'image',
    url: p('assets/brand/logo-mark.png'),
  },
  {
    id: 3,
    key: 'about.banner-main',
    type: 'image',
    url: p('assets/placeholders/banner-soft.svg'),
  },
  {
    id: 4,
    key: 'project-list.banner-main',
    type: 'image',
    url: p('assets/placeholders/banner-soft.svg'),
  },
  {
    id: 5,
    key: 'front.figure-impact',
    type: 'image',
    url: p('assets/placeholders/banner-soft.svg'),
  },
];

export default media;
