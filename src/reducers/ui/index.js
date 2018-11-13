import { combineReducers } from 'redux';
import { requestUiStateReducer } from '@gemsorg/app-utils';

import {
  authActionTypes,
  draftsActionTypes,
  dataActionTypes,
} from '../../sagas/actionTypes';

import notification from './notificationsReducer';

export default combineReducers({
  notification,
  auth: requestUiStateReducer(authActionTypes.GET_CURRENT),

  fetchDraft: requestUiStateReducer(draftsActionTypes.FETCH),
  updateDraftSettings: requestUiStateReducer(draftsActionTypes.UPDATE_SETTINGS),
  createDraft: requestUiStateReducer(draftsActionTypes.CREATE, true),

  fetchData: requestUiStateReducer(dataActionTypes.FETCH),
  uploadData: requestUiStateReducer(dataActionTypes.UPLOAD_DATA),
  removeData: requestUiStateReducer(dataActionTypes.REMOVE_DATA),

  selectDraftTemplate: requestUiStateReducer(draftsActionTypes.UPDATE_TEMPLATE),
});
