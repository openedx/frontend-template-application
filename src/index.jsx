import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import DashboardPage from './components/DashboardPage';
import HelloWorld from './components/HelloWorld';

import history from './data/history';
import store from './data/store';

import './App.scss';


const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.Fragment>
        <header>
          <nav>
            <ul className="nav">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/dashboard">My Courses</Link></li>
            </ul>
          </nav>
        </header>
        <main className="container mb-4">
          <div className="row">
            <div className="col">
              <Switch>
                {/* <Route exact path="/" render={() => <HelloWorld />} /> */}
                <Route path="/dashboard" render={() => <DashboardPage />} />
              </Switch>
            </div>
          </div>
        </main>
      </React.Fragment>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
