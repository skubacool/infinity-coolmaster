import { useMemo } from 'react';

import { l } from '../../../../../utils/localization-utils';
import { useVmScreen } from '../../../../../stores/vm-screen';
import { useVmScreenActivity } from '../../../../../stores/vm-screen-activity';
import ActivityBoxDetails, {
  ActivityBoxDetailsMode,
} from '../../../../_commons/activity-box-details';
import SafeArea from '../../../../_commons/safe-area';
import MiniActivityBox from '../../../../_commons/mini-activity-box';
import TextLines from '../../../../_commons/text-lines';

const SectionDetails = () => {
  const { locale = 'en', localizations = [] } = useVmScreen();

  const { activity, otherActivities = [] } = useVmScreenActivity();
  const { banner, thumbnail, details } = activity ?? {};

  const bannerUrl = useMemo(() => banner ?? '', [banner]);
  const thumbnailUrl = useMemo(() => thumbnail ?? '', [thumbnail]);

  const localizedDetails = useMemo(() => {
    if (!details) return '';
    return details[locale];
  }, [locale, details]);

  if (!activity) return null;
  return (
    <section className="pt-10 pb-16 lg:py-20 flex flex-col justify-start items-stretch">
      <SafeArea>
        <div className="gap-y-16 flex flex-col justify-start items-stretch">
          <div className="gap-y-12 lg:gap-y-16 flex flex-col justify-start items-stretch">
            <ActivityBoxDetails
              locale={locale}
              activity={activity}
              mode={ActivityBoxDetailsMode.title}
            />
            <div className="flex flex-col justify-start items-stretch">
              <div
                className="hidden lg:block h-[480px] rounded-2xl overflow-hidden border border-sep-pale"
                style={{
                  background: `url(${bannerUrl}) no-repeat center/cover`,
                }}
              />
              <img
                alt="Banner"
                className="block lg:hidden w-full h-auto rounded-xl border border-sep-pale"
                src={thumbnailUrl}
              />
            </div>
          </div>
          <div className="gap-y-16 lg:gap-y-0 lg:gap-x-16 flex flex-col lg:flex-row justify-start items-start">
            <div className="flex-1 flex flex-col justify-start items-stretch">
              <p className="text-text-muted text-base lg:text-lg leading-relaxed">
                <TextLines text={localizedDetails} />
              </p>
            </div>
            <div className="gap-y-6 flex-1 lg:max-w-80 flex flex-col justify-start items-stretch">
              <h3 className="text-title-light text-base lg:text-xl uppercase tracking-wider">
                {l(locale, localizations, 'activity.other-activities')}
              </h3>
              <ul className="gap-y-6 flex flex-col justify-start items-stretch">
                {otherActivities.map((activity) => {
                  const { id } = activity;
                  return (
                    <li key={id}>
                      <MiniActivityBox locale={locale} activity={activity} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </SafeArea>
    </section>
  );
};

export default SectionDetails;
