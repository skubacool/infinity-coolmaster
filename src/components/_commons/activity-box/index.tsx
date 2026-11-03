import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { Locale } from '../../../models/_commons/localized';
import { Activity } from '../../../models/activity';
import ActivityBoxDetails from '../activity-box-details';
import { paths } from '../../../config/routes';

export interface ActivityBoxProps {
  locale?: Locale;
  activity: Activity;
}

const ActivityBox = (props: PropsWithChildren<ActivityBoxProps>) => {
  const { locale = 'en', activity } = props;
  const { thumbnail } = activity;

  return (
    <Link to={paths.insight(locale, activity)}>
      <div className="flex flex-col justify-start items-stretch group">
        <div
          className="aspect-[1.45] rounded-xl overflow-hidden border border-sep-pale bg-pale transition-all duration-200 group-hover:shadow-premium-md"
          style={{ background: `url(${thumbnail}) no-repeat center/cover` }}
        />
        <ActivityBoxDetails locale={locale} activity={activity} />
      </div>
    </Link>
  );
};

export default ActivityBox;
