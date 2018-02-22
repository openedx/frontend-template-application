import 'babel-polyfill'; // general ES2015 polyfill (e.g. promise)
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import CurrentPostsPage from './containers/CurrentPostsPage';
import DisclosurePage from './components/DisclosurePage';
import store from './data/store';

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/posts">Posts</Link></li>
              <li><Link to="/disclosure">Disclosure</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={() => <span>Hello World</span>} />
            <Route path="/posts" component={CurrentPostsPage} />
            <Route path="/disclosure" component={DisclosurePage} />
          </Switch>
        </main>
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
