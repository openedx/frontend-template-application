import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { ErrorPage } from '@edx/frontend-platform/react';
import { createRoot } from 'react-dom/client';

import redirectToLoginIfUnauthenticated from './auth/redirectToLoginIfUnauthenticated';
import messages from './i18n';
import App from './App';
import './index.scss';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container not found');
}

const root = createRoot(container);

subscribe(APP_READY, () => {
  if (redirectToLoginIfUnauthenticated()) {
    return;
  }

  root.render(<App />);
});

subscribe(APP_INIT_ERROR, (error) => {
  root.render(<ErrorPage message={error?.message} />);
});

initialize({ messages });
