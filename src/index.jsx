import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { PrivateRoute } from '@edx/frontend-auth';

import DashboardPage from './containers/DashboardPage';
import Header from './components/Header';
import HelloWorld from './components/HelloWorld';

import apiClient from './data/apiClient';
import history from './data/history';
import store from './data/store';

import './App.scss';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.Fragment>
        <Header />
        <main className="container mb-4">
          <div className="row">
            <div className="col">
              <Switch>
                <Route exact path="/" render={() => <HelloWorld />} />
                <PrivateRoute
                  path="/dashboard/:courseStatus?"
                  render={routeProps => <DashboardPage {...routeProps} />}
                  authenticatedAPIClient={apiClient}
                  redirect={process.env.BASE_URL}
                />
              </Switch>
            </div>
          </div>
        </main>
      </React.Fragment>
    </ConnectedRouter>
  </Provider>
);

if (apiClient.ensurePublicOrAuthencationAndCookies(window.location.pathname)) {
  ReactDOM.render(<App />, document.getElementById('root'));
}
