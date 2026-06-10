import { Partner } from '../../models/partner';
import { p } from '../../utils/path-utils';

const partners: Partner[] = [
  {
    id: 1,
    logo: p('assets/partners/vendor-aerochill.svg'),
    name: { en: 'AeroChill Systems', th: 'AeroChill Systems' },
    type: 'vendor',
    seq: 1,
  },
  {
    id: 2,
    logo: p('assets/partners/vendor-flowdyn.svg'),
    name: { en: 'FlowDyn Pumps & Drives', th: 'FlowDyn Pumps & Drives' },
    type: 'vendor',
    seq: 2,
  },
  {
    id: 3,
    logo: p('assets/partners/vendor-thermocore.svg'),
    name: { en: 'ThermoCore Heat Exchange', th: 'ThermoCore Heat Exchange' },
    type: 'vendor',
    seq: 3,
  },
  {
    id: 4,
    logo: p('assets/partners/vendor-gridsense.svg'),
    name: { en: 'GridSense IoT Metering', th: 'GridSense IoT Metering' },
    type: 'vendor',
    seq: 4,
  },
  {
    id: 5,
    logo: p('assets/partners/vendor-polartech.svg'),
    name: { en: 'PolarTech Cooling Towers', th: 'PolarTech Cooling Towers' },
    type: 'vendor',
    seq: 5,
  },
  {
    id: 6,
    logo: p('assets/partners/client-apextowers.svg'),
    name: { en: 'Apex Towers Property Group', th: 'Apex Towers Property Group' },
    type: 'client',
    seq: 6,
  },
  {
    id: 7,
    logo: p('assets/partners/client-medcare.svg'),
    name: { en: 'MedCare Hospital Network', th: 'MedCare Hospital Network' },
    type: 'client',
    seq: 7,
  },
  {
    id: 8,
    logo: p('assets/partners/client-urbanmall.svg'),
    name: { en: 'UrbanMall Retail Estates', th: 'UrbanMall Retail Estates' },
    type: 'client',
    seq: 8,
  },
  {
    id: 9,
    logo: p('assets/partners/client-siamworks.svg'),
    name: { en: 'SiamWorks Manufacturing', th: 'SiamWorks Manufacturing' },
    type: 'client',
    seq: 9,
  },
  {
    id: 10,
    logo: p('assets/partners/client-nexusdc.svg'),
    name: { en: 'Nexus Data Centers', th: 'Nexus Data Centers' },
    type: 'client',
    seq: 10,
  },
];

export default partners;
