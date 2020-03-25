import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { jobsActionTypes } from './actionTypes';

import { jobsApi } from '../api/JobsApi';
import { jobSchema } from '../model/schemas';

export const fetchJob = (jobId) => ({
  type: jobsActionTypes.FETCH,
  payload: { jobId },
  asyncCall: jobsApi.fetch,
  meta: { schema: jobSchema },
});

export function* jobsSagas() {
  yield takeEvery([jobsActionTypes.FETCH], handleAsyncCall);
}
