import { PropsWithChildren, useMemo } from 'react';

import { Locale } from '../../../models/_commons/localized';
import { HeroBanner } from '../../../models/hero-banner';
import Icon from '../icon';
import TextLines from '../text-lines';

export interface BusinessBannerProps {
  locale?: Locale;
  heroBanner: HeroBanner;
}

/** One service pillar slide — bright premium card on a soft gradient panel. */
const BusinessBanner = (props: PropsWithChildren<BusinessBannerProps>) => {
  const { locale = 'en', heroBanner } = props;
  const { title, subtitle, icon, excerpt } = heroBanner;

  const localizedTitle = useMemo(() => title[locale], [locale, title]);
  const localizedSubtitle = useMemo(() => subtitle[locale], [locale, subtitle]);
  const localizedExcerpt = useMemo(() => excerpt[locale], [locale, excerpt]);

  return (
    <div className="embla__slide relative w-full h-full px-6 py-6 lg:py-10 flex flex-col justify-center items-center">
      <div className="card-premium w-full max-w-[880px] px-8 py-12 lg:px-20 lg:py-16 gap-y-5 flex flex-col justify-start items-center">
        <div className="w-16 h-16 lg:w-[88px] lg:h-[88px] rounded-2xl bg-gradient-caas-soft border border-sep-pale flex flex-col justify-center items-center text-brand-green">
          <Icon name={icon} size={40} />
        </div>
        <span className="kicker">{localizedSubtitle}</span>
        <h3 className="m-0 p-0 leading-[1.2] text-text-main font-semibold text-2xl lg:text-4hxl text-center">
          <TextLines text={localizedTitle} />
        </h3>
        <div className="mx-auto max-w-[640px] flex flex-col justify-start items-stretch">
          <p className="text-base lg:text-lg text-text-muted text-center">
            <TextLines text={localizedExcerpt} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessBanner;
