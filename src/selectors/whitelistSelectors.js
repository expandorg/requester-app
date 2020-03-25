// @flow
import { createSelector } from 'reselect';

export const whitelistStateSelector = (state: Object) => state.whitelist;

export const eligibleUsersSelector: any = createSelector(
  whitelistStateSelector,
  (state) => state.eligible
);
