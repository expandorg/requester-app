// @flow
import { createSelector } from 'reselect';

export const whitelistStateSelector = (state: Object) => state.whitelist;

export const eliligibleUsersSelector = createSelector(
  whitelistStateSelector,
  state => state.eliligible
);
