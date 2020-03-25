import { takeEvery } from 'redux-saga/effects';
import { handleAsyncCall } from '@expandorg/app-utils';

import { jobReportsActionTypes } from './actionTypes';
import { jobReportsApi } from '../api/JobReportsApi';

export const fetchJobReports = (jobId) => ({
  type: jobReportsActionTypes.FETCH_LIST,
  payload: { jobId },
  asyncCall: jobReportsApi.fetchReports,
});

export function* jobReportsSagas() {
  yield takeEvery(jobReportsActionTypes.FETCH_LIST, handleAsyncCall);
}
