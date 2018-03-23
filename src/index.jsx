import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import PostsPage from './containers/PostsPage';
import CommentSearchPage from './containers/CommentSearchPage';
import DisclosurePage from './containers/DisclosurePage';
import store from './data/store';
import './App.scss';

const App = () => (
  <Provider store={store}>
    <Router>
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
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
