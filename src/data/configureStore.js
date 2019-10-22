import { App } from '@edx/frontend-base';
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import createRootReducer from './reducers';

function composeMiddleware() {
  if (App.config.ENVIRONMENT === 'development') {
    const loggerMiddleware = createLogger({
      collapsed: true,
    });
    return composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware));
  }

  return compose(applyMiddleware(thunkMiddleware));
}

export default function configureStore(initialState = {}) {
  const store = createStore(
    createRootReducer(),
    initialState,
    composeMiddleware(),
  );

  return store;
}
