import { combineReducers } from 'redux';
import { requestUiStateReducer } from '@expandorg/app-utils';
import { notificationReducer as notification } from '@expandorg/app-utils/app';

import { authStateReducers as authState } from '@expandorg/app-auth';
import { uiStateReducers as accountState } from '@expandorg/app-account';
import { web3ActionTypes } from '@expandorg/app-web3';
import { uiStateReducers as gemsState } from '@expandorg/app-gemtokens';

import {
  draftsActionTypes,
  dataActionTypes,
  whitelistActionTypes,
  tasksActionTypes,
  accessTokenActionTypes,
} from '../sagas/actionTypes';

export default combineReducers({
  initGems: requestUiStateReducer(web3ActionTypes.INIT_GEMS),
  notification,
  ...authState,
  ...gemsState,
  ...accountState,

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
  accessToken: requestUiStateReducer(accessTokenActionTypes.GENERATE_KEY),
});
