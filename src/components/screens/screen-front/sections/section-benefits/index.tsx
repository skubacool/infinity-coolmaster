import { useMemo } from 'react';

import { l } from '../../../../../utils/localization-utils';
import { useVmScreenFront } from '../../../../../stores/vm-screen-front';
import { useVmScreen } from '../../../../../stores/vm-screen';
import SafeArea from '../../../../_commons/safe-area';
import BenefitBox from '../../../../_commons/benefit-box';
import BrandLogo from '../../../../_commons/brand-logo';
import TextLines from '../../../../_commons/text-lines';

const SectionBenefits = () => {
  const { locale = 'en', localizations = [] } = useVmScreen();
  const { benefits = [] } = useVmScreenFront();

  const localizedTitleBenefits = useMemo(() => {
    const text = l(locale, localizations, 'front.title-benefits');
    return text
      ? text.replace(/\{\{total-benefits}}/g, `${benefits.length}`)
      : '';
  }, [locale, localizations, benefits]);

  return (
    <section className="py-12 lg:py-[80px] bg-bg-base flex flex-col justify-start items-stretch">
      <SafeArea>
        <div className="flex flex-col justify-start items-stretch">
          <div className="self-center">
            <BrandLogo markOnly height={56} />
          </div>
          <h2 className="block self-center py-4 lg:pt-6 pb-4 text-xl lg:text-3hxl font-semibold text-center text-text-main">
            <TextLines text={localizedTitleBenefits} />
          </h2>
          <div className="self-center mb-10 lg:mb-12 rounded-full bg-gradient-caas w-12 h-1" />
          <ul className="gap-x-2 flex flex-col lg:flex-row justify-center items-center lg:items-start">
            {benefits.map((benefit) => {
              const { id } = benefit;
              return (
                <li key={id} className="flex-1">
                  <BenefitBox locale={locale} benefit={benefit} />
                </li>
              );
            })}
          </ul>
        </div>
      </SafeArea>
    </section>
  );
};

export default SectionBenefits;
