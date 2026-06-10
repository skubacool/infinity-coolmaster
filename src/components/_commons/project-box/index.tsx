import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Locale } from '../../../models/_commons/localized';
import { Project } from '../../../models/project';
import { useVmScreen } from '../../../stores/vm-screen';
import { l } from '../../../utils/localization-utils';
import ProjectDetailRow from '../project-detail-row';

export interface ProjectBoxProps {
  locale?: Locale;
  project: Project;
}

const ProjectBox = (props: PropsWithChildren<ProjectBoxProps>) => {
  const { localizations = [], windowWidth } = useVmScreen();

  const { locale = 'en', project } = props;
  const {
    id,
    thumbnail,
    title,
    excerpt,
    client,
    location,
    capacityTr,
    savingsPct,
  } = project;

  const [isLongText, setLongText] = useState<boolean>(false);

  const localizedTitle = useMemo(() => title[locale] ?? '', [title, locale]);

  const localizedExcerpt = useMemo(
    () => excerpt[locale] ?? '',
    [excerpt, locale]
  );

  const localizedClient = useMemo(() => client[locale] ?? '', [client, locale]);

  const localizedLocation = useMemo(
    () => location[locale] ?? '',
    [location, locale]
  );

  useEffect(() => {
    if (!windowWidth || windowWidth <= 1024) {
      return setLongText(false);
    }
    setLongText(true);
  }, [localizedClient, windowWidth]);

  return (
    <Link to={`/${locale}/project/${id}`}>
      <div className="card-premium h-full overflow-hidden flex flex-col justify-start items-stretch transition-all duration-200 hover:shadow-premium-md hover:-translate-y-0.5">
        <div
          className="flex-shrink-0 aspect-[1.45] bg-pale"
          style={{ background: `url(${thumbnail}) no-repeat center/cover` }}
        />
        <div className="p-6 flex-1 flex flex-col justify-start items-stretch">
          <h2 className="flex-shrink-0 block text-xl lg:text-2hxl font-semibold leading-[1.25] text-text-main">
            {localizedTitle}
          </h2>
          <div className="flex-1" />
          <span className="mt-3 text-sm lg:text-base text-text-muted line-clamp-3">
            {localizedExcerpt}
          </span>
          <div className="flex-shrink-0 my-5 h-px bg-sep-pale" />
          <ul className="flex-shrink-0 gap-4 grid grid-cols-2">
            <li>
              <ProjectDetailRow
                title={l(locale, localizations, 'project-box.client')}
                isLongText={isLongText}
                text={localizedClient}
              />
            </li>
            <li>
              <ProjectDetailRow
                title={l(locale, localizations, 'project-box.location')}
                isLongText={isLongText}
                text={localizedLocation}
              />
            </li>
            <li>
              <ProjectDetailRow
                title={l(locale, localizations, 'project-box.capacity')}
                text={`${capacityTr.toLocaleString()} TR`}
              />
            </li>
            <li>
              <ProjectDetailRow
                isCta
                title={l(locale, localizations, 'project-box.savings')}
                text={`-${savingsPct}%`}
              />
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default ProjectBox;
