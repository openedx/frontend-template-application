import { CurrentAppProvider } from '@openedx/frontend-base';
import { Outlet } from 'react-router-dom';
import { appId } from './constants';

import './style.scss';

const Main = () => (
  <CurrentAppProvider appId={appId}>
    <main className="d-flex flex-column flex-grow-1">
      <Outlet />
    </main>
  </CurrentAppProvider>
);

export default Main;
