// @flow

import { takeLatest, takeEvery, put } from 'redux-saga/effects';

import {
  appActionTypes,
  userActionTypes,
  addNotification,
  handldNotificationAdded,
} from '@expandorg/app-utils/app';

import { gemsActionTypes } from '@expandorg/app-gemtokens';

import { draftsActionTypes } from './actionTypes';

export const successMessage = message => {
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
