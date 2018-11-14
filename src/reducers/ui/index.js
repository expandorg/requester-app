import { combineReducers } from 'redux';
import { requestUiStateReducer } from '@gemsorg/app-utils';

import {
  authActionTypes,
  draftsActionTypes,
  dataActionTypes,
  whitelistActionTypes,
} from '../../sagas/actionTypes';

import notification from './notificationsReducer';

export default combineReducers({
  notification,
  auth: requestUiStateReducer(authActionTypes.GET_CURRENT),

  fetchDraft: requestUiStateReducer(draftsActionTypes.FETCH),
  createDraft: requestUiStateReducer(draftsActionTypes.CREATE, true),
  updateDraftSettings: requestUiStateReducer(draftsActionTypes.UPDATE_SETTINGS),

  selectDraftTemplate: requestUiStateReducer(draftsActionTypes.UPDATE_TEMPLATE),
  updateDraftWhitelist: requestUiStateReducer(
    draftsActionTypes.UPDATE_WHITELIST
  ),
  updateDraftFunding: requestUiStateReducer(draftsActionTypes.UPDATE_FUNDING),

  fetchData: requestUiStateReducer(dataActionTypes.FETCH),
  uploadData: requestUiStateReducer(dataActionTypes.UPLOAD_DATA),
  removeData: requestUiStateReducer(dataActionTypes.REMOVE_DATA),

  eligibleUsers: requestUiStateReducer(whitelistActionTypes.GET_ELIGIBLE),
});
