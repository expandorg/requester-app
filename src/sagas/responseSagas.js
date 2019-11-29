import { takeEvery } from 'redux-saga/effects';
import { handleAsyncCall } from '@expandorg/app-utils';

import { responsesActionTypes } from './actionTypes';
import { responsesApi } from '../api/ResponsesApi';

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
});

export function* responsesSagas() {
  yield takeEvery([responsesActionTypes.BULK_VERIFY], handleAsyncCall);
}
