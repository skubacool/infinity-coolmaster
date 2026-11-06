import { Link } from 'react-router-dom';

import { l } from '../../../../../utils/localization-utils';
import { useVmScreen } from '../../../../../stores/vm-screen';
import { useVmScreenFront } from '../../../../../stores/vm-screen-front';
import ScrollStrip from '../../../../_commons/scroll-strip';
import TextLines from '../../../../_commons/text-lines';
import Loading from '../../../../_commons/loading';
import Icon from '../../../../_commons/icon';
import SafeArea from '../../../../_commons/safe-area';
import { paths } from '../../../../../config/routes';

/** Bright hero with the CaaS value proposition; optional CMS photo background. */
const SectionSlogan = () => {
  const { locale = 'en', localizations = [], media } = useVmScreen();
  const { loading } = useVmScreenFront();

  const heroUrl = media?.find((m) => m.key === 'front.banner-hero')?.url ?? '';

  return (
    <section className="relative min-h-[calc(100svh-80px)] lg:min-h-[680px] bg-gradient-hero overflow-hidden flex flex-col justify-start items-stretch">
      {heroUrl && (
        /* A real <img> (not a CSS background) so the browser finds and
           fetches it first: it is the largest thing on the page. */
        <img
          src={heroUrl}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* Decorative infinity-loop watermark */}
      <svg
        className="hidden lg:block absolute -right-32 -bottom-24 w-[640px] h-[640px] opacity-[0.07] pointer-events-none"
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
            <div className="py-16 lg:py-24 max-w-[880px] gap-y-6 lg:gap-y-8 flex flex-col justify-center items-start">
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
                {/* Plain href="#contact" would be treated as a route by HashRouter */}
                <button
                  className="btn-caas"
                  onClick={() =>
                    document
                      .getElementById('contact')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  {l(locale, localizations, 'front.cta-primary')}
                  <Icon name="arrow-right" size={18} />
                </button>
                <Link className="btn-outline" to={paths.caseStudies(locale)}>
                  {l(locale, localizations, 'front.cta-secondary')}
                </Link>
              </div>
              {/* Proof points: the three facts a CFO checks first. */}
              <ul className="mt-2 gap-x-6 gap-y-2 flex flex-col sm:flex-row sm:flex-wrap justify-start items-start text-sm lg:text-base text-text-main">
                {['front.proof-1', 'front.proof-2', 'front.proof-3'].map(
                  (key) => (
                    <li
                      key={key}
                      className="gap-x-2 flex flex-row justify-start items-center"
                    >
                      <Icon
                        name="check"
                        size={16}
                        className="flex-shrink-0 text-brand-green-ink"
                      />
                      {l(locale, localizations, key)}
                    </li>
                  )
                )}
              </ul>
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
