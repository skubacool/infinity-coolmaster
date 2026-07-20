import { ReactElement, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useVmScreenFront } from '../../../stores/vm-screen-front';
import Nav from '../../_commons/nav';
import Footer from '../../_commons/footer';
import SectionSlogan from './sections/section-slogan';
import SectionBenefits from './sections/section-benefits';
import SectionBusiness from './sections/section-business';
import SectionProcess from './sections/section-process';
import SectionSectors from './sections/section-sectors';
import SectionProjects from './sections/section-projects';
import SectionImpact from './sections/section-impact';
import SectionActivities from './sections/section-activities';
import SectionFaq from './sections/section-faq';
import SectionContact from './sections/section-contact';
import SectionPartners from '../../sections/section-partners';

const ScreenFront = (): ReactElement => {
  const { hash } = useLocation();

  const [querystring] = useSearchParams();
  const rand = querystring.get('rand');

  const vmScreenFront = useVmScreenFront();
  const { loading, partners = [] } = vmScreenFront;

  useEffect(() => {
    if (!vmScreenFront.bind) return;
    vmScreenFront.bind();
  }, [vmScreenFront]);

  useEffect(() => {
    if (loading) return;
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const element = document.getElementById(hash.substring(1));
    if (!element) return;
    const headerOffset = 96;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition });
  }, [hash, loading, rand]);

  return (
    <div className="flex flex-col justify-start items-stretch">
      <Nav />
      <SectionSlogan />
      {loading || (
        <>
          <SectionBenefits />
          <SectionBusiness />
          <SectionProcess />
          <SectionSectors />
          <SectionProjects />
          <SectionPartners partners={partners} />
          <SectionImpact />
          <SectionActivities />
          <SectionFaq />
          <SectionContact />
          <Footer />
        </>
      )}
    </div>
  );
};

export default ScreenFront;
