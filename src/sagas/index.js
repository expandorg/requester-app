import { fork } from 'redux-saga/effects';
import { authSagas } from './authSagas';
import { tasksSagas } from './tasksSagas';
import { draftsSagas } from './draftsSagas';
import { dataSagas } from './dataSagas';
import { notificationsSagas } from './notificationsSagas';
import { whitelistSagas } from './whitelistSagas';

export default function* sagas() {
  yield fork(authSagas);
  yield fork(notificationsSagas);

  yield fork(tasksSagas);
  yield fork(draftsSagas);
  yield fork(dataSagas);
  yield fork(whitelistSagas);
}
