// @flow

import {
  takeLatest,
  takeEvery,
  call,
  put,
  take,
  race,
} from 'redux-saga/effects';

import { delay } from '@gemsorg/utils';

import { appActionTypes, draftsActionTypes } from './actionTypes';

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

const successMessage = message => {
  function* handler() {
    yield put(addNotification('success', message));
  }
  return handler;
};

export function* notificationsSagas(): any {
  yield takeLatest(appActionTypes.NOTIFICATION_ADD, handldNotificationAdded);
  yield takeEvery(
    draftsActionTypes.UPDATE_TASK_COMPLETE,
    successMessage('Task module edited!')
  );
}
