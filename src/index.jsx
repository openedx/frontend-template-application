import 'babel-polyfill'; // general ES2015 polyfill (e.g. promise)
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie'; 

import CoursewarePageContainer from './containers/CoursewarePageContainer'
import EdxHeader from './components/EdxHeader'
import EdxFooter from './components/EdxFooter'
import store from './data/store';
import './App.scss';

const App = () => (
  <Provider store={store}>
    <CookiesProvider>
      <EdxHeader />
      <Router>
        <div>
          <main>
            <Switch>
              <Route exact path="/" component={() => <span>Hello World</span>} />
              <Route path='/course' component={CoursewarePageContainer} />
            </Switch>
          </main>
        </div>
      </Router>
      <EdxFooter />
    </CookiesProvider>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
