import { takeEvery, call, put, getContext } from 'redux-saga/effects';

import { userActionTypes } from './actionTypes';

import { userApi } from '../api/UserApi';

export const assignAddress = (user, address = null) => ({
  type: userActionTypes.ASSIGN_ADDRESS,
  payload: { user, address },
});

function* handleAssignAddress({ payload: { user, address } }) {
  try {
    let params = { userId: user.id, address };
    if (!address) {
      const services = yield getContext('services');
      const gemsService = services.resolve('gems');

      const defaultAccount = gemsService.getDefaultAccount();
      const { result: signature } = yield call(
        gemsService.getAccountSingature,
        defaultAccount
      );
      params = { ...params, address: defaultAccount, signature };
    }
    const payload = yield call(userApi.assignAddress, params);

    yield put({ type: userActionTypes.ASSIGN_ADDRESS_COMPLETE, payload });
  } catch (error) {
    yield put({ type: userActionTypes.ASSIGN_ADDRESS_FAILED, payload: error });
  }
}

export function* userSagas() {
  yield takeEvery(userActionTypes.ASSIGN_ADDRESS, handleAssignAddress);
}
