import { takeEvery, fork } from 'redux-saga/effects';

import { handleAsyncCall } from '@gemsorg/app-utils';

import { authActionTypes } from '@gemsorg/app-auth';
import { watchAppInit } from '@gemsorg/app-auth/sagas';

/* eslint-disable import/prefer-default-export */

export function* authSagas() {
  const actions = [
    authActionTypes.GET_CURRENT,
    authActionTypes.LOGIN,
    authActionTypes.SIGNUP,
    authActionTypes.LOGOUT,
  ];
  yield takeEvery(actions, handleAsyncCall);

  yield fork(watchAppInit);
}
