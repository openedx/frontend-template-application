import 'babel-polyfill'; // general ES2015 polyfill (e.g. promise)
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import CurrentPostsPage from './containers/CurrentPostsPage';
import DisclosurePage from './components/DisclosurePage';
import TodosPageWithData from './containers/TodosPageWithData';

import store from './data/store';
import './App.scss';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'https://graphql-jsonplaceholder.herokuapp.com/graphql' }),
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <div>
          <header>
            <nav>
              <ul className="nav">
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/posts">Posts</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/disclosure">Disclosure</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/todos">Todos</Link></li>
              </ul>
            </nav>
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={() => <span>Hello World</span>} />
              <Route path="/posts" component={CurrentPostsPage} />
              <Route path="/disclosure" component={DisclosurePage} />
              <Route path="/todos" component={() => <TodosPageWithData id="VXNlcjox" />} />
            </Switch>
          </main>
        </div>
      </Router>
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
