import { PropsWithChildren, useMemo } from 'react';

import { Benefit } from '../../../models/benefit';
import { Locale } from '../../../models/_commons/localized';
import Icon from '../icon';
import TextLines from '../text-lines';

export interface BenefitBoxProps {
  locale?: Locale;
  benefit: Benefit;
}

const BenefitBox = (props: PropsWithChildren<BenefitBoxProps>) => {
  const { locale = 'en', benefit } = props;
  const { icon, seq, title, excerpt } = benefit;

  const localizedTitle = useMemo(() => title[locale], [title, locale]);
  const localizedExcerpt = useMemo(() => excerpt[locale], [excerpt, locale]);

  return (
    <div className="h-full pt-4 gap-x-5 flex flex-row lg:flex-col justify-start items-start lg:items-stretch">
      <div className="relative flex-shrink-0 lg:self-center lg:mb-6 rounded-full w-16 h-16 lg:w-[104px] lg:h-[104px] box-border flex flex-col justify-center items-center bg-white border border-sep-pale shadow-premium text-brand-blue-ink">
        <span className="lg:hidden flex">
          <Icon name={icon} size={28} />
        </span>
        <span className="hidden lg:flex">
          <Icon name={icon} size={42} />
        </span>
        <div className="z-[1] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-6 h-6 lg:w-8 lg:h-8 flex flex-col justify-center items-center bg-gradient-caas shadow-premium">
          <span className="text-white text-xs lg:text-sm font-semibold">
            {seq}
          </span>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start items-stretch">
        <span className="text-lg lg:text-xl font-semibold tracking-tight lg:text-center text-text-main">
          {localizedTitle}
        </span>
        <div className="hidden lg:block self-center mt-3.5 mb-4 h-1 w-10 rounded-full bg-gradient-caas" />
        <p className="block mt-1.5 lg:mt-0 lg:mx-auto w-full lg:max-w-[270px] text-sm lg:text-base leading-relaxed lg:text-center text-text-muted">
          <TextLines text={localizedExcerpt} />
        </p>
      </div>
    </div>
  );
};

export default BenefitBox;
