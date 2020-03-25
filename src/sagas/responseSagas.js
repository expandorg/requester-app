import { takeEvery, put } from 'redux-saga/effects';
import { handleAsyncCall } from '@expandorg/app-utils';

import { responsesActionTypes } from './actionTypes';
import { fetchJobStats } from './tasksSagas';

import { responsesApi } from '../api/ResponsesApi';
import { jobsApi } from '../api/JobsApi';

export const fetchAcceptedResponses = (jobId, page) => ({
  type: responsesActionTypes.FETCH_ACCEPTED,
  payload: { jobId, page },
  asyncCall: jobsApi.fetchAcceptedResponses,
  meta: { params: { jobId, page } },
});

export const fetchPendingResponses = (jobId) => ({
  type: responsesActionTypes.FETCH_PENDING,
  payload: { jobId },
  asyncCall: jobsApi.fetchPendingResponses,
  meta: { params: { jobId } },
});

export const verifyResponse = (
  jobId,
  taskId,
  responseId,
  workerId,
  score,
  reason
) => ({
  type: responsesActionTypes.BULK_VERIFY,
  payload: {
    jobId,
    results: [
      { id: responseId, worker_id: workerId, task_id: taskId, score, reason },
    ],
  },
  asyncCall: responsesApi.bulkVerify,
  meta: { params: { jobId, responseIds: [responseId] } },
});

function* refreshStats({ meta: { params } }) {
  yield put(fetchJobStats(params.jobId));
  yield put(fetchAcceptedResponses(params.jobId));
}

export function* responseSagas() {
  yield takeEvery(responsesActionTypes.BULK_VERIFY_COMPLETE, refreshStats);
  yield takeEvery(
    [
      responsesActionTypes.FETCH_ACCEPTED,
      responsesActionTypes.FETCH_PENDING,
      responsesActionTypes.BULK_VERIFY,
    ],
    handleAsyncCall
  );
}
