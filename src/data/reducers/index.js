import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import courseOutline from './courseOutline';

const rootReducer = combineReducers({
  routerReducer,
  courseOutline,
});

export default rootReducer;
