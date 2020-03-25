// @flow
import { createSelector } from 'reselect';

export const tasksEntitiesSelector = (state: Object) => state.tasks.entities;

export const makeTaskSelector = (): any =>
  createSelector(
    tasksEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id] || null
  );

export const dashboardTasksListSelector = (state: Object) =>
  state.dashboardTasks;

export const dashboardTasksSelector: any = createSelector(
  dashboardTasksListSelector,
  (list) => list
);

export const jobStatsEntitiesSelector = (state: Object): any =>
  state.jobs.stats;

export const jobEntitiesSelector = (state: Object): any => state.jobs.entities;

export const makeJobStatsSelector = (): any =>
  createSelector(
    jobStatsEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id]
  );
