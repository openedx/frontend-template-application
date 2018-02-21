import 'babel-polyfill'; // general ES2015 polyfill (e.g. promise)
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import CurrentPostsPage from './containers/CurrentPostsPage';
import store from './data/store';

const history = createHistory();

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <main>
        <Route exact path="/" component={CurrentPostsPage} />
      </main>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
