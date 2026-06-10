import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { HeroBanner } from '../../../../../models/hero-banner';
import { l } from '../../../../../utils/localization-utils';
import { useVmScreenFront } from '../../../../../stores/vm-screen-front';
import { useVmScreen } from '../../../../../stores/vm-screen';
import BusinessBanner from '../../../../_commons/business-banner';

/** Services carousel — bright cards on a soft gradient panel. */
const SectionBusiness = () => {
  const { locale = 'en', localizations = [] } = useVmScreen();

  const vmScreenFront = useVmScreenFront();
  const { heroBanners = [] } = vmScreenFront;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 7000, stopOnInteraction: false }),
  ]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCurrentIndex(emblaApi?.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  if (!heroBanners?.length) return null;
  return (
    <section className="relative py-14 lg:py-24 bg-gradient-caas-soft flex flex-col justify-start items-stretch">
      <div className="gap-y-3 flex flex-col justify-start items-center">
        <h2 className="text-center text-text-main text-2xl lg:text-4hxl font-semibold">
          {l(locale, localizations, 'front.title-business')}
        </h2>
        <p className="px-6 text-center text-text-muted text-base lg:text-lg max-w-[720px]">
          {l(locale, localizations, 'front.excerpt-business')}
        </p>
      </div>
      <div className="embla z-[1] relative mt-8 mx-auto w-full flex justify-start items-stretch">
        <div
          className="embla__viewport overflow-hidden flex-1 w-full"
          ref={emblaRef}
        >
          <div className="embla__container flex">
            {heroBanners.map((heroBanner: HeroBanner) => {
              const { id } = heroBanner;
              return (
                <BusinessBanner
                  key={id}
                  locale={locale}
                  heroBanner={heroBanner}
                />
              );
            })}
          </div>
        </div>
      </div>
      <ul className="mt-8 w-full gap-x-3 flex flex-row justify-center items-center">
        {heroBanners.map((heroBanner: HeroBanner, index: number) => {
          const { id } = heroBanner;
          return (
            <li key={id} className="relative h-2">
              <button
                aria-label={`Slide ${index + 1}`}
                className={`h-full rounded-full transition-all duration-300 ${
                  currentIndex !== index
                    ? 'w-2 bg-sep-smoke'
                    : 'w-8 bg-gradient-caas'
                }`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SectionBusiness;
