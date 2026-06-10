import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { Locale } from '../../../models/_commons/localized';
import { Activity } from '../../../models/activity';
import ActivityBox from '../activity-box';
import ActivityBoxDetails from '../activity-box-details';

export interface HlActivityBoxProps {
  locale?: Locale;
  activity: Activity;
}

const HlActivityBox = (props: PropsWithChildren<HlActivityBoxProps>) => {
  const { locale = 'en', activity } = props;
  const { id, thumbnail } = activity;

  return (
    <div className="flex flex-col justify-start items-stretch">
      <Link to={`/${locale}/activity/${id}`}>
        <div className="gap-x-10 hidden lg:flex flex-row justify-start items-stretch">
          <div
            className="max-w-[722px] h-[406px] flex-1 rounded-2xl overflow-hidden border border-sep-pale bg-pale"
            style={{ background: `url(${thumbnail}) no-repeat center/cover` }}
          />
          <div className="pt-2 flex-1 flex flex-col justify-start items-start">
            <ActivityBoxDetails locale={locale} activity={activity} />
          </div>
        </div>
      </Link>
      <div className="lg:hidden flex flex-col justify-start items-stretch">
        <ActivityBox locale={locale} activity={activity} />
      </div>
    </div>
  );
};

export default HlActivityBox;
