import 'babel-polyfill'; // general ES2015 polyfill (e.g. promise)
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import OptionalLink from './components/OptionalLink';
import DisclosurePage from './components/DisclosurePage';
import CurrentCoursesPage from './containers/CurrentCoursesPage';
import store from './data/store';

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to="/page-with-state">Page With State</Link></li>
          <li><Link to="/disclosure">Disclosure</Link></li>
          <li><Link to="/current-courses">Current Courses</Link></li>
        </ul>

        <Route exact path={'/'} component={() => <span>Hello World</span>} />
        <Route path={'/page-with-state'} component={() => <OptionalLink linkDestination={'http://www.edx.org'} />} />
        <Route path={'/disclosure'} component={() => <DisclosurePage />} />
        <Route path={'/current-courses'} component={() => <CurrentCoursesPage />} />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
