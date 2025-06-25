import { CurrentAppProvider } from '@openedx/frontend-base';

import { appId } from './constants';
import ExamplePage from './example/ExamplePage';

import './app.scss';

const Main = () => (
  <CurrentAppProvider appId={appId}>
    <ExamplePage />
  </CurrentAppProvider>
);

export default Main;
