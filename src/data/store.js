import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createLogger } from 'redux-logger';

import reducers from './reducers';

const loggerMiddleware = createLogger();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware)),
);

export default store;
