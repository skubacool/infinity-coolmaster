import { Link } from 'react-router-dom';

import { l } from '../../../../../utils/localization-utils';
import { useVmScreen } from '../../../../../stores/vm-screen';
import { useVmScreenFront } from '../../../../../stores/vm-screen-front';
import ScrollStrip from '../../../../_commons/scroll-strip';
import TextLines from '../../../../_commons/text-lines';
import Loading from '../../../../_commons/loading';
import Icon from '../../../../_commons/icon';
import SafeArea from '../../../../_commons/safe-area';

/** Bright hero with the CaaS value proposition; optional CMS photo background. */
const SectionSlogan = () => {
  const { locale = 'en', localizations = [], media } = useVmScreen();
  const { loading } = useVmScreenFront();

  const heroUrl = media?.find((m) => m.key === 'front.banner-hero')?.url ?? '';

  return (
    <section
      className="relative min-h-[calc(100svh-80px)] lg:min-h-[680px] bg-gradient-hero overflow-hidden flex flex-col justify-start items-stretch"
      style={
        heroUrl
          ? { background: `url(${heroUrl}) no-repeat center/cover` }
          : undefined
      }
    >
      {/* Decorative infinity-loop watermark */}
      <svg
        className="absolute -right-32 -bottom-24 w-[640px] h-[640px] opacity-[0.07] pointer-events-none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M100 100 C84 70 40 70 40 100 C40 130 84 130 100 100 C116 70 160 70 160 100 C160 114 149 124 134 126"
          fill="none"
          stroke="#0F172A"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M88 122 C102 132 118 132 132 122"
          fill="none"
          stroke="#0F172A"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
      {heroUrl && (
        /* Light overlay keeps the navy headline readable over any photo */
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/50" />
      )}
      <div className="relative z-[1] flex-1 flex flex-col justify-center items-stretch">
        <SafeArea>
          {!loading ? (
            <div className="py-20 lg:py-24 max-w-[880px] gap-y-6 lg:gap-y-8 flex flex-col justify-center items-start">
              <span className="kicker rounded-full bg-white border border-sep-pale shadow-premium px-4 py-2">
                <Icon name="snowflake" size={14} />
                {l(locale, localizations, 'front.kicker')}
              </span>
              <h1 className="text-4xl lg:text-6hxl font-semibold text-text-main !leading-[1.15]">
                <TextLines text={l(locale, localizations, 'front.cta')} />
              </h1>
              <p className="max-w-[620px] text-base lg:text-xl text-text-muted">
                {l(locale, localizations, 'front.excerpt-cta')}
              </p>
              <div className="mt-2 gap-4 flex flex-col sm:flex-row justify-start items-stretch sm:items-center">
                <a className="btn-caas" href="#contact">
                  {l(locale, localizations, 'front.cta-primary')}
                  <Icon name="arrow-right" size={18} />
                </a>
                <Link className="btn-outline" to={`/${locale}/project`}>
                  {l(locale, localizations, 'front.cta-secondary')}
                </Link>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </SafeArea>
      </div>
      {!loading && (
        <ScrollStrip
          text={l(locale, localizations, 'general.slide-more')}
          targetId="benefits"
        />
      )}
    </section>
  );
};

export default SectionSlogan;
