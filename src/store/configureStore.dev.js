import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createLogger } from 'redux-logger';

import createRootReducer from '../data/reducers';

export default function configureStore(initialState = {}) {
  const loggerMiddleware = createLogger({
    collapsed: true,
  });

  const store = createStore(
    createRootReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware)),
  );

  return store;
}
