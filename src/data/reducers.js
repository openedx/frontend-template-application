import { combineReducers } from 'redux';
import { userAccount } from '@edx/frontend-auth';
import { reducer as i18nReducer } from '@edx/frontend-i18n';

const createRootReducer = () =>
  combineReducers({
    userAccount,
    i18n: i18nReducer,
  });

export default createRootReducer;
