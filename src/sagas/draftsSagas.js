import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { draftsActionTypes } from './actionTypes';

import { draftApi } from '../api/DraftApi';
import { draftResponseSchema } from '../model/schemas';

export const fetch = (id) => ({
  type: draftsActionTypes.FETCH,
  payload: { id },
  asyncCall: draftApi.fetch,
  meta: { schema: draftResponseSchema },
});

export const createDraft = (templateId) => ({
  type: draftsActionTypes.CREATE,
  payload: { templateId },
  asyncCall: draftApi.create,
  meta: { schema: draftResponseSchema },
});

export const updateSettings = (id, settings) => ({
  type: draftsActionTypes.UPDATE_SETTINGS,
  payload: { id, settings },
  asyncCall: draftApi.updateSettings,
  meta: { schema: draftResponseSchema },
});

export const updateTaskForm = (id, form) => ({
  type: draftsActionTypes.UPDATE_TASK,
  payload: { id, form },
  asyncCall: draftApi.updateTaskForm,
  meta: { schema: draftResponseSchema },
});

export const updateVerificationSettings = (id, settings) => ({
  type: draftsActionTypes.UPDATE_VERIFICATION_SETTINGS,
  payload: { id, settings },
  asyncCall: draftApi.updateVerificationSettings,
  meta: { schema: draftResponseSchema },
});

export const updateVerificationForm = (id, form) => ({
  type: draftsActionTypes.UPDATE_VERIFICATION_FORM,
  payload: { id, form },
  asyncCall: draftApi.updateVerificationForm,
  meta: { schema: draftResponseSchema },
});

export const updateOnboarding = (id, onboarding, optimistic = false) => ({
  type: draftsActionTypes.UPDATE_ONBOARDING,
  payload: { id, onboarding },
  asyncCall: draftApi.updateOnboarding,
  meta: { schema: draftResponseSchema, optimistic },
});

export const updateVariables = (id, variables) => ({
  type: draftsActionTypes.UPDATE_VARIABLES,
  payload: { id, variables },
  asyncCall: draftApi.updateVariables,
  meta: { schema: draftResponseSchema, optimistic: true },
});

export const updateFunding = (id, funding) => ({
  type: draftsActionTypes.UPDATE_FUNDING,
  payload: { id, funding },
  asyncCall: draftApi.updateFunding,
  meta: { schema: draftResponseSchema },
});

export const updateWhitelist = (id, whitelist) => ({
  type: draftsActionTypes.UPDATE_WHITELIST,
  payload: { id, params: { whitelist } },
  asyncCall: draftApi.updateWhitelist,
  meta: { schema: draftResponseSchema },
});

export const publish = (id, schedule) => ({
  type: draftsActionTypes.PUBLISH,
  payload: { id, schedule },
  asyncCall: draftApi.publish,
  meta: { schema: draftResponseSchema },
});

export const removeDraft = (draft) => ({
  type: draftsActionTypes.REMOVE,
  payload: { id: draft.id },
  asyncCall: draftApi.remove,
});

export const copyDraft = (draft) => ({
  type: draftsActionTypes.COPY,
  payload: { id: draft.id },
  asyncCall: draftApi.copy,
  meta: { schema: draftResponseSchema, originalId: draft.id },
});

export function* draftsSagas() {
  const actions = [
    draftsActionTypes.FETCH,
    draftsActionTypes.CREATE,
    draftsActionTypes.UPDATE_SETTINGS,
    draftsActionTypes.UPDATE_VARIABLES,
    draftsActionTypes.UPDATE_VERIFICATION_SETTINGS,
    draftsActionTypes.UPDATE_TASK,
    draftsActionTypes.UPDATE_VERIFICATION_FORM,
    draftsActionTypes.UPDATE_ONBOARDING,
    draftsActionTypes.UPDATE_FUNDING,
    draftsActionTypes.UPDATE_WHITELIST,
    draftsActionTypes.PUBLISH,
    draftsActionTypes.REMOVE,
    draftsActionTypes.COPY,
  ];
  yield takeEvery(actions, handleAsyncCall);
}
