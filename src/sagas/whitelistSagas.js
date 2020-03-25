import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { whitelistActionTypes } from './actionTypes';

import { whitelistApi } from '../api/WhitelistApi';

export const getEligibleUsers = (conditions) => ({
  type: whitelistActionTypes.GET_ELIGIBLE,
  payload: { conditions },
  asyncCall: whitelistApi.eligible,
});

export function* whitelistSagas() {
  yield takeEvery(whitelistActionTypes.GET_ELIGIBLE, handleAsyncCall);
}
