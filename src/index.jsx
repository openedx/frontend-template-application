import 'babel-polyfill'; // general ES2015 polyfill (e.g. promise)
import React from 'react';
import ReactDOM from 'react-dom';

import OptionalLink from './components/OptionalLink';
import DisclosurePage from './components/DisclosurePage';

const App = () => (
  <div>
    <span>Hello World</span>
    <OptionalLink linkDestination={'http://www.edx.org'} />
    <DisclosurePage />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
