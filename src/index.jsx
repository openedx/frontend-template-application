import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PrivateRoute } from '@edx/frontend-auth';

import PostsPage from './containers/PostsPage';
import CommentSearchPage from './containers/CommentSearchPage';
import DisclosurePage from './containers/DisclosurePage';
import history from './data/history';
import store from './data/store';

import './App.scss';

import apiClient from './data/apiClient';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <header>
          <nav>
            <ul className="nav">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/posts">Posts</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/comment-search">Comment Search</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/public/disclosure">Disclosure</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/public/disclosure" component={DisclosurePage} />
            <Route path="/public/hello" component={() => <span>Hello World, open route</span>} />
            <PrivateRoute
              path="/posts"
              component={PostsPage}
              authenticatedAPIClient={apiClient}
              redirect={`${process.env.BASE_URL}`}
            />
            <PrivateRoute
              path="/comment-search"
              component={CommentSearchPage}
              authenticatedAPIClient={apiClient}
              redirect={`${process.env.BASE_URL}`}
            />
            <PrivateRoute
              path="/"
              component={() => <span>Hello World, Private route</span>}
              authenticatedAPIClient={apiClient}
              redirect={`${process.env.BASE_URL}`}
            />
          </Switch>
        </main>
      </div>
    </ConnectedRouter>
  </Provider>
);

if (apiClient.ensurePublicOrAuthencationAndCookies(window.location.pathname)) {
  ReactDOM.render(<App />, document.getElementById('root'));
}
