// @flow
import { createSelector } from 'reselect';

export const jobEntitiesSelector = (state: Object) => state.jobs.entities;

export const makeJobSelector = (): any =>
  createSelector(
    jobEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id]
  );
