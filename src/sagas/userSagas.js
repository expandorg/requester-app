import { takeEvery, call, put, getContext } from 'redux-saga/effects';

import { handleAsyncCall } from '@gemsorg/app-utils';

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

export const editEmail = (user, email) => ({
  type: userActionTypes.EDIT_EMAIL,
  payload: { userId: user.id, email },
  asyncCall: userApi.editEmail,
});

export const changePassword = (user, newPassword, oldPassword) => ({
  type: userActionTypes.CHANGE_PASSWORD,
  payload: { userId: user.id, newPassword, oldPassword },
  asyncCall: userApi.changePassword,
});

export function* userSagas() {
  yield takeEvery(userActionTypes.ASSIGN_ADDRESS, handleAssignAddress);

  yield takeEvery(
    [userActionTypes.EDIT_EMAIL, userActionTypes.CHANGE_PASSWORD],
    handleAsyncCall
  );
}
