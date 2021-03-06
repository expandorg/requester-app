import { fork } from 'redux-saga/effects';

import { web3Sagas } from '@expandorg/app-web3';
import { gemsSagas } from '@expandorg/app-gemtokens/sagas';

import { userSagas } from './userSagas';

import { authSagas } from './authSagas';
import { tasksSagas } from './tasksSagas';
import { draftsSagas } from './draftsSagas';
import { dataSagas } from './dataSagas';
import { notificationsSagas } from './notificationsSagas';
import { whitelistSagas } from './whitelistSagas';
import { formTemplateSagas } from './formTemplateSagas';
import { accessTokenSagas } from './accessTokenSagas';
import { jobReportsSagas } from './jobReportsSagas';
import { jobsSagas } from './jobSagas';
import { responseSagas } from './responseSagas';

export default function* sagas() {
  yield fork(authSagas);
  yield fork(userSagas);
  yield fork(notificationsSagas);

  yield fork(tasksSagas);
  yield fork(draftsSagas);
  yield fork(dataSagas);
  yield fork(whitelistSagas);
  yield fork(formTemplateSagas);
  yield fork(web3Sagas);
  yield fork(gemsSagas);
  yield fork(accessTokenSagas);
  yield fork(jobReportsSagas);
  yield fork(jobsSagas);
  yield fork(responseSagas);
}
