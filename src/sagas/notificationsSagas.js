// @flow

import { takeLatest, takeEvery, put } from 'redux-saga/effects';

import {
  appActionTypes,
  userActionTypes,
  addNotification,
  handldNotificationAdded,
} from '@expandorg/app-utils/app';

import { gemsActionTypes } from '@expandorg/app-gemtokens';

import { draftsActionTypes, accessTokenActionTypes } from './actionTypes';

export const successMessage = (message: string) => {
  function* handler(): any {
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

function* handleDraftActionFailed({ payload }) {
  yield put(addNotification('error', `Update failed: ${payload.message}`));
}

const draftFailedActions = [
  draftsActionTypes.UPDATE_SETTINGS_FAILED,
  draftsActionTypes.UPDATE_TEMPLATE_FAILED,
  draftsActionTypes.UPDATE_TASK_FAILED,
  draftsActionTypes.UPDATE_VERIFICATION_SETTINGS_FAILED,
  draftsActionTypes.UPDATE_VERIFICATION_FORM_FAILED,
  draftsActionTypes.UPDATE_ONBOARDING_FAILED,
  draftsActionTypes.UPDATE_FUNDING_FAILED,
  draftsActionTypes.UPDATE_WHITELIST_FAILED,
  draftsActionTypes.PUBLISH_FAILED,
];

export function* notificationsSagas(): any {
  yield takeLatest(appActionTypes.NOTIFICATION_ADD, handldNotificationAdded);

  yield takeEvery(userActionTypes.UPDATED, handleUserUpdated);
  yield takeEvery(gemsActionTypes.TRANSACTION_FAILED, handleTxFailed);

  yield takeEvery(
    draftsActionTypes.COPY_COMPLETE,
    successMessage('Success! Duplicated job can be found in your drafts.')
  );

  yield takeEvery(
    draftsActionTypes.REMOVE_COMPLETE,
    successMessage('Job successfully deleted!')
  );

  yield takeEvery(
    draftsActionTypes.UPDATE_TASK_COMPLETE,
    successMessage('Task module edited!')
  );

  yield takeEvery(
    accessTokenActionTypes.GENERATE_KEY_COMPLETE,
    successMessage('Your new API key has been generated!')
  );

  yield takeEvery(draftFailedActions, handleDraftActionFailed);
}
