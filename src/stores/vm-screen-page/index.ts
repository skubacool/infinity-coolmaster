import { useCallback } from 'react';
import { useAtom } from 'jotai';

import { seededAtom } from '../../lib/seed';
import { Locale } from '../../models/_commons/localized';
import { Activity } from '../../models/activity';
import { PageKey } from '../../config/routes';
import { PageBody } from '../../content/types';
import { loadPageBody } from '../../content';
import { GUIDES_BY_PAGE } from '../../content/articles/related';
import { listActivities } from '../../apis/activity';

export type GuideLink = Pick<Activity, 'id' | 'slug' | 'title'>;

/** Which page ("th/hotels") the body and guides below belong to. */
const forState = seededAtom<string | null>('page.for', null);
const bodyState = seededAtom<PageBody | null>('page.body', null);
const guidesState = seededAtom<GuideLink[]>('page.guides', []);

/** Body copy and "Further reading" links for a standalone page. */
export const resolvePageContent = async (
  locale: Locale,
  key: PageKey
): Promise<{ body: PageBody | null; guides: GuideLink[] }> => {
  const [body, activities] = await Promise.all([
    loadPageBody(locale, key),
    listActivities(),
  ]);
  const guides = (GUIDES_BY_PAGE[key] ?? [])
    .map((slug) => activities.find((a) => a.slug === slug))
    .filter((a): a is Activity => !!a)
    .map(({ id, slug, title }) => ({ id, slug, title }));
  return { body, guides };
};

export interface IVmScreenPage {
  body?: PageBody | null;
  guides?: GuideLink[];
  /** True when the body and guides belong to the page being shown. */
  isFor?: (locale: Locale, key: PageKey) => boolean;
  bind?: (locale: Locale, key: PageKey) => void;
}

const store: IVmScreenPage = {};

/** The page most recently asked for; older, slower loads are discarded. */
let latestWanted: string | null = null;

export const useVmScreenPage = (): IVmScreenPage => {
  const [pageFor, setPageFor] = useAtom(forState);
  const [body, setBody] = useAtom(bodyState);
  const [guides, setGuides] = useAtom(guidesState);

  const bind = useCallback(
    (locale: Locale, key: PageKey) => {
      const wanted = `${locale}/${key}`;
      // Pre-rendered pages arrive with their content already in place.
      latestWanted = wanted;
      if (pageFor === wanted) return;
      (async () => {
        try {
          const result = await resolvePageContent(locale, key);
          // The visitor moved on to another page while this one loaded.
          if (latestWanted !== wanted) return;
          setBody(result.body);
          setGuides(result.guides);
          setPageFor(wanted);
        } catch (error) {
          console.error('>>error<< vm-screen-page bind', error);
        }
      })();
    },
    [pageFor, setBody, setGuides, setPageFor]
  );

  store.body = body;
  store.guides = guides;
  store.isFor = (locale, key) => pageFor === `${locale}/${key}`;
  store.bind = bind;
  return store;
};
