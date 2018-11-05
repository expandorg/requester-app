// @flow
import { createSelector } from 'reselect';

export const uiStateSelector = (state: Object) => state.ui;

export const notificationSelector = createSelector(
  uiStateSelector,
  state => state.notification
);