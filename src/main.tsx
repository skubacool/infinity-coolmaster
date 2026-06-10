import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import 'react-photo-view/dist/react-photo-view.css';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
