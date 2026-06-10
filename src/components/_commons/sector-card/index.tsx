import { PropsWithChildren, useMemo } from 'react';

import { Locale } from '../../../models/_commons/localized';
import { Sector } from '../../../models/sector';
import Icon from '../icon';

export interface SectorCardProps {
  locale?: Locale;
  sector: Sector;
}

const SectorCard = (props: PropsWithChildren<SectorCardProps>) => {
  const { locale = 'en', sector } = props;
  const { icon, title, excerpt } = sector;

  const localizedTitle = useMemo(() => title[locale], [title, locale]);
  const localizedExcerpt = useMemo(() => excerpt[locale], [excerpt, locale]);

  return (
    <div className="card-premium group h-full p-7 lg:p-8 gap-y-4 flex flex-col justify-start items-start transition-all duration-200 hover:shadow-premium-md hover:-translate-y-0.5">
      <div className="w-12 h-12 rounded-xl bg-gradient-caas-soft border border-sep-pale flex flex-col justify-center items-center text-brand-blue group-hover:text-brand-green transition-colors">
        <Icon name={icon} size={26} />
      </div>
      <span className="text-lg lg:text-xl font-semibold text-text-main">
        {localizedTitle}
      </span>
      <p className="text-sm lg:text-base text-text-muted">{localizedExcerpt}</p>
    </div>
  );
};

export default SectorCard;
