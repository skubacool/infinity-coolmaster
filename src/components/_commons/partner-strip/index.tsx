import { PropsWithChildren, useCallback, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { useVmScreen } from '../../../stores/vm-screen';
import { Partner } from '../../../models/partner';
import { Locale } from '../../../models/_commons/localized';

export interface PartnerStripProps {
  locale?: Locale;
  partners: Partner[];
}

const AUTOPLAY_DELAY = 5000;
const SM_ITEMS_PER_CARD = 3;
const LG_ITEMS_PER_CARD = 5;

const PartnerStrip = (props: PropsWithChildren<PartnerStripProps>) => {
  const { locale = 'en', partners } = props;

  const { windowWidth } = useVmScreen();

  const itemsPerCard = useMemo(
    () => ((windowWidth ?? 0) <= 1024 ? SM_ITEMS_PER_CARD : LG_ITEMS_PER_CARD),
    [windowWidth]
  );

  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false }),
  ]);

  const createPartnerList = useCallback(
    (partners: Partner[]) => {
      return (
        <ul
          key={partners[0]?.id ?? 'empty'}
          className="embla__slide w-full gap-6 grid grid-cols-3 lg:grid-cols-5 justify-center"
        >
          {partners.map((partner) => {
            const { id, name, logo } = partner;
            const localizedName = name ? name[locale] : '';
            return (
              <li
                key={id}
                className="relative flex flex-col justify-center items-center grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all"
              >
                <img
                  className="block w-[80%]"
                  alt={localizedName}
                  title={localizedName}
                  src={logo}
                />
              </li>
            );
          })}
        </ul>
      );
    },
    [locale]
  );

  return partners.length <= itemsPerCard ? (
    createPartnerList(partners)
  ) : (
    <div className="embla z-[1] relative mx-auto h-full w-full flex justify-start items-stretch">
      <div
        ref={emblaRef}
        className="embla__viewport overflow-hidden flex-1 w-full h-full"
      >
        <div className="embla__container flex">
          {[...Array(Math.ceil(partners.length / itemsPerCard))].map(
            (_, index) => {
              const start = index * itemsPerCard;
              return createPartnerList(
                partners.slice(start, start + itemsPerCard)
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerStrip;
