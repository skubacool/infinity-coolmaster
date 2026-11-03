import { Contact } from '../../models/contact';

const contacts: Contact[] = [
  {
    id: 1,
    type: 'address',
    icon: 'pin',
    text: {
      en: '157/9 Soi Ari Samphan 2, Phahonyothin Road, Phaya Thai, Bangkok 10400, Thailand',
      th: '157/9 ซอยอารีย์สัมพันธ์ 2 ถนนพหลโยธิน แขวงพญาไท เขตพญาไท กรุงเทพมหานคร 10400',
    },
    url: null,
  },
  {
    id: 2,
    type: 'tel',
    icon: 'tel',
    text: { en: '+66 (0)2 026 3344', th: '02-026-3344' },
    url: 'tel:+6620263344',
  },
  {
    id: 3,
    type: 'email',
    icon: 'mail',
    text: {
      en: 'sales@infinitycoolmaster.com',
      th: 'sales@infinitycoolmaster.com',
    },
    url: 'mailto:sales@infinitycoolmaster.com',
  },
  {
    id: 4,
    type: 'maps',
    icon: 'map',
    text: { en: 'Open in Google Maps', th: 'เปิดใน Google Maps' },
    url: 'https://maps.google.com/?q=157%2F9+Soi+Ari+Samphan+2+Phahonyothin+Road+Phaya+Thai+Bangkok',
  },
  {
    id: 5,
    type: 'linkedin',
    icon: 'linkedin',
    text: { en: 'LinkedIn', th: 'LinkedIn' },
    url: 'https://www.linkedin.com/company/infinity-coolmaster',
  },
  {
    id: 6,
    type: 'facebook',
    icon: 'facebook',
    text: { en: 'Facebook', th: 'Facebook' },
    url: 'https://www.facebook.com/infinitycoolmaster',
  },
];

export default contacts;
