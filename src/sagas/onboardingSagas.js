import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@gemsorg/app-utils';

import { onboardingActionTypes } from './actionTypes';

import { templatesApi } from '../api/TemplatesApi';

export const fetchOnboardingTemplates = () => ({
  type: onboardingActionTypes.FETCH_TEMPLATES,
  payload: {},
  asyncCall: templatesApi.onboardingTemplates,
});

export const fetchOnboardingTemplate = id => ({
  type: onboardingActionTypes.FETCH_TEMPLATE,
  payload: { id },
  asyncCall: templatesApi.onboardingTemplate,
});

export function* onboardingSagas() {
  const actions = [
    onboardingActionTypes.FETCH_TEMPLATES,
    onboardingActionTypes.FETCH_TEMPLATE,
  ];

  yield takeEvery(actions, handleAsyncCall);
}
