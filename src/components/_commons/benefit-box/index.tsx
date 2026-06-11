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
    <div className="h-full pt-4 flex flex-col justify-start items-stretch">
      <div className="relative self-center mb-6 rounded-full w-[104px] h-[104px] box-border flex flex-col justify-center items-center bg-white border border-sep-pale shadow-premium text-brand-blue">
        <Icon name={icon} size={42} />
        <div className="z-[1] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-8 h-8 flex flex-col justify-center items-center bg-gradient-caas shadow-premium">
          <span className="text-white text-sm font-semibold">{seq}</span>
        </div>
      </div>
      <span className="text-lg lg:text-xl font-semibold tracking-tight text-center text-text-main">
        {localizedTitle}
      </span>
      <div className="self-center mt-3.5 mb-4 h-1 w-10 rounded-full bg-gradient-caas" />
      <p className="block mx-auto w-full max-w-[270px] text-sm lg:text-base leading-relaxed text-center text-text-muted">
        <TextLines text={localizedExcerpt} />
      </p>
    </div>
  );
};

export default BenefitBox;
