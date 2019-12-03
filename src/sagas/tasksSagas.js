import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { tasksActionTypes } from './actionTypes';

import { dashboardApi } from '../api/DashboardApi';
import { jobsApi } from '../api/JobsApi';
import { tasksApi } from '../api/TasksApi';
import { templatesApi } from '../api/TemplatesApi';

import {
  taskTemplateSchema,
  jobStatsSchema,
  taskSchema,
} from '../model/schemas';

export const fetchTask = taskId => ({
  type: tasksActionTypes.FETCH,
  payload: { taskId },
  asyncCall: tasksApi.fetch,
  meta: { schema: { task: taskSchema } },
});

export const fetchTasks = status => ({
  type: tasksActionTypes.FETCH_LIST,
  payload: { status },
  asyncCall: dashboardApi.list,
});

export const fetchJobStats = jobId => ({
  type: tasksActionTypes.FETCH_STATS,
  payload: { jobId },
  asyncCall: jobsApi.stats,
  meta: { schema: { stats: jobStatsSchema } },
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
      tasksActionTypes.FETCH,
      tasksActionTypes.FETCH_STATS,
      tasksActionTypes.FETCH_LIST,
      tasksActionTypes.FETCH_TEMPLATES,
      tasksActionTypes.FETCH_TEMPLATE,
    ],
    handleAsyncCall
  );
}
