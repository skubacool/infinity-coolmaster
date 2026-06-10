import { useEffect, useMemo } from 'react';

import { l } from '../../../utils/localization-utils';
import { useVmScreen } from '../../../stores/vm-screen';
import { useVmScreenAbout } from '../../../stores/vm-screen-about';
import LayoutBanner from '../../layouts/layout-banner';
import SafeArea from '../../_commons/safe-area';
import SectionPartners, {
  SectionPartnersTheme,
} from '../../sections/section-partners';
import SectionDetails from './sections/section-details';
import SectionGrowth from './sections/section-growth';
import TextLines from '../../_commons/text-lines';

const ScreenAbout = () => {
  const { locale = 'en', localizations = [] } = useVmScreen();

  const vmScreenAbout = useVmScreenAbout();
  const { partners = [] } = vmScreenAbout;

  useEffect(() => {
    if (!vmScreenAbout.bind) return;
    vmScreenAbout.bind();
  }, [vmScreenAbout]);

  const banner = useMemo(() => {
    return (
      <div className="flex-1 bg-gradient-hero flex flex-col justify-start items-stretch">
        <div className="py-16 lg:py-[84px] absolute left-0 top-0 w-full h-full flex flex-col justify-start items-start">
          <SafeArea>
            <div className="flex-1 gap-y-5 flex flex-col justify-center items-start">
              <h1 className="hidden lg:block text-text-main text-8xl font-semibold">
                {l(locale, localizations, 'about.title-company')}
              </h1>
              <h1 className="lg:hidden text-text-main text-6xl font-semibold !leading-[1.1]">
                <TextLines
                  text={l(locale, localizations, 'about.sm:title-company')}
                />
              </h1>
              <p className="max-w-[640px] text-text-muted text-base lg:text-xl">
                {l(locale, localizations, 'about.excerpt-company')}
              </p>
              <div className="w-20 h-1 rounded-full bg-gradient-caas" />
            </div>
          </SafeArea>
        </div>
      </div>
    );
  }, [locale, localizations]);

  return (
    <LayoutBanner isFilled banner={banner}>
      <div className="flex flex-col justify-start items-stretch">
        <SectionDetails />
        <SectionGrowth />
        <SectionPartners
          theme={SectionPartnersTheme.light}
          partners={partners}
        />
      </div>
    </LayoutBanner>
  );
};

export default ScreenAbout;
