import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { isPageKey, paths } from '../../../config/routes';
import { useVmScreen } from '../../../stores/vm-screen';
import { useVmScreenFront } from '../../../stores/vm-screen-front';
import { isDraftPage, siteMeta } from '../../../seo/pages';
import LayoutStandard from '../../layouts/layout-standard';
import SafeArea from '../../_commons/safe-area';
import SectionEstimator from '../screen-front/sections/section-estimator';
import SectionContact from '../screen-front/sections/section-contact';
import ScreenNotFound from '../screen-not-found';

/**
 * Standalone pages (/en/<key>/): sector pages, explainers, the savings
 * calculator, contact and team. Their H1, intro and head tags come from
 * src/seo/meta.<locale>.ts. Pages not listed in PUBLISHED_PAGES are TODO
 * scaffolds served with noindex until their copy is written.
 */
const ScreenPage = () => {
  const { page = '' } = useParams();
  const { locale = 'en' } = useVmScreen();

  // The calculator and the contact form use the sector list from the
  // homepage data.
  const vmScreenFront = useVmScreenFront();
  useEffect(() => {
    if (!vmScreenFront.bind) return;
    vmScreenFront.bind();
  }, [vmScreenFront]);

  if (!isPageKey(page)) return <ScreenNotFound />;

  const meta = siteMeta(locale);
  const text = meta.pages[page];
  const draft = isDraftPage(page);

  return (
    <LayoutStandard>
      <section className="pt-16 lg:pt-24 pb-4 bg-bg-base flex flex-col justify-start items-stretch">
        <SafeArea>
          <div className="max-w-[880px] gap-y-5 flex flex-col justify-start items-start">
            <nav aria-label="Breadcrumb" className="text-sm text-text-muted">
              <Link className="hover:text-brand-blue" to={paths.home(locale)}>
                {meta.homeLabel}
              </Link>
              <span className="mx-2">/</span>
              <span>{text.label}</span>
            </nav>
            <h1 className="text-4xl lg:text-6hxl font-semibold leading-[1.15] text-text-main">
              {text.h1}
            </h1>
            <p className="text-base lg:text-xl text-text-muted">{text.intro}</p>
          </div>
        </SafeArea>
      </section>

      {page === 'savings-calculator' && <SectionEstimator />}
      {page === 'contact' && <SectionContact />}

      {draft && (
        <section className="py-12 lg:py-16 flex flex-col justify-start items-stretch">
          <SafeArea>
            <div className="max-w-[880px] gap-y-6 flex flex-col justify-start items-stretch">
              <p className="rounded-xl border border-dashed border-sep-smoke bg-bg-soft p-5 text-sm text-text-muted">
                {meta.draftNotice}
              </p>
              <ul className="gap-y-3 flex flex-col list-disc pl-6 text-base text-text-muted">
                {meta.draftSections.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div>
                <Link className="btn-caas" to={paths.contact(locale)}>
                  {meta.ctaAudit}
                </Link>
              </div>
            </div>
          </SafeArea>
        </section>
      )}
    </LayoutStandard>
  );
};

export default ScreenPage;
