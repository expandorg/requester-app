import { fork } from 'redux-saga/effects';

import { takeEveryApiCall } from '@gemsorg/app-utils';

import { authActionTypes } from './actionTypes';

import { authApi } from '../api/AuthApi';

import { authResponseSchema } from '../model/schemas';

export const getCurrentUser = () => ({
  type: authActionTypes.GET_CURRENT,
  payload: {},
  meta: { schema: authResponseSchema },
});

const watchGetCurrent = takeEveryApiCall(
  authActionTypes.GET_CURRENT,
  authApi.getCurrentUser
);

export function* authSagas() {
  yield fork(watchGetCurrent);
}
