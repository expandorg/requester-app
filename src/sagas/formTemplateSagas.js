import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@gemsorg/app-utils';

import { formActionTypes } from './actionTypes';

import { templatesApi } from '../api/TemplatesApi';

export const fetchFormTemplates = () => ({
  type: formActionTypes.FETCH_TEMPLATES,
  payload: {},
  asyncCall: templatesApi.formTemplates,
});

export const fetchFormTemplate = id => ({
  type: formActionTypes.FETCH_TEMPLATE,
  payload: { id },
  asyncCall: templatesApi.formTemplate,
});

export function* formTemplateSagas() {
  const actions = [
    formActionTypes.FETCH_TEMPLATES,
    formActionTypes.FETCH_TEMPLATE,
  ];

  yield takeEvery(actions, handleAsyncCall);
}
