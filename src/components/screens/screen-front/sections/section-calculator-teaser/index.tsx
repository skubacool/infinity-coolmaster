import { Link } from 'react-router-dom';

import { paths } from '../../../../../config/routes';
import { siteMeta } from '../../../../../seo/pages';
import { useVmScreen } from '../../../../../stores/vm-screen';
import SafeArea from '../../../../_commons/safe-area';
import Icon from '../../../../_commons/icon';

/** Homepage link to the savings calculator, which has its own page. */
const SectionCalculatorTeaser = () => {
  const { locale = 'en' } = useVmScreen();
  const meta = siteMeta(locale);

  return (
    <section className="py-16 lg:py-24 bg-bg-base flex flex-col justify-start items-stretch">
      <SafeArea>
        <div className="mx-auto w-full max-w-[960px] card-premium bg-gradient-caas-soft p-7 lg:p-10 gap-6 flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div className="gap-y-2 flex flex-col">
            <span className="kicker">
              <Icon name="chart" size={14} />
              {meta.pages['savings-calculator'].label}
            </span>
            <h2 className="text-2xl lg:text-3hxl font-semibold tracking-tight text-text-main">
              {meta.calculatorTeaserTitle}
            </h2>
            <p className="text-base text-text-muted">
              {meta.calculatorTeaserText}
            </p>
          </div>
          <Link
            className="btn-caas flex-shrink-0"
            to={paths.page(locale, 'savings-calculator')}
          >
            {meta.calculatorTeaserLink}
            <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      </SafeArea>
    </section>
  );
};

export default SectionCalculatorTeaser;
