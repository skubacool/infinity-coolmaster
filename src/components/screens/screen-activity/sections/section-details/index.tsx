import { useMemo } from 'react';

import { l } from '../../../../../utils/localization-utils';
import { useVmScreen } from '../../../../../stores/vm-screen';
import { useVmScreenActivity } from '../../../../../stores/vm-screen-activity';
import ActivityBoxDetails, {
  ActivityBoxDetailsMode,
} from '../../../../_commons/activity-box-details';
import SafeArea from '../../../../_commons/safe-area';
import MiniActivityBox from '../../../../_commons/mini-activity-box';
import { Link } from 'react-router-dom';
import RichText, {
  extractHeadings,
  readingMinutes,
} from '../../../../_commons/rich-text';
import {
  KeyPointsBox,
  ShareBar,
  TableOfContents,
} from '../../../../_commons/article-extras';
import { SITE_ORIGIN } from '../../../../../config/routes';
import { isPageKey, PageKey, paths } from '../../../../../config/routes';
import { isDraftPage, siteMeta } from '../../../../../seo/pages';
import { localizedDate } from '../../../../../utils/date-utils';

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

  const meta = siteMeta(locale);
  // Every article ends with a route to the contact page.
  const linked: PageKey[] = (activity?.relatedPages ?? []).filter(
    (key): key is PageKey => isPageKey(key) && !isDraftPage(key)
  );
  const relatedPages: PageKey[] = [...linked, 'contact' as PageKey].filter(
    (key, index, all) => all.indexOf(key) === index
  );

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
                alt={activity.title[locale]}
                decoding="async"
                className="block lg:hidden w-full h-auto rounded-xl border border-sep-pale"
                src={thumbnailUrl}
              />
            </div>
          </div>
          <div className="gap-y-16 lg:gap-y-0 lg:gap-x-16 flex flex-col lg:flex-row justify-start items-start">
            <div className="flex-1 flex flex-col justify-start items-stretch">
              <p className="mb-6 text-sm text-text-muted">
                {meta.readingTime(readingMinutes(localizedDetails))}
              </p>
              <KeyPointsBox
                locale={locale}
                text={activity.keyPoints?.[locale]}
              />
              <TableOfContents
                locale={locale}
                headings={extractHeadings(localizedDetails)}
              />
              <div className="text-text-muted text-base lg:text-lg leading-relaxed">
                <RichText text={localizedDetails} />
              </div>
              <ShareBar
                locale={locale}
                url={`${SITE_ORIGIN}${paths.insight(locale, activity)}`}
                title={activity.title[locale]}
              />
              {activity.updatedAt &&
                activity.updatedAt !== activity.publishedAt && (
                  <p className="mt-8 text-sm text-text-muted">
                    {meta.lastUpdated}:{' '}
                    {localizedDate(locale, activity.updatedAt)}
                  </p>
                )}
              {relatedPages.length > 0 && (
                <div className="mt-10 rounded-2xl border border-sep-pale bg-bg-soft p-6 gap-y-3 flex flex-col">
                  <span className="text-sm uppercase tracking-wider text-title-light">
                    {meta.relatedPages}
                  </span>
                  <ul className="gap-y-2 flex flex-col">
                    {relatedPages.map((key) => (
                      <li key={key}>
                        <Link
                          className="text-base lg:text-lg font-medium text-brand-blue-ink underline underline-offset-4"
                          to={paths.page(locale, key)}
                        >
                          {meta.pages[key].h1}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
