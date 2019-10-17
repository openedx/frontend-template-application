import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import createRootReducer from '../data/reducers';

export default function configureStore(initialState = {}) {
  const store = createStore(
    createRootReducer(),
    initialState,
    compose(applyMiddleware(thunkMiddleware)),
  );

  return store;
}
