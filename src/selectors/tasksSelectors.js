// @flow

export const tasksEntitiesSelector = (state: Object) => state.tasks.entities;

export const tasksListSelector = (state: Object) => state.tasks.list;

export const dashboardTasksSelector = (state: Object) => state.dashboardTasks;

export const taskTemplatesSelector = (state: Object) => state.taskTemplates;
