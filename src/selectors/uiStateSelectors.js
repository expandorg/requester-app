// @flow
import { createSelector } from 'reselect';

export const uiStateSelector = (state: Object) => state.ui;

export const notificationSelector = createSelector(
  uiStateSelector,
  state => state.notification
);

export const fetchDraftStateSelector = createSelector(
  uiStateSelector,
  state => state.fetchDraft
);

export const createDraftStateSelector = createSelector(
  uiStateSelector,
  state => state.createDraft
);

export const updateDraftSettingsStateSelector = createSelector(
  uiStateSelector,
  state => state.updateDraftSettings
);

export const selectDraftTemplateStateSelector = createSelector(
  uiStateSelector,
  state => state.selectDraftTemplate
);

export const updateDraftWhitelistStateSelector = createSelector(
  uiStateSelector,
  state => state.updateDraftWhitelist
);

export const fetchDataStateSelector = createSelector(
  uiStateSelector,
  state => state.fetchData
);

export const uploadDataStateSelector = createSelector(
  uiStateSelector,
  state => state.uploadData
);

export const removeDataStateSelector = createSelector(
  uiStateSelector,
  state => state.removeData
);

export const eligibleUsersStateSelector = createSelector(
  uiStateSelector,
  state => state.eligibleUsers
);
