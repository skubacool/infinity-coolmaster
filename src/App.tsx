import { PropsWithChildren, useEffect } from 'react';
import { HashRouter, Route, Navigate, Routes, useLocation } from 'react-router-dom';

import ScreenFront from './components/screens/screen-front';
import ScreenActivityList from './components/screens/screen-activity-list';
import ScreenProjectList from './components/screens/screen-project-list';
import ScreenAbout from './components/screens/screen-about';
import ScreenProject from './components/screens/screen-project';
import ScreenActivity from './components/screens/screen-activity';
import ScreenAdmin from './components/screens/screen-admin';
import { IVmScreen, useVmScreen } from './stores/vm-screen';
import { DEFAULT_LOCALE } from './config/constants';
import { trackPageView } from './utils/analytics';

const ScrollToTopWrapper = (props: PropsWithChildren) => {
  const { children } = props;

  const { pathname } = useLocation();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    document.documentElement.scrollTo(0, 0);
  }, [pathname, hash]);

  // Count every route as its own GA4 page view (SPA navigation never reloads).
  useEffect(() => {
    trackPageView(pathname);
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

/**
 * HashRouter keeps deep links working on GitHub Pages, which has no
 * server-side rewrite for HTML5 pushState routes (refreshes would 404).
 */
function App() {
  return (
    <HashRouter>
      <AppScreen>
        <ScrollToTopWrapper>
          <Routes>
            {/* Hidden content manager (Supabase Auth protected) */}
            <Route path="/admin" element={<ScreenAdmin />} />
            <Route path="/:locale/" element={<ScreenFront />} />
            <Route path="/:locale/activity" element={<ScreenActivityList />} />
            <Route path="/:locale/activity/:id" element={<ScreenActivity />} />
            <Route path="/:locale/project" element={<ScreenProjectList />} />
            <Route path="/:locale/project/:id" element={<ScreenProject />} />
            <Route path="/:locale/about" element={<ScreenAbout />} />
            <Route path="/:locale/contact" element={<ScreenAbout />} />
            <Route
              path="/"
              element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />}
            />
            <Route
              path="*"
              element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />}
            />
          </Routes>
        </ScrollToTopWrapper>
      </AppScreen>
    </HashRouter>
  );
}

export default App;
