import { Link } from 'react-router-dom';

import { Locale } from '../../../models/_commons/localized';
import { paths } from '../../../config/routes';
import { siteMeta } from '../../../seo/pages';
import Icon from '../icon';
import { firstProjectClient } from '../../../content/first-project';

export interface FirstProjectNoticeProps {
  locale: Locale;
}

/**
 * Shown where case studies would be, until the first verified one is added
 * in the admin. States plainly where the company is, instead of showing
 * sample results.
 */
const FirstProjectNotice = (props: FirstProjectNoticeProps) => {
  const { locale } = props;
  const meta = siteMeta(locale);

  return (
    <div className="mx-auto w-full max-w-[880px] card-premium bg-gradient-caas-soft p-7 lg:p-10 gap-y-4 flex flex-col items-start">
      <span className="kicker">
        <Icon name="snowflake" size={14} />
        {meta.firstProjectKicker}
      </span>
      <h3 className="text-2xl lg:text-3hxl font-semibold tracking-tight text-text-main">
        {meta.firstProjectTitle}
      </h3>
      <p className="text-base lg:text-lg text-text-muted">
        {meta.firstProjectText.replace('{client}', firstProjectClient(locale))}
      </p>
      <div className="gap-x-6 gap-y-2 flex flex-col sm:flex-row">
        <Link
          className="text-base lg:text-lg font-medium text-brand-blue underline underline-offset-4"
          to={`/${locale}/insights/first-cooling-as-a-service-project-commissioning/`}
        >
          {meta.firstProjectUpdateLink}
        </Link>
        <Link
          className="text-base lg:text-lg font-medium text-brand-blue underline underline-offset-4"
          to={paths.page(locale, 'measurement-verification')}
        >
          {meta.firstProjectLink}
        </Link>
      </div>
    </div>
  );
};

export default FirstProjectNotice;
