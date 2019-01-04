import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import posts from './posts';
import comment from './comment';

export default history => combineReducers({
  router: connectRouter(history),
  posts,
  comment,
});
