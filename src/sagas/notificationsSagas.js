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
import { appActionTypes, userActionTypes } from '@gemsorg/app-utils/app';
import { gemsActionTypes } from '@gemsorg/app-gemtokens';

import { draftsActionTypes } from './actionTypes';

const NOTIFICATION_TIMEOUT = 3000;

declare type NotificationType = 'error' | 'success' | 'warning' | 'message';

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

function* handleUserUpdated({ payload }) {
  if (payload.params && payload.params.source) {
    const {
      params: { source },
      data: { user },
    } = payload;

    yield put(
      addNotification(
        'success',
        `Your ${source} has succeeded. Your new balance is ${user.gems.balance}`
      )
    );
  }
}

function* handleTxFailed({ payload }) {
  if (payload.params && payload.params.source) {
    const op = payload.params.source === 'withdraw' ? 'withdrawal' : 'deposit';
    yield put(addNotification('error', `Your ${op} has failed`));
  }
}

export function* notificationsSagas(): any {
  yield takeLatest(appActionTypes.NOTIFICATION_ADD, handldNotificationAdded);

  yield takeEvery(userActionTypes.UPDATED, handleUserUpdated);
  yield takeEvery(gemsActionTypes.TRANSACTION_FAILED, handleTxFailed);

  yield takeEvery(
    draftsActionTypes.COPY_COMPLETE,
    successMessage('Task copied!')
  );

  yield takeEvery(
    draftsActionTypes.REMOVE_COMPLETE,
    successMessage('Task successfully deleted!')
  );

  yield takeEvery(
    draftsActionTypes.UPDATE_TASK_COMPLETE,
    successMessage('Task module edited!')
  );
}
