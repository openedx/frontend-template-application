import 'babel-polyfill'; // general ES2015 polyfill (e.g. promise)
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import App from './containers/App';
import store from './data/store';

const history = createHistory();

const AppWrapper = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <CookiesProvider>
        <Router>
          <App />
        </Router>
      </CookiesProvider>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
