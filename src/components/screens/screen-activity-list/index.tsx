import { PropsWithChildren, ReactElement, useEffect } from 'react';

import { l } from '../../../utils/localization-utils';
import { useVmScreen } from '../../../stores/vm-screen';
import { useVmScreenActivityList } from '../../../stores/vm-screen-activity-list';
import LayoutStandard from '../../layouts/layout-standard';
import SafeArea from '../../_commons/safe-area';
import ActivityGrid from '../../_commons/activity-grid';
import HlActivityBox from '../../_commons/hl-activity-box';
import Loading from '../../_commons/loading';

const ScreenActivityList = (props: PropsWithChildren): ReactElement => {
  const { locale = 'en', localizations = [] } = useVmScreen();

  const vmScreenActivityList = useVmScreenActivityList();
  const { loading, headActivity, otherActivities } = vmScreenActivityList;
  useEffect(() => {
    if (!vmScreenActivityList.bind) return;
    vmScreenActivityList.bind();
  }, [vmScreenActivityList]);

  return (
    <LayoutStandard>
      {!loading ? (
        <div className="py-20 flex flex-col justify-start items-stretch">
          <SafeArea>
            <div className="gap-y-16 flex flex-col justify-start items-stretch">
              <div className="gap-y-4 flex flex-col justify-start items-start">
                <span className="kicker">
                  {l(
                    locale,
                    localizations,
                    'activity-list.subtitle-activities'
                  )}
                </span>
                <h1 className="font-semibold text-5xl lg:text-6hxl leading-none text-text-main">
                  {l(locale, localizations, 'activity-list.title-activities')}
                </h1>
                <span className="text-base lg:text-lg text-text-muted max-w-[720px]">
                  {l(locale, localizations, 'activity-list.excerpt-activities')}
                </span>
              </div>
              {headActivity && (
                <div className="flex flex-col justify-start items-stretch">
                  <HlActivityBox locale={locale} activity={headActivity} />
                </div>
              )}
              {otherActivities && (
                <ActivityGrid locale={locale} activities={otherActivities} />
              )}
            </div>
          </SafeArea>
        </div>
      ) : (
        <Loading />
      )}
    </LayoutStandard>
  );
};

export default ScreenActivityList;
