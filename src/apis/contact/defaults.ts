import { Contact } from '../../models/contact';

const contacts: Contact[] = [
  {
    id: 1,
    type: 'address',
    icon: 'pin',
    text: {
      en: '128 Phayathai Plaza, 23rd Floor, Phayathai Road, Ratchathewi, Bangkok 10400, Thailand',
      th: '128 อาคารพญาไทพลาซ่า ชั้น 23 ถนนพญาไท แขวงทุ่งพญาไท เขตราชเทวี กรุงเทพมหานคร 10400',
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
    url: 'https://maps.google.com/?q=Phayathai+Plaza+Bangkok',
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
