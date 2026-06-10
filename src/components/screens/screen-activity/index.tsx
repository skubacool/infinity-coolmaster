import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { l } from '../../../utils/localization-utils';
import { useVmScreen } from '../../../stores/vm-screen';
import { useVmScreenActivity } from '../../../stores/vm-screen-activity';
import LayoutStandard from '../../layouts/layout-standard';
import SectionDetails from './sections/section-details';
import SectionNext from '../../sections/section-next';
import Loading from '../../_commons/loading';

const ScreenActivity = () => {
  const params = useParams();
  const { id } = params;

  const { locale = 'en', localizations = [] } = useVmScreen();

  const vmScreenActivity = useVmScreenActivity();
  const { activity, loading } = vmScreenActivity;
  const { nextActivityId } = activity ?? {};

  const url = useMemo(
    () => `/${locale}/activity/${nextActivityId}`,
    [locale, nextActivityId]
  );

  useEffect(() => {
    if (!vmScreenActivity.bind) return;
    vmScreenActivity.bind(id ?? '');
  }, [id, vmScreenActivity]);

  return (
    <LayoutStandard>
      {!loading ? (
        <>
          <SectionDetails />
          {nextActivityId && (
            <SectionNext
              url={url}
              text={l(locale, localizations, 'activity.next-activity')}
            />
          )}
        </>
      ) : (
        <Loading />
      )}
    </LayoutStandard>
  );
};

export default ScreenActivity;
