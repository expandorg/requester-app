import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@gemsorg/app-utils';

import { draftsActionTypes } from './actionTypes';

import { draftApi } from '../api/DraftApi';

export const fetch = id => ({
  type: draftsActionTypes.FETCH,
  payload: { id },
  asyncCall: draftApi.fetch,
});

export const createDraft = draft => ({
  type: draftsActionTypes.CREATE,
  payload: { draft },
  asyncCall: draftApi.create,
});

export const updateSettings = (id, params) => ({
  type: draftsActionTypes.UPDATE_SETTINGS,
  payload: { id, params },
  asyncCall: draftApi.patch,
});

export const selectTemplate = (id, templateId) => ({
  type: draftsActionTypes.UPDATE_TEMPLATE,
  payload: { id, params: { templateId } },
  asyncCall: draftApi.patch,
});

export const updateTemplateSettings = (id, params) => ({
  type: draftsActionTypes.UPDATE_TEMPLATE_SETTINGS,
  payload: { id, params },
  asyncCall: draftApi.patch,
});

export const updateTask = (id, task) => ({
  type: draftsActionTypes.UPDATE_TASK,
  payload: { id, params: { task } },
  asyncCall: draftApi.patch,
});

export const updateOnboarding = (id, onboarding) => ({
  type: draftsActionTypes.UPDATE_ONBOARDING,
  payload: { id, params: { onboarding } },
  asyncCall: draftApi.patch,
});

export const updateFunding = (id, funding) => ({
  type: draftsActionTypes.UPDATE_FUNDING,
  payload: { id, params: { funding } },
  asyncCall: draftApi.patch,
});

export const updateWhitelist = (id, whitelist) => ({
  type: draftsActionTypes.UPDATE_WHITELIST,
  payload: { id, params: { whitelist } },
  asyncCall: draftApi.patch,
});
export const publish = (id, schedule) => ({
  type: draftsActionTypes.PUBLISH,
  payload: { id, schedule },
  asyncCall: draftApi.publish,
});

export function* draftsSagas() {
  const actions = [
    draftsActionTypes.FETCH,
    draftsActionTypes.CREATE,
    draftsActionTypes.UPDATE_SETTINGS,
    draftsActionTypes.UPDATE_TEMPLATE,
    draftsActionTypes.UPDATE_TEMPLATE_SETTINGS,
    draftsActionTypes.UPDATE_TASK,
    draftsActionTypes.UPDATE_ONBOARDING,
    draftsActionTypes.UPDATE_FUNDING,
    draftsActionTypes.UPDATE_WHITELIST,
    draftsActionTypes.PUBLISH,
  ];
  yield takeEvery(actions, handleAsyncCall);
}
