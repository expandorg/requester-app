import { combineReducers } from 'redux';

import { requestUiStateReducer } from '@gemsorg/app-utils';

import { authActionTypes, draftsActionTypes } from '../../sagas/actionTypes';

import notification from './notificationsReducer';

export default combineReducers({
  auth: requestUiStateReducer(authActionTypes.GET_CURRENT),
  notification,

  createDraft: requestUiStateReducer(draftsActionTypes.CREATE, true),
});
