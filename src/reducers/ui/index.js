import { combineReducers } from 'redux';

import { requestUiStateReducer } from '@gemsorg/app-utils';

import { authActionTypes } from '../../sagas/actionTypes';

export default combineReducers({
  auth: requestUiStateReducer(authActionTypes.GET_CURRENT),
});
