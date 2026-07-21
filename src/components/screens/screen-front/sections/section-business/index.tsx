import { HeroBanner } from '../../../../../models/hero-banner';
import { l } from '../../../../../utils/localization-utils';
import { useVmScreenFront } from '../../../../../stores/vm-screen-front';
import { useVmScreen } from '../../../../../stores/vm-screen';
import SafeArea from '../../../../_commons/safe-area';
import Icon from '../../../../_commons/icon';
import TextLines from '../../../../_commons/text-lines';

/**
 * Services section — all four CaaS pillars shown at once in a grid
 * (1 col mobile, 2×2 on desktop). B2B buyers scan; a static grid beats a
 * carousel that hides 75% of the offering behind a rotation.
 */
const SectionBusiness = () => {
  const { locale = 'en', localizations = [] } = useVmScreen();
  const { heroBanners = [] } = useVmScreenFront();

  if (!heroBanners?.length) return null;
  return (
    <section className="py-16 lg:py-24 bg-gradient-caas-soft flex flex-col justify-start items-stretch">
      <SafeArea>
        <div className="gap-y-10 lg:gap-y-14 flex flex-col justify-start items-stretch">
          <div className="gap-y-3 flex flex-col justify-start items-center">
            <h2 className="text-center text-text-main text-2xl lg:text-4hxl font-semibold tracking-tight">
              {l(locale, localizations, 'front.title-business')}
            </h2>
            <p className="text-center text-text-muted text-base lg:text-lg max-w-[720px]">
              {l(locale, localizations, 'front.excerpt-business')}
            </p>
          </div>
          <ul className="gap-5 lg:gap-6 grid grid-cols-1 sm:grid-cols-2">
            {heroBanners.map((heroBanner: HeroBanner) => {
              const { id, icon, title, subtitle, excerpt } = heroBanner;
              return (
                <li key={id}>
                  <div className="card-premium h-full p-6 lg:p-8 gap-y-4 flex flex-col justify-start items-start transition-all duration-200 hover:shadow-premium-md hover:-translate-y-0.5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-caas-soft border border-sep-pale flex flex-col justify-center items-center text-brand-green">
                      <Icon name={icon} size={30} />
                    </div>
                    <span className="kicker">{subtitle[locale]}</span>
                    <h3 className="text-lg lg:text-xl font-semibold tracking-tight text-text-main leading-snug">
                      <TextLines text={title[locale]} />
                    </h3>
                    <p className="text-sm lg:text-base leading-relaxed text-text-muted">
                      <TextLines text={excerpt[locale]} />
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </SafeArea>
    </section>
  );
};

export default SectionBusiness;
