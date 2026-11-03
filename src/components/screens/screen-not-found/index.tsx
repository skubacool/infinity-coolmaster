import { Link } from 'react-router-dom';

import { useVmScreen } from '../../../stores/vm-screen';
import { paths } from '../../../config/routes';
import { siteMeta } from '../../../seo/pages';
import LayoutStandard from '../../layouts/layout-standard';
import SafeArea from '../../_commons/safe-area';

/** Shown for unknown URLs; the static 404.html is this page pre-rendered. */
const ScreenNotFound = () => {
  const { locale = 'en' } = useVmScreen();
  const text = siteMeta(locale).notFound;

  return (
    <LayoutStandard>
      <section className="py-24 lg:py-32 flex flex-col justify-start items-stretch">
        <SafeArea>
          <div className="gap-y-6 flex flex-col justify-start items-start">
            <span className="kicker">404</span>
            <h1 className="text-4xl lg:text-6hxl font-semibold leading-[1.15] text-text-main">
              {text.h1}
            </h1>
            <p className="text-base lg:text-lg text-text-muted">{text.intro}</p>
            <Link className="btn-caas" to={paths.home(locale)}>
              {text.backHome}
            </Link>
          </div>
        </SafeArea>
      </section>
    </LayoutStandard>
  );
};

export default ScreenNotFound;
