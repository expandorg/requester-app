// @flow
import { createSelector } from 'reselect';

export const dashboardTasksListSelector = (state: Object) =>
  state.dashboardTasks;

export const dashboardTasksSelector: any = createSelector(
  dashboardTasksListSelector,
  list => list
);

export const jobStatsEntitiesSelector = (state: Object): any =>
  state.jobStats.entities;

export const makeJobStatsSelector = (): any =>
  createSelector(
    jobStatsEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id]
  );
