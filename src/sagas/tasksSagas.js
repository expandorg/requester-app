import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { tasksActionTypes } from './actionTypes';

import { dashboardApi } from '../api/DashboardApi';
import { jobsApi } from '../api/JobsApi';
import { templatesApi } from '../api/TemplatesApi';

import { taskTemplateSchema, jobStatsSchema } from '../model/schemas';

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

export const fetchResponses = (jobId, page) => ({
  type: tasksActionTypes.FETCH_RESPONSES,
  payload: { jobId, page },
  asyncCall: jobsApi.fetchResponses,
  meta: { params: { jobId, page } },
});

export function* tasksSagas() {
  yield takeEvery(
    [
      tasksActionTypes.FETCH_STATS,
      tasksActionTypes.FETCH_LIST,
      tasksActionTypes.FETCH_TEMPLATES,
      tasksActionTypes.FETCH_TEMPLATE,
      tasksActionTypes.FETCH_RESPONSES,
    ],
    handleAsyncCall
  );
}
