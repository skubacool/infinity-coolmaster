import { l } from '../../../../../utils/localization-utils';
import { useVmScreen } from '../../../../../stores/vm-screen';
import { useVmScreenFront } from '../../../../../stores/vm-screen-front';
import SafeArea from '../../../../_commons/safe-area';
import Icon from '../../../../_commons/icon';

/** "How It Works" — the five-step CaaS engagement journey. */
const SectionProcess = () => {
  const { locale = 'en', localizations = [] } = useVmScreen();
  const { processSteps = [] } = useVmScreenFront();

  if (!processSteps.length) return null;
  return (
    <section className="py-16 lg:py-24 bg-bg-soft flex flex-col justify-start items-stretch">
      <SafeArea>
        <div className="gap-y-10 lg:gap-y-16 flex flex-col justify-start items-stretch">
          <div className="gap-y-3 flex flex-col justify-start items-center">
            <h2 className="text-center text-text-main text-2xl lg:text-4hxl font-semibold tracking-tight">
              {l(locale, localizations, 'front.title-process')}
            </h2>
            <p className="text-center text-text-muted text-base lg:text-lg max-w-[720px]">
              {l(locale, localizations, 'front.excerpt-process')}
            </p>
          </div>
          <ol className="gap-y-10 lg:gap-y-0 lg:gap-x-6 grid grid-cols-1 lg:grid-cols-5">
            {processSteps.map((step, index) => {
              const { id, icon, title, excerpt } = step;
              const isLast = index === processSteps.length - 1;
              return (
                <li
                  key={id}
                  className="relative gap-y-4 flex flex-col justify-start items-center text-center"
                >
                  {/* Connector line between step icons (desktop only) */}
                  {!isLast && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-px bg-sep-light" />
                  )}
                  <div className="relative z-[1] w-16 h-16 rounded-2xl bg-white border border-sep-pale shadow-premium flex flex-col justify-center items-center text-brand-green">
                    <Icon name={icon} size={30} />
                    <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-gradient-caas shadow-premium flex flex-col justify-center items-center text-white text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-base lg:text-lg font-semibold tracking-tight text-text-main">
                    {title[locale]}
                  </span>
                  <p className="max-w-[280px] text-sm leading-relaxed text-text-muted">
                    {excerpt[locale]}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </SafeArea>
    </section>
  );
};

export default SectionProcess;
