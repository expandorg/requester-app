import { fork } from 'redux-saga/effects';
import { authSagas } from './authSagas';
import { tasksSagas } from './tasksSagas';

export default function* sagas() {
  yield fork(authSagas);
  yield fork(tasksSagas);
}
