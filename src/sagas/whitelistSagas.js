import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@gemsorg/app-utils';

import { whitelistActionTypes } from './actionTypes';

import { whitelistApi } from '../api/WhitelistApi';

export const getEliligibleUsers = conditions => {
  console.log(conditions);
  return {
    type: whitelistActionTypes.GET_ELIGIBLE,
    payload: { conditions },
    asyncCall: whitelistApi.eligible,
  };
};

export function* whitelistSagas() {
  yield takeEvery(whitelistActionTypes.GET_ELIGIBLE, handleAsyncCall);
}
