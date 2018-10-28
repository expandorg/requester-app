import { fork } from 'redux-saga/effects';
import { authSagas } from './authSagas';
import { tasksSagas } from './tasksSagas';
import { notificationsSagas } from './notificationsSagas';

export default function* sagas() {
  yield fork(authSagas);
  yield fork(tasksSagas);
  yield fork(notificationsSagas);
}
