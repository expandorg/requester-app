import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@gemsorg/app-utils';

import { dataActionTypes } from './actionTypes';

import { draftApi } from '../api/DraftApi';
import { dataApi } from '../api/DataApi';

export const fetch = (draftId, dataId, page) => ({
  type: dataActionTypes.FETCH,
  payload: { draftId, dataId, page },
  asyncCall: dataApi.fetch,
});

export const uploadData = (draftId, data) => ({
  type: dataActionTypes.UPLOAD_DATA,
  payload: { draftId, data },
  asyncCall: dataApi.uploadData,
});

export const uppdateDataColumns = (draftId, dataId, columns) => ({
  type: dataActionTypes.UPDATE_COLUMNS,
  payload: { draftId, dataId, columns },
  asyncCall: dataApi.columns,
});

export const removeData = draftId => ({
  type: dataActionTypes.REMOVE_DATA,
  payload: { id: draftId, params: { dataid: null } },
  asyncCall: draftApi.patch,
});

export function* dataSagas() {
  const actions = [
    dataActionTypes.FETCH,
    dataActionTypes.UPLOAD_DATA,
    dataActionTypes.UPDATE_COLUMNS,
    dataActionTypes.REMOVE_DATA,
  ];
  yield takeEvery(actions, handleAsyncCall);
}
