import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { formActionTypes } from './actionTypes';

import { templatesApi } from '../api/TemplatesApi';
import { formTemplateSchema } from '../model/schemas';

export const fetchFormTemplates = () => ({
  type: formActionTypes.FETCH_TEMPLATES,
  payload: {},
  asyncCall: templatesApi.formTemplates,
  meta: { schema: { templates: [formTemplateSchema] } },
});

export const fetchFormTemplate = id => ({
  type: formActionTypes.FETCH_TEMPLATE,
  payload: { id },
  asyncCall: templatesApi.formTemplate,
  meta: { schema: { template: formTemplateSchema } },
});

export function* formTemplateSagas() {
  const actions = [
    formActionTypes.FETCH_TEMPLATES,
    formActionTypes.FETCH_TEMPLATE,
  ];

  yield takeEvery(actions, handleAsyncCall);
}
