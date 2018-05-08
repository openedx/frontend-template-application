import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import courseOutline from './courseOutline';
import sectionBlocks from './sectionBlocks';

const rootReducer = combineReducers({
  routerReducer,
  courseOutline,
  sectionBlocks,
});

export default rootReducer;
