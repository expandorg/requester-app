import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@gemsorg/app-utils';

import { tasksActionTypes } from './actionTypes';

import { tasksApi } from '../api/TasksApi';
import { templatesApi } from '../api/TemplatesApi';

export const fetchTasks = status => ({
  type: tasksActionTypes.FETCH_LIST,
  payload: { status },
  asyncCall: tasksApi.fetch,
});

export const fetchTaskTemplates = () => ({
  type: tasksActionTypes.FETCH_TEMPLATES,
  payload: {},
  asyncCall: templatesApi.taskTemplates,
});

export function* tasksSagas() {
  yield takeEvery(tasksActionTypes.FETCH_LIST, handleAsyncCall);
  yield takeEvery(tasksActionTypes.FETCH_TEMPLATES, handleAsyncCall);
}
