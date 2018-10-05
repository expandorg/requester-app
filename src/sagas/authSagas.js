// @flow
import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@gemsorg/app-utils';

import { authActionTypes } from './actionTypes';

import { authApi } from '../api/AuthApi';

import { authResponseSchema } from '../model/schemas';

export const getCurrentUser = () => ({
  type: authActionTypes.GET_CURRENT,
  payload: {},
  asyncCall: authApi.getCurrentUser,
  meta: { schema: authResponseSchema },
});

export function* authSagas() {
  yield takeEvery(authActionTypes.GET_CURRENT, handleAsyncCall);
}
