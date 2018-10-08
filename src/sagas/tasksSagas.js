import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@gemsorg/app-utils';

import { tasksActionTypes } from './actionTypes';

import { tasksApi } from '../api/TasksApi';

export const fetchTasks = category => ({
  type: tasksActionTypes.FETCH,
  payload: { category },
  asyncCall: tasksApi.fetch,
});

export function* tasksSagas() {
  yield takeEvery(tasksActionTypes.FETCH, handleAsyncCall);
}
