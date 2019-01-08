import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { tasksActionTypes } from './actionTypes';

import { tasksApi } from '../api/TasksApi';
import { templatesApi } from '../api/TemplatesApi';
import { taskTemplateSchema, taskStatsSchema } from '../model/schemas';

export const fetchTasks = status => ({
  type: tasksActionTypes.FETCH_LIST,
  payload: { status },
  asyncCall: tasksApi.list,
});

export const fetchTaskStats = id => ({
  type: tasksActionTypes.FETCH_STATS,
  payload: { id },
  asyncCall: tasksApi.fetchStats,
  meta: { schema: { task: taskStatsSchema } },
});

export const fetchTaskTemplates = () => ({
  type: tasksActionTypes.FETCH_TEMPLATES,
  payload: {},
  asyncCall: templatesApi.taskTemplates,
  meta: { schema: { templates: [taskTemplateSchema] } },
});

export const fetchTaskTemplate = id => ({
  type: tasksActionTypes.FETCH_TEMPLATE,
  payload: { id },
  asyncCall: templatesApi.taskTemplate,
  meta: { schema: { template: taskTemplateSchema } },
});

export function* tasksSagas() {
  yield takeEvery(
    [
      tasksActionTypes.FETCH_STATS,
      tasksActionTypes.FETCH_LIST,
      tasksActionTypes.FETCH_TEMPLATES,
      tasksActionTypes.FETCH_TEMPLATE,
    ],
    handleAsyncCall
  );
}
