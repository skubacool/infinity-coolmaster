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
    <section
      id="benefits"
      className="scroll-mt-20 py-16 lg:py-24 bg-bg-base flex flex-col justify-start items-stretch"
    >
      <SafeArea>
        <div className="flex flex-col justify-start items-stretch">
          <div className="self-center">
            <BrandLogo markOnly height={52} />
          </div>
          <h2 className="block self-center mt-5 mb-5 lg:mt-6 lg:mb-6 max-w-[760px] text-2xl lg:text-4hxl font-semibold tracking-tight !leading-[1.25] text-center text-text-main">
            <TextLines text={localizedTitleBenefits} />
          </h2>
          <div className="self-center mb-12 lg:mb-16 rounded-full bg-gradient-caas w-12 h-1" />
          <ul className="gap-y-10 gap-x-4 lg:gap-x-6 flex flex-col lg:flex-row justify-center items-center lg:items-stretch">
            {benefits.map((benefit) => {
              const { id } = benefit;
              return (
                <li key={id} className="flex-1 max-w-[320px]">
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
