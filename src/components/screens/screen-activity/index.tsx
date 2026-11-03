import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { l } from '../../../utils/localization-utils';
import { activitySlug, paths } from '../../../config/routes';
import { useVmScreen } from '../../../stores/vm-screen';
import { useVmScreenActivity } from '../../../stores/vm-screen-activity';
import LayoutStandard from '../../layouts/layout-standard';
import SectionDetails from './sections/section-details';
import SectionNext from '../../sections/section-next';
import Loading from '../../_commons/loading';
import ScreenNotFound from '../screen-not-found';

const ScreenActivity = () => {
  const { slug = '' } = useParams();

  const { locale = 'en', localizations = [] } = useVmScreen();

  const vmScreenActivity = useVmScreenActivity();
  const { activity, nextActivity, loading, resolved } = vmScreenActivity;

  useEffect(() => {
    if (!vmScreenActivity.bind) return;
    vmScreenActivity.bind(slug);
  }, [slug, vmScreenActivity]);

  if (!activity && resolved === slug && !loading) return <ScreenNotFound />;
  // Old numeric links (/insights/1/) move to the descriptive URL.
  if (activity && activitySlug(activity) !== slug) {
    return <Navigate to={paths.insight(locale, activity)} replace />;
  }

  return (
    <LayoutStandard>
      {activity ? (
        <>
          <SectionDetails />
          {nextActivity && (
            <SectionNext
              url={paths.insight(locale, nextActivity)}
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
