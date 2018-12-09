import { combineReducers } from 'redux';
import { requestUiStateReducer } from '@gemsorg/app-utils';
import { notificationReducer as notification } from '@gemsorg/app-utils/app';

import { authStateReducers as authState } from '@gemsorg/app-auth';
import { web3ActionTypes } from '@gemsorg/app-web3';
import { uiStateReducers as gemsState } from '@gemsorg/app-gemtokens';

import {
  draftsActionTypes,
  dataActionTypes,
  whitelistActionTypes,
  tasksActionTypes,
} from '../../sagas/actionTypes';

export default combineReducers({
  initGems: requestUiStateReducer(web3ActionTypes.INIT_GEMS),
  notification,
  ...authState,
  ...gemsState,

  fetchDraft: requestUiStateReducer(draftsActionTypes.FETCH),
  createDraft: requestUiStateReducer(draftsActionTypes.CREATE, true),
  updateDraftSettings: requestUiStateReducer(draftsActionTypes.UPDATE_SETTINGS),

  selectDraftTemplate: requestUiStateReducer(draftsActionTypes.UPDATE_TEMPLATE),
  updateDraftTask: requestUiStateReducer(draftsActionTypes.UPDATE_TASK),
  updateDraftOnboarding: requestUiStateReducer(
    draftsActionTypes.UPDATE_ONBOARDING
  ),
  updateDraftWhitelist: requestUiStateReducer(
    draftsActionTypes.UPDATE_WHITELIST
  ),
  updateDraftFunding: requestUiStateReducer(draftsActionTypes.UPDATE_FUNDING),
  publishDraft: requestUiStateReducer(draftsActionTypes.PUBLISH, true),

  fetchData: requestUiStateReducer(dataActionTypes.FETCH),
  uploadData: requestUiStateReducer(dataActionTypes.UPLOAD_DATA),
  removeData: requestUiStateReducer(dataActionTypes.REMOVE_DATA),

  eligibleUsers: requestUiStateReducer(whitelistActionTypes.GET_ELIGIBLE),

  fetchTaskStats: requestUiStateReducer(tasksActionTypes.FETCH_STATS),
});
