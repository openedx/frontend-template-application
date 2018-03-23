import { combineReducers } from 'redux';

import posts from './posts';
import comment from './comment';

const rootReducer = combineReducers({
  posts,
  comment,
});

export default rootReducer;
