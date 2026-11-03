import { PropsWithChildren, ReactElement, useEffect, useRef } from 'react';
import {
  Route,
  Navigate,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';

import ScreenFront from './components/screens/screen-front';
import ScreenActivityList from './components/screens/screen-activity-list';
import ScreenProjectList from './components/screens/screen-project-list';
import ScreenAbout from './components/screens/screen-about';
import ScreenProject from './components/screens/screen-project';
import ScreenActivity from './components/screens/screen-activity';
import ScreenAdmin from './components/screens/screen-admin';
import ScreenPage from './components/screens/screen-page';
import ScreenNotFound from './components/screens/screen-not-found';
import { IVmScreen, useVmScreen } from './stores/vm-screen';
import { DEFAULT_LOCALE } from './config/constants';
import { trackPageView } from './utils/analytics';
import { applyHead } from './seo/head';
import { resolvePage } from './seo/resolve';

const ScrollToTopWrapper = (props: PropsWithChildren) => {
  const { children } = props;

  const { pathname, hash } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    if (hash) return;
    document.documentElement.scrollTo(0, 0);
  }, [pathname, hash]);

  // Keep <title>, description, canonical, hreflang and JSON-LD in step with
  // the route. The first page arrives with them pre-rendered, so the first
  // run only needs to cover pages that were not (dev server, 404 fallback).
  useEffect(() => {
    const skip = firstRender.current && !!window.__ICM_SEED__;
    firstRender.current = false;
    let cancelled = false;
    (async () => {
      if (!skip) {
        try {
          const { head } = await resolvePage(pathname);
          if (cancelled) return;
          applyHead(head);
        } catch (error) {
          console.error('>>error<< resolve head', error);
        }
      }
      // Count every route as its own GA4 page view (SPA navigation never reloads).
      if (!cancelled) trackPageView(pathname);
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return <>{children}</>;
};

const AppScreen = (props: PropsWithChildren) => {
  const { children } = props;

  const vmScreen: IVmScreen = useVmScreen();
  useEffect(() => {
    if (!vmScreen.bind) return;
    vmScreen.bind();
  }, [vmScreen]);

  return <>{children}</>;
};

/** Only /en/... and /th/... exist; anything else is a 404. */
const LocaleGuard = (props: PropsWithChildren) => {
  const { locale } = useParams();
  if (locale !== 'en' && locale !== 'th') return <ScreenNotFound />;
  return <>{props.children}</>;
};

const guarded = (element: ReactElement) => <LocaleGuard>{element}</LocaleGuard>;

/**
 * Routes use real paths (history API). The router itself is supplied by the
 * entry point: <BrowserRouter> in the browser (main.tsx) and <StaticRouter>
 * when pages are pre-rendered at build time (entry-server.tsx). Old /#/...
 * links are redirected by the inline script in index.html.
 */
function App() {
  return (
    <AppScreen>
      <ScrollToTopWrapper>
        <Routes>
          {/* Hidden content manager (login-token protected) */}
          <Route path="/admin" element={<ScreenAdmin />} />
          <Route path="/:locale" element={guarded(<ScreenFront />)} />
          <Route path="/:locale/about" element={guarded(<ScreenAbout />)} />
          <Route
            path="/:locale/case-studies"
            element={guarded(<ScreenProjectList />)}
          />
          <Route
            path="/:locale/case-studies/:slug"
            element={guarded(<ScreenProject />)}
          />
          <Route
            path="/:locale/insights"
            element={guarded(<ScreenActivityList />)}
          />
          <Route
            path="/:locale/insights/:slug"
            element={guarded(<ScreenActivity />)}
          />
          <Route path="/:locale/:page" element={guarded(<ScreenPage />)} />
          <Route
            path="/"
            element={<Navigate to={`/${DEFAULT_LOCALE}/`} replace />}
          />
          <Route path="*" element={<ScreenNotFound />} />
        </Routes>
      </ScrollToTopWrapper>
    </AppScreen>
  );
}

export default App;
