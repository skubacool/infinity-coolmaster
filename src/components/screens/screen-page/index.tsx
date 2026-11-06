import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { isPageKey, paths } from '../../../config/routes';
import { useVmScreen } from '../../../stores/vm-screen';
import { useVmScreenFront } from '../../../stores/vm-screen-front';
import { isDraftPage, siteMeta } from '../../../seo/pages';
import PageBodyView from './sections/page-body';
import EfficiencyCheck from './sections/efficiency-check';
import { useVmScreenPage } from '../../../stores/vm-screen-page';
import ProjectGrid from '../../_commons/project-grid';
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
  const { projects = [] } = vmScreenFront;
  useEffect(() => {
    if (!vmScreenFront.bind) return;
    vmScreenFront.bind();
  }, [vmScreenFront]);

  const vmScreenPage = useVmScreenPage();
  useEffect(() => {
    if (!vmScreenPage.bind || !isPageKey(page)) return;
    vmScreenPage.bind(locale, page);
  }, [locale, page, vmScreenPage]);

  if (!isPageKey(page)) return <ScreenNotFound />;

  const meta = siteMeta(locale);
  const text = meta.pages[page];
  const draft = isDraftPage(page);
  // Content loaded for another page is never shown on this one.
  const current = vmScreenPage.isFor?.(locale, page) ?? false;
  const body = current ? (vmScreenPage.body ?? null) : null;
  const related = body?.sector
    ? projects.filter((project) => project.sector === body.sector)
    : [];
  const guides = current ? (vmScreenPage.guides ?? []) : [];

  return (
    <LayoutStandard>
      <section className="pt-16 lg:pt-24 pb-4 bg-bg-base flex flex-col justify-start items-stretch">
        <SafeArea>
          <div className="max-w-[880px] gap-y-5 flex flex-col justify-start items-start">
            <nav aria-label="Breadcrumb" className="text-sm text-text-muted">
              <Link
                className="hover:text-brand-blue-ink"
                to={paths.home(locale)}
              >
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
      {page === 'chiller-efficiency-check' && (
        <EfficiencyCheck locale={locale} />
      )}
      {page === 'contact' && <SectionContact />}

      {body && <PageBodyView body={body} faqTitle={meta.faqTitle} />}

      {guides.length > 0 && (
        <section className="pb-12 lg:pb-16 flex flex-col justify-start items-stretch">
          <SafeArea>
            <div className="max-w-[880px] gap-y-4 flex flex-col">
              <h2 className="text-2xl lg:text-3hxl font-semibold tracking-tight text-text-main">
                {meta.furtherReading}
              </h2>
              <ul className="gap-y-3 flex flex-col">
                {guides.map((guide) => (
                  <li key={guide.id}>
                    <Link
                      className="text-base lg:text-lg font-medium text-brand-blue-ink underline underline-offset-4"
                      to={paths.insight(locale, guide)}
                    >
                      {guide.title[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </SafeArea>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-12 lg:py-16 bg-bg-soft flex flex-col justify-start items-stretch">
          <SafeArea>
            <div className="gap-y-8 flex flex-col">
              <h2 className="text-2xl lg:text-3hxl font-semibold tracking-tight text-text-main">
                {meta.relatedCaseStudies}
              </h2>
              <ProjectGrid locale={locale} projects={related} />
            </div>
          </SafeArea>
        </section>
      )}

      {body && page !== 'contact' && (
        <section className="py-12 lg:py-16 flex flex-col justify-start items-stretch">
          <SafeArea>
            <div className="mx-auto w-full max-w-[960px] card-premium bg-gradient-caas-soft p-7 lg:p-10 gap-6 flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <p className="text-xl lg:text-2xl font-semibold text-text-main">
                {meta.pages.contact.intro}
              </p>
              <Link
                className="btn-caas flex-shrink-0"
                to={paths.contact(locale)}
              >
                {meta.ctaAudit}
              </Link>
            </div>
          </SafeArea>
        </section>
      )}

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
