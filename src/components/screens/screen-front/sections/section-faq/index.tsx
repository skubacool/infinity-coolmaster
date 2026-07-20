import { l } from '../../../../../utils/localization-utils';
import { useVmScreen } from '../../../../../stores/vm-screen';
import { useVmScreenFront } from '../../../../../stores/vm-screen-front';
import SafeArea from '../../../../_commons/safe-area';
import TextLines from '../../../../_commons/text-lines';
import Icon from '../../../../_commons/icon';

/** FAQ accordion — objection handling right before the lead form. */
const SectionFaq = () => {
  const { locale = 'en', localizations = [] } = useVmScreen();
  const { faqs = [] } = useVmScreenFront();

  if (!faqs.length) return null;
  return (
    <section className="py-16 lg:py-24 bg-bg-base flex flex-col justify-start items-stretch">
      <SafeArea>
        <div className="gap-y-10 lg:gap-y-14 flex flex-col justify-start items-stretch">
          <div className="gap-y-3 flex flex-col justify-start items-center">
            <h2 className="text-center text-text-main text-2xl lg:text-4hxl font-semibold tracking-tight">
              {l(locale, localizations, 'front.title-faq')}
            </h2>
            <p className="text-center text-text-muted text-base lg:text-lg max-w-[720px]">
              {l(locale, localizations, 'front.excerpt-faq')}
            </p>
          </div>
          <div className="mx-auto w-full max-w-[840px] gap-y-3 flex flex-col justify-start items-stretch">
            {faqs.map((faq) => {
              const { id, question, answer } = faq;
              return (
                <details key={id} className="card-premium group overflow-hidden">
                  <summary className="cursor-pointer select-none list-none px-6 py-5 gap-x-4 flex flex-row justify-start items-center">
                    <span className="flex-1 text-base lg:text-lg font-semibold text-text-main">
                      {question[locale]}
                    </span>
                    <span className="flex-shrink-0 text-brand-blue transition-transform duration-200 group-open:rotate-180">
                      <Icon name="arrow-down" size={18} />
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-sm lg:text-base leading-relaxed text-text-muted">
                    <TextLines text={answer[locale]} />
                  </p>
                </details>
              );
            })}
          </div>
        </div>
      </SafeArea>
    </section>
  );
};

export default SectionFaq;
