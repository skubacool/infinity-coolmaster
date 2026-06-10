import { PropsWithChildren } from 'react';

import { Locale } from '../../../models/_commons/localized';
import { Activity } from '../../../models/activity';
import ActivityBox from '../activity-box';

export interface ActivityGridProps {
  locale?: Locale;
  activities: Activity[];
}

const ActivityGrid = (props: PropsWithChildren<ActivityGridProps>) => {
  const { locale = 'en', activities } = props;
  return (
    <ul className="lg:gap-x-8 gap-y-16 lg:gap-y-20 grid grid-cols-1 lg:grid-cols-3">
      {activities.map((activity: Activity) => {
        const { id } = activity;
        return (
          <li key={id}>
            <ActivityBox locale={locale} activity={activity} />
          </li>
        );
      })}
    </ul>
  );
};

export default ActivityGrid;
