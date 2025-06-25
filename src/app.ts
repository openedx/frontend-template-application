import { App } from '@openedx/frontend-base';
import { appId } from './constants';
import routes from './routes';
import messages from './i18n';

const app: App = {
  appId,
  routes,
  messages,
  providers: [],
  slots: [],
  config: {}
};

export default app;
