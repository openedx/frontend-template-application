import 'babel-polyfill';

import { App, AppProvider, APP_ERROR, APP_READY, ErrorPage, APP_AUTHENTICATED } from '@edx/frontend-base';
import React from 'react';
import ReactDOM from 'react-dom';

import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';

import appMessages from './i18n';
import configureStore from './store';
import ExamplePage from './example/ExamplePage';

import './index.scss';
import './assets/favicon.ico';

App.subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={configureStore()}>
      <Header />
      <main>
        <ExamplePage />
      </main>
      <Footer />
    </AppProvider>,
    document.getElementById('root'),
  );
});

App.subscribe(APP_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

App.initialize({
  messages: [
    appMessages,
    headerMessages,
    footerMessages,
  ],
});
