// @flow
import { createSelector } from 'reselect';

export const acceptedResponsesPagedSelector = (state: Object) =>
  state.responses.accepted;

export const pendingResponsesItemsSelector = (state: Object) =>
  state.responses.pending;

export const makeAcceptedResponsesSelector = (): any =>
  createSelector(
    acceptedResponsesPagedSelector,
    (state, id) => id,
    (state, id, page) => page,
    (entities, id, page) => {
      const jobResults = entities[id];
      if (!jobResults) {
        return null;
      }
      return jobResults[+page || 0] || null;
    }
  );

export const makeNextPendingResponseSelector = (): any =>
  createSelector(
    pendingResponsesItemsSelector,
    (state, id) => id,
    (entities, id) => {
      const byJob = entities[id];
      if (!byJob || byJob.isFetching) {
        return null;
      }
      return byJob.results[0];
    }
  );
