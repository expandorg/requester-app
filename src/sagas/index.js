import { fork } from 'redux-saga/effects';
import { authSagas } from './authSagas';

export default function* sagas() {
  yield fork(authSagas);
}
