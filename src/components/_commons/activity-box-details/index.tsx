import { PropsWithChildren, useMemo } from 'react';

import { Locale } from '../../../models/_commons/localized';
import { Activity } from '../../../models/activity';
import { l } from '../../../utils/localization-utils';
import { localizedDate } from '../../../utils/date-utils';
import { useVmScreen } from '../../../stores/vm-screen';
import ActivityTag from '../activity-tag';
import Icon from '../icon';
import { readableOnWhite } from '../../../utils/color-utils';

export enum ActivityBoxDetailsMode {
  full = 'full',
  title = 'title',
}

export interface ActivityBoxDetailsProps {
  locale?: Locale;
  mode?: ActivityBoxDetailsMode;
  activity: Activity;
}

const ActivityBoxDetails = (
  props: PropsWithChildren<ActivityBoxDetailsProps>
) => {
  const { localizations = [] } = useVmScreen();

  const { locale = 'en', mode = ActivityBoxDetailsMode.full, activity } = props;
  const { title, excerpt, tag, publishedAt, type } = activity;

  const localizedType = useMemo(() => {
    if (!type?.title) return '';
    return type.title[locale];
  }, [locale, type]);

  const localizedTitle = useMemo(() => {
    if (!title) return '';
    return title[locale];
  }, [locale, title]);

  const localizedExcerpt = useMemo(() => {
    if (!excerpt) return '';
    return excerpt[locale];
  }, [locale, excerpt]);

  const topMargin = useMemo(
    () => (mode === ActivityBoxDetailsMode.full ? 'mt-5 lg:mt-6' : ''),
    [mode]
  );

  const TitleTag = mode === ActivityBoxDetailsMode.title ? 'h1' : 'h2';

  const titleLineClamp = useMemo(
    () => (mode === ActivityBoxDetailsMode.full ? 'line-clamp-3' : ''),
    [mode]
  );

  const dateAndType = useMemo(() => {
    return (
      <div className="mt-4 gap-x-3 flex flex-row justify-start items-center text-xs lg:text-sm uppercase tracking-wide">
        <span className="block text-date-light">
          {localizedDate(locale, publishedAt)}
        </span>
        {type && (
          <>
            <div className="self-stretch w-px bg-sep-smoke" />
            <span
              className="block"
              style={{ color: readableOnWhite(type.color) }}
            >
              {localizedType}
            </span>
          </>
        )}
      </div>
    );
  }, [locale, localizedType, publishedAt, type]);

  return (
    <div className="flex flex-col justify-start items-stretch">
      {tag && (
        <div
          className={`${topMargin} gap-x-4 flex flex-row justify-start items-stretch`}
        >
          <ActivityTag locale={locale} tag={tag} />
        </div>
      )}
      {mode === ActivityBoxDetailsMode.full ? dateAndType : null}
      {/* On the article page the title is the page's H1; on cards an H2. */}
      <TitleTag
        className={`${
          mode === ActivityBoxDetailsMode.full
            ? 'mt-4 text-xl lg:text-2xl'
            : 'mt-6 text-2xl lg:text-3hxl'
        } font-semibold leading-[1.25] text-text-main ${titleLineClamp}`}
      >
        {localizedTitle}
      </TitleTag>
      {mode === ActivityBoxDetailsMode.title ? dateAndType : null}
      {mode !== ActivityBoxDetailsMode.full || !excerpt ? null : (
        <span className="mt-5 lg:mt-3 text-base text-text-muted line-clamp-3">
          {localizedExcerpt}
        </span>
      )}
      {mode !== ActivityBoxDetailsMode.full ? null : (
        <div className="mt-5 gap-x-2 flex flex-row justify-start items-center text-brand-blue-ink">
          <span className="text-sm lg:text-base font-medium underline underline-offset-4">
            {l(locale, localizations, 'general.read-more')}
          </span>
          <Icon name="arrow-right" size={16} />
        </div>
      )}
    </div>
  );
};

export default ActivityBoxDetails;
