import { combineReducers } from 'redux';
import { requestUiStateReducer } from '@expandorg/app-utils';
import { notificationReducer as notification } from '@expandorg/app-utils/app';

import { authStateReducers as authState } from '@expandorg/app-auth';
import { uiStateReducers as accountState } from '@expandorg/app-account';
import { uiStateReducers as gemsState } from '@expandorg/app-gemtokens';

import {
  draftsActionTypes,
  dataActionTypes,
  whitelistActionTypes,
  tasksActionTypes,
  accessTokenActionTypes,
  jobReportsActionTypes,
  responsesActionTypes,
} from '../sagas/actionTypes';

export default combineReducers({
  notification,
  ...authState,
  ...gemsState,
  ...accountState,

  fetchDraft: requestUiStateReducer(draftsActionTypes.FETCH),
  createDraft: requestUiStateReducer(draftsActionTypes.CREATE, true),
  updateDraftSettings: requestUiStateReducer(draftsActionTypes.UPDATE_SETTINGS),
  updateDraftVerification: requestUiStateReducer(
    draftsActionTypes.UPDATE_VERIFICATION_SETTINGS
  ),

  fetchTemplates: requestUiStateReducer(tasksActionTypes.FETCH_TEMPLATES),

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

  fetchJobStats: requestUiStateReducer(tasksActionTypes.FETCH_STATS),
  fetchJobResponses: requestUiStateReducer(tasksActionTypes.FETCH_RESPONSES),
  fetchJobReports: requestUiStateReducer(jobReportsActionTypes.FETCH_LIST),
  accessToken: requestUiStateReducer(accessTokenActionTypes.GENERATE_KEY),
  verifyResponse: requestUiStateReducer(responsesActionTypes.BULK_VERIFY),
});
