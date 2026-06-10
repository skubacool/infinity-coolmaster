import { PropsWithChildren, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { localizedDate } from '../../../utils/date-utils';
import { Locale } from '../../../models/_commons/localized';
import { Activity } from '../../../models/activity';
import ActivityTag, { ActivityTagSize } from '../activity-tag';

export interface MiniActivityBoxProps {
  locale?: Locale;
  activity: Activity;
}

const MiniActivityBox = (props: PropsWithChildren<MiniActivityBoxProps>) => {
  const { locale = 'en', activity } = props;
  const { id, thumbnail, tag, title, publishedAt } = activity;

  const localizedTitle = useMemo(() => {
    if (!title) return '';
    return title[locale];
  }, [locale, title]);

  return (
    <Link to={`/${locale}/activity/${id}`}>
      <div className="gap-x-3 flex flex-row justify-start items-stretch">
        <div
          className="flex-1 max-w-[154px] aspect-[154/105] rounded-lg overflow-hidden border border-sep-pale bg-pale"
          style={{ background: `url(${thumbnail}) no-repeat center/cover` }}
        />
        <div className="gap-y-2 flex-1 flex flex-col justify-start items-stretch">
          {tag && (
            <div className="gap-x-4 flex flex-row justify-start items-start">
              <ActivityTag
                locale={locale}
                tag={tag}
                size={ActivityTagSize.small}
              />
            </div>
          )}
          <h2 className="text-base font-medium leading-[1.2] line-clamp-2 text-text-main">
            {localizedTitle}
          </h2>
          <div className="flex-1" />
          <span className="block text-xs text-date-light">
            {localizedDate(locale, publishedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MiniActivityBox;
