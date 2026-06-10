import { l } from '../../../../../utils/localization-utils';
import { useVmScreen } from '../../../../../stores/vm-screen';
import { useVmScreenFront } from '../../../../../stores/vm-screen-front';
import SafeArea from '../../../../_commons/safe-area';
import ActivityGrid from '../../../../_commons/activity-grid';

const SectionActivities = () => {
  const { locale = 'en', localizations = [] } = useVmScreen();
  const { activities = [] } = useVmScreenFront();

  return (
    <div className="py-12 lg:py-20 bg-bg-soft flex flex-col justify-start items-stretch">
      <SafeArea>
        <div className="gap-y-10 lg:gap-y-14 flex flex-col justify-start items-stretch">
          <h2 className="text-center text-text-main text-2xl lg:text-4hxl font-semibold">
            {l(locale, localizations, 'front.title-activities')}
          </h2>
          <ActivityGrid locale={locale} activities={activities} />
        </div>
      </SafeArea>
    </div>
  );
};

export default SectionActivities;
