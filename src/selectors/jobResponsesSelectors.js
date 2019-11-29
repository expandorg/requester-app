// @flow
import { createSelector } from 'reselect';

export const jobResponsesEntitiesSelector = (state: Object) =>
  state.jobs.responses;

export const makeJobResponsesDataSelector = (): any =>
  createSelector(
    jobResponsesEntitiesSelector,
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
