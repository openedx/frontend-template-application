import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import PostsPage from './containers/PostsPage';
import CommentSearchPage from './containers/CommentSearchPage';
import DisclosurePage from './containers/DisclosurePage';
import history from './data/history';
import store from './data/store';

import './App.scss';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <header>
          <nav>
            <ul className="nav">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/posts">Posts</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/disclosure">Disclosure</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/comment-search">Comment Search</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={() => <span>Hello World</span>} />
            <Route path="/posts" component={PostsPage} />
            <Route path="/disclosure" component={DisclosurePage} />
            <Route path="/comment-search" component={CommentSearchPage} />
          </Switch>
        </main>
      </div>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
