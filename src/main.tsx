import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createStore, Provider } from 'jotai';

import './index.css';
import 'react-photo-view/dist/react-photo-view.css';

import App from './App';
import { applySeed } from './lib/seed';
import { installContactTracking } from './utils/analytics';

const container = document.getElementById('root') as HTMLElement;

installContactTracking();

// Pre-rendered pages carry the state they were rendered with. Apply it before
// the first render so React can hydrate the existing HTML instead of
// replacing it. A page served from 404.html (a URL with no file of its own)
// renders from scratch.
const seed = window.__ICM_SEED__;
const canHydrate =
  !!seed && seed.path === window.location.pathname && container.hasChildNodes();

const store = createStore();
if (canHydrate && seed) applySeed(store, seed.state);
if (!canHydrate) delete window.__ICM_SEED__;

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

if (canHydrate) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
