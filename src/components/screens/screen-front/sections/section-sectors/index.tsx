import { l } from '../../../../../utils/localization-utils';
import { useVmScreen } from '../../../../../stores/vm-screen';
import { useVmScreenFront } from '../../../../../stores/vm-screen-front';
import SafeArea from '../../../../_commons/safe-area';
import SectorCard from '../../../../_commons/sector-card';

/** Target market sectors served by the CaaS offering. */
const SectionSectors = () => {
  const { locale = 'en', localizations = [] } = useVmScreen();
  const { sectors = [] } = useVmScreenFront();

  if (!sectors.length) return null;
  return (
    <section className="py-12 lg:py-20 bg-bg-base flex flex-col justify-start items-stretch">
      <SafeArea>
        <div className="gap-y-10 lg:gap-y-14 flex flex-col justify-start items-stretch">
          <div className="gap-y-3 flex flex-col justify-start items-center">
            <h2 className="text-center text-text-main text-2xl lg:text-4hxl font-semibold">
              {l(locale, localizations, 'front.title-sectors')}
            </h2>
            <p className="text-center text-text-muted text-base lg:text-lg max-w-[720px]">
              {l(locale, localizations, 'front.excerpt-sectors')}
            </p>
          </div>
          <ul className="gap-5 lg:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => {
              const { id } = sector;
              return (
                <li key={id}>
                  <SectorCard locale={locale} sector={sector} />
                </li>
              );
            })}
          </ul>
        </div>
      </SafeArea>
    </section>
  );
};

export default SectionSectors;
