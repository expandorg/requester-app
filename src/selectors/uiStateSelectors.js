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
