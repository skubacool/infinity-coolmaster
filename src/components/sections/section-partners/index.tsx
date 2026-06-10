import { PropsWithChildren, useMemo } from 'react';

import { Partner } from '../../../models/partner';
import { l } from '../../../utils/localization-utils';
import { useVmScreen } from '../../../stores/vm-screen';
import SafeArea from '../../_commons/safe-area';
import PartnerStrip from '../../_commons/partner-strip';

export enum SectionPartnersTheme {
  normal = 'normal',
  light = 'light',
}

export interface SectionPartnersProps {
  theme?: SectionPartnersTheme;
  partners: Partner[];
}

const SectionPartners = (props: PropsWithChildren<SectionPartnersProps>) => {
  const { theme, partners } = props;

  const { locale = 'en', localizations = [] } = useVmScreen();

  const vendors = useMemo(
    () => partners.filter((p) => p.type === 'vendor'),
    [partners]
  );

  const clients = useMemo(
    () => partners.filter((p) => p.type === 'client'),
    [partners]
  );

  const bgColor = useMemo(() => {
    switch (theme) {
      case SectionPartnersTheme.light:
        return 'bg-transparent';
      default:
      case SectionPartnersTheme.normal:
        return 'bg-bg-soft';
    }
  }, [theme]);

  return (
    <section
      className={`${bgColor} py-10 lg:py-20 flex flex-col justify-start items-stretch`}
    >
      <SafeArea>
        <div className="gap-y-12 lg:gap-y-20 flex flex-col justify-start items-stretch">
          <div className="gap-y-7 lg:gap-y-5 flex flex-col justify-start items-stretch">
            <h3 className="uppercase text-center text-title-light text-sm lg:text-xl font-medium tracking-wider">
              {l(locale, localizations, 'partners.title-vendors')}
            </h3>
            <PartnerStrip locale={locale} partners={vendors} />
          </div>
          <div className="gap-y-5 flex flex-col justify-start items-stretch">
            <h3 className="uppercase text-center text-title-light text-sm lg:text-xl font-medium tracking-wider">
              {l(locale, localizations, 'partners.title-clients')}
            </h3>
            <PartnerStrip locale={locale} partners={clients} />
          </div>
        </div>
      </SafeArea>
    </section>
  );
};

export default SectionPartners;
