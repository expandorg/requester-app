import { takeEvery, put, call } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { handleAsyncCall } from '@expandorg/app-utils';

import { dataActionTypes } from './actionTypes';

import { dataApi } from '../api/DataApi';

import { draftResponseSchema, dataResponseSchema } from '../model/schemas';

export const fetch = (draftId, dataId, page) => ({
  type: dataActionTypes.FETCH,
  payload: { draftId, dataId, page },
  asyncCall: dataApi.fetch,
  meta: { schema: dataResponseSchema },
});

export const uploadData = (draftId, data, xhrCallbacks) => ({
  type: dataActionTypes.UPLOAD_DATA,
  payload: { draftId, data },
  meta: { xhrCallbacks },
});

function* handleUploadData({ payload, meta: { xhrCallbacks } }) {
  try {
    const response = yield call(dataApi.uploadData, {
      ...payload,
      xhrCallbacks,
    });
    yield put({
      type: dataActionTypes.UPLOAD_DATA_COMPLETE,
      payload: normalize(response, draftResponseSchema),
      complete: true,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dataActionTypes.UPLOAD_DATA_FAILED,
      payload: error,
      failed: true,
    });
  }
}

export const uppdateColumns = (draftId, dataId, columns) => ({
  type: dataActionTypes.UPDATE_COLUMNS,
  payload: { draftId, dataId, columns },
  asyncCall: dataApi.columns,
  meta: { schema: dataResponseSchema, optimistic: true },
});

export const removeData = draftId => ({
  type: dataActionTypes.REMOVE_DATA,
  payload: { draftId },
  asyncCall: dataApi.removeData,
  meta: { schema: draftResponseSchema },
});

export function* dataSagas() {
  const actions = [
    dataActionTypes.FETCH,
    dataActionTypes.UPDATE_COLUMNS,
    dataActionTypes.REMOVE_DATA,
  ];
  yield takeEvery(actions, handleAsyncCall);
  yield takeEvery(dataActionTypes.UPLOAD_DATA, handleUploadData);
}
