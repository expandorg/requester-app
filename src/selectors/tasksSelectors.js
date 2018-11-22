// @flow
import { createSelector } from 'reselect';

export const dashboardTasksListSelector = (state: Object) =>
  state.dashboardTasks;

export const dashboardTasksSelector = createSelector(
  dashboardTasksListSelector,
  list =>
    list.map(item => ({
      id: `${item.draftId}-${item.taskId}-${item.state}`,
      ...item,
    }))
);

export const taskStatsEntitiesSelector = (state: Object) =>
  state.taskStats.entities;

export const makeTaskStatsSelector = () =>
  createSelector(
    taskStatsEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id]
  );
