import { fork } from 'redux-saga/effects';
import { web3Sagas } from '@gemsorg/app-web3';
import { gemsSagas } from '@gemsorg/app-gemtokens/sagas';
import { authSagas } from './authSagas';
import { tasksSagas } from './tasksSagas';
import { draftsSagas } from './draftsSagas';
import { dataSagas } from './dataSagas';
import { notificationsSagas } from './notificationsSagas';
import { whitelistSagas } from './whitelistSagas';
import { formTemplateSagas } from './formTemplateSagas';

export default function* sagas() {
  yield fork(authSagas);
  yield fork(notificationsSagas);

  yield fork(tasksSagas);
  yield fork(draftsSagas);
  yield fork(dataSagas);
  yield fork(whitelistSagas);
  yield fork(formTemplateSagas);
  yield fork(web3Sagas);
  yield fork(gemsSagas);
}
