// @flow
import { createSelector } from 'reselect';

export const dashboardTasksListSelector = (state: Object) =>
  state.dashboardTasks;

export const dashboardTasksSelector: any = createSelector(
  dashboardTasksListSelector,
  list =>
    list.map(item => ({
      key: `${item.id}-${item.taskId}-${item.status}`,
      ...item,
    }))
);

export const taskStatsEntitiesSelector = (state: Object): any =>
  state.taskStats.entities;

export const makeTaskStatsSelector = (): any =>
  createSelector(
    taskStatsEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id]
  );
