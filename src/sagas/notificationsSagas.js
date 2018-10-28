// @flow

import { takeLatest, call, put, take, race } from 'redux-saga/effects';

import { delay } from '@gemsorg/utils';

import { appActionTypes } from './actionTypes';

const NOTIFICATION_TIMEOUT = 3000;

declare type NotificationType = 'error' | 'success';

export const addNotification = (type: NotificationType, message: string) => ({
  type: appActionTypes.NOTIFICATION_ADD,
  payload: { type, message },
});

export const clearNotification = () => ({
  type: appActionTypes.NOTIFICATION_REMOVE,
  payload: null,
});

function* handldNotificationAdded() {
  const { timeout } = yield race({
    timeout: call(delay, NOTIFICATION_TIMEOUT),
    clear: take(appActionTypes.NOTIFICATION_REMOVE),
  });
  if (timeout) {
    yield put(clearNotification());
  }
}

// function* handleReport({ type }) {
//   yield put(addNotification('error', { type }));
// }

export function* notificationsSagas(): any {
  yield takeLatest(appActionTypes.NOTIFICATION_ADD, handldNotificationAdded);

  // yield takeEvery(gemsActionTypes.TRANSACTION_FAILED, handleTxFailed);
}
