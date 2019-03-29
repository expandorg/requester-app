import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { accessTokenActionTypes } from './actionTypes';

import { accessTokenApi } from '../api/AccessTokenApi';

export const generateKey = user => ({
  type: accessTokenActionTypes.GENERATE_KEY,
  payload: { userId: user.id },
  asyncCall: accessTokenApi.generateKey,
});

export function* accessTokenSagas() {
  yield takeEvery(accessTokenActionTypes.GENERATE_KEY, handleAsyncCall);
}
