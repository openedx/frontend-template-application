import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import { createRoot } from 'react-dom/client';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import Header from '@edx/frontend-component-header';
import { FooterSlot } from '@edx/frontend-component-footer';
import messages from './i18n';
import ExamplePage from './example/ExamplePage';

import './index.scss';

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container!);

subscribe(APP_READY, () => {
  root.render(
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <ExamplePage />
        <FooterSlot />
      </QueryClientProvider>
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error: { message: any }) => {
  root.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages,
});
