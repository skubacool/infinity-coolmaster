import { useMemo } from 'react';

import { l } from '../../../../../utils/localization-utils';
import { useVmScreen } from '../../../../../stores/vm-screen';
import { useVmScreenProject } from '../../../../../stores/vm-screen-project';
import SectionTwoCols from '../../../../sections/section-two-cols';
import ContentTitle from '../../../../_commons/content-title';
import ContentItem from '../../../../_commons/content-item';
import PhotoGallery from '../../../../_commons/photo-gallery';
import TextLines from '../../../../_commons/text-lines';
import Icon from '../../../../_commons/icon';

const SectionDetails = () => {
  const vmScreen = useVmScreen();
  const { locale = 'en', localizations = [] } = vmScreen;

  const vmScreenProject = useVmScreenProject();
  const { project } = vmScreenProject;

  const {
    title,
    location,
    client,
    capacityTr,
    savingsPct,
    details,
    completion,
    energySavedKwh,
    co2AvoidedTons,
    photos = [],
  } = project || {};

  const localizedTitle = useMemo(
    () => (title ? title[locale] : ''),
    [locale, title]
  );

  const localizedClient = useMemo(
    () => (client ? client[locale] : ''),
    [locale, client]
  );

  const localizedLocation = useMemo(
    () => (location ? location[locale] : ''),
    [locale, location]
  );

  const localizedDetails = useMemo(
    () => (details ? details[locale] : ''),
    [locale, details]
  );

  const screenTitle = useMemo(() => {
    return (
      <ContentTitle
        caption={l(locale, localizations, 'project.title-project')}
        title={localizedTitle}
        subtitle={
          capacityTr
            ? `${capacityTr.toLocaleString()} TR chilled-water plant under CaaS`
            : undefined
        }
      />
    );
  }, [locale, localizations, localizedTitle, capacityTr]);

  const colEnd = useMemo(() => {
    return (
      <div className="flex flex-col justify-start items-stretch">
        <ul className="flex flex-col justify-start items-stretch">
          <li>
            <ContentItem
              isCta
              title={l(locale, localizations, 'project-box.savings')}
              text={`-${savingsPct ?? 0}%`}
            />
            <ContentItem
              title={l(locale, localizations, 'project-box.capacity')}
              text={`${(capacityTr ?? 0).toLocaleString()} TR`}
            />
            <ContentItem
              title={l(locale, localizations, 'project-box.location')}
              text={`${localizedLocation}`}
            />
            <ContentItem
              title={l(locale, localizations, 'project-box.client')}
              text={localizedClient}
            />
            <ContentItem
              title={l(locale, localizations, 'project-box.completion')}
              text={`${completion ?? 0}`}
            />
          </li>
        </ul>
        <div className="gap-y-4 flex flex-col justify-start items-stretch">
          {energySavedKwh && (
            <div className="p-8 lg:p-10 gap-x-6 flex flex-row justify-center items-center rounded-3xl bg-gradient-caas-soft border border-sep-pale">
              <div className="flex-shrink-0 w-14 h-14 lg:w-[88px] lg:h-[88px] flex flex-col justify-center items-center bg-white rounded-full shadow-premium text-brand-green">
                <Icon name="bolt" size={32} />
              </div>
              <div className="gap-y-2 lg:gap-y-3 lg:min-w-60 flex flex-col justify-start items-start">
                <span className="text-title-light text-sm lg:text-base">
                  <TextLines
                    text={l(
                      locale,
                      localizations,
                      'project.title-energy-savings'
                    )}
                  />
                </span>
                <div className="gap-x-2 inline-flex flex-row justify-start items-end">
                  <span className="text-3xl lg:text-5xl font-semibold leading-none text-text-main">
                    {Number(energySavedKwh || 0).toLocaleString()}
                  </span>
                  <span className="text-sm lg:text-base text-text-muted">
                    {l(locale, localizations, 'general.kwh')}
                  </span>
                </div>
              </div>
            </div>
          )}
          {co2AvoidedTons && (
            <div className="p-8 lg:p-10 gap-y-4 flex flex-col justify-start items-center rounded-3xl bg-brand-green-soft border border-sep-pale">
              <div className="w-14 h-14 flex flex-col justify-center items-center bg-white rounded-full shadow-premium text-brand-green">
                <Icon name="leaf" size={28} />
              </div>
              <p className="text-base lg:text-xl text-title-light text-center">
                <TextLines
                  text={l(locale, localizations, 'project.title-co2-avoided')}
                />
              </p>
              <span className="text-center text-4xl lg:text-5xl font-semibold leading-none text-text-main">
                {(co2AvoidedTons ?? 0).toLocaleString()}
              </span>
              <span className="text-sm text-text-muted">
                {l(locale, localizations, 'general.tons-co2')}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }, [
    locale,
    localizations,
    capacityTr,
    savingsPct,
    localizedLocation,
    localizedClient,
    completion,
    energySavedKwh,
    co2AvoidedTons,
  ]);

  if (!project) return null;
  return (
    <div className="pt-20 pb-16 flex flex-col justify-start items-stretch">
      <SectionTwoCols title={screenTitle} colEnd={colEnd}>
        <div className="gap-y-16 flex flex-col justify-start items-stretch">
          <p className="text-text-muted text-base lg:text-lg leading-relaxed">
            <TextLines text={localizedDetails} />
          </p>
          <PhotoGallery locale={locale} photos={photos} />
        </div>
      </SectionTwoCols>
    </div>
  );
};

export default SectionDetails;
