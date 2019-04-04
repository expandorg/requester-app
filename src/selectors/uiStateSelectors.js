// @flow
import { createSelector } from 'reselect';

export const uiStateSelector = (state: Object) => state.ui;

export const notificationSelector: any = createSelector(
  uiStateSelector,
  state => state.notification
);

export const fetchDraftStateSelector: any = createSelector(
  uiStateSelector,
  state => state.fetchDraft
);

export const createDraftStateSelector: any = createSelector(
  uiStateSelector,
  state => state.createDraft
);

export const updateDraftSettingsStateSelector: any = createSelector(
  uiStateSelector,
  state => state.updateDraftSettings
);

export const selectDraftTemplateStateSelector: any = createSelector(
  uiStateSelector,
  state => state.selectDraftTemplate
);

export const updateDraftTaskStateSelector: any = createSelector(
  uiStateSelector,
  state => state.updateDraftTask
);

export const updateDraftOnboardingStateSelector: any = createSelector(
  uiStateSelector,
  state => state.updateDraftOnboarding
);

export const updateDraftWhitelistStateSelector: any = createSelector(
  uiStateSelector,
  state => state.updateDraftWhitelist
);

export const updateDraftFundingStateSelector: any = createSelector(
  uiStateSelector,
  state => state.updateDraftFunding
);

export const publishDraftStateSelector: any = createSelector(
  uiStateSelector,
  state => state.publishDraft
);

export const fetchDataStateSelector: any = createSelector(
  uiStateSelector,
  state => state.fetchData
);

export const uploadDataStateSelector: any = createSelector(
  uiStateSelector,
  state => state.uploadData
);

export const removeDataStateSelector: any = createSelector(
  uiStateSelector,
  state => state.removeData
);

export const eligibleUsersStateSelector: any = createSelector(
  uiStateSelector,
  state => state.eligibleUsers
);

export const fetchJobStatsStateSelector: any = createSelector(
  uiStateSelector,
  state => state.fetchJobStats
);

export const fetchJobResponsesStateSelector: any = createSelector(
  uiStateSelector,
  state => state.fetchJobResponses
);

export const generateAccessTokenStateSelector: any = createSelector(
  uiStateSelector,
  state => state.accessToken
);
