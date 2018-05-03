import { combineReducers } from 'redux';

import courseOutline from './courseOutline';
import sectionBlocks from './sectionBlocks';

const rootReducer = combineReducers({
  courseOutline,
  sectionBlocks,
});

export default rootReducer;
