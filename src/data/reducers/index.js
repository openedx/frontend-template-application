import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { userAccount } from '@edx/frontend-auth';
import courses from './courses';

const identityReducer = (state) => {
  const newState = { ...state };
  return newState;
};

export default history => combineReducers({
  router: connectRouter(history),
  authentication: identityReducer,
  userAccount,
  courses,
});
