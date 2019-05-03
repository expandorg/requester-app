import { takeEvery } from 'redux-saga/effects';

import { handleAsyncCall } from '@expandorg/app-utils';

import { draftsActionTypes } from './actionTypes';

import { draftApi } from '../api/DraftApi';
import { draftResponseSchema } from '../model/schemas';

export const fetch = id => ({
  type: draftsActionTypes.FETCH,
  payload: { id },
  asyncCall: draftApi.fetch,
  meta: { schema: draftResponseSchema },
});

export const createDraft = templateId => ({
  type: draftsActionTypes.CREATE,
  payload: { templateId },
  asyncCall: draftApi.create,
  meta: { schema: draftResponseSchema },
});

export const updateSettings = (id, params) => ({
  type: draftsActionTypes.UPDATE_SETTINGS,
  payload: { id, params },
  asyncCall: draftApi.update,
  meta: { schema: draftResponseSchema },
});

export const selectTemplate = (id, templateId) => ({
  type: draftsActionTypes.UPDATE_TEMPLATE,
  payload: { id, templateId },
  asyncCall: draftApi.template,
  meta: { schema: draftResponseSchema },
});

export const updateTaskForm = (id, taskForm) => ({
  type: draftsActionTypes.UPDATE_TASK,
  payload: { id, params: { taskForm } },
  asyncCall: draftApi.update,
  meta: { schema: draftResponseSchema },
});

export const updateVerificationForm = (id, verificationForm) => ({
  type: draftsActionTypes.UPDATE_VERIFICATION,
  payload: { id, params: { verificationForm } },
  asyncCall: draftApi.update,
  meta: { schema: draftResponseSchema },
});

export const updateOnboarding = (id, onboarding) => ({
  type: draftsActionTypes.UPDATE_ONBOARDING,
  payload: { id, params: { onboarding } },
  asyncCall: draftApi.update,
  meta: { schema: draftResponseSchema },
});

export const updateFunding = (id, funding) => ({
  type: draftsActionTypes.UPDATE_FUNDING,
  payload: { id, params: { funding } },
  asyncCall: draftApi.update,
  meta: { schema: draftResponseSchema },
});

export const updateWhitelist = (id, whitelist) => ({
  type: draftsActionTypes.UPDATE_WHITELIST,
  payload: { id, params: { whitelist } },
  asyncCall: draftApi.update,
  meta: { schema: draftResponseSchema },
});

export const publish = (id, schedule) => ({
  type: draftsActionTypes.PUBLISH,
  payload: { id, schedule },
  asyncCall: draftApi.publish,
  meta: { schema: draftResponseSchema },
});

export const removeDraft = draft => ({
  type: draftsActionTypes.REMOVE,
  payload: { id: draft.id },
  asyncCall: draftApi.remove,
});

export const copyDraft = draft => ({
  type: draftsActionTypes.COPY,
  payload: { id: draft.id },
  asyncCall: draftApi.copy,
  meta: { schema: draftResponseSchema },
});

export function* draftsSagas() {
  const actions = [
    draftsActionTypes.FETCH,
    draftsActionTypes.CREATE,
    draftsActionTypes.UPDATE_SETTINGS,
    draftsActionTypes.UPDATE_TEMPLATE,
    draftsActionTypes.UPDATE_TASK,
    draftsActionTypes.UPDATE_VERIFICATION,
    draftsActionTypes.UPDATE_ONBOARDING,
    draftsActionTypes.UPDATE_FUNDING,
    draftsActionTypes.UPDATE_WHITELIST,
    draftsActionTypes.PUBLISH,
    draftsActionTypes.REMOVE,
    draftsActionTypes.COPY,
  ];
  yield takeEvery(actions, handleAsyncCall);
}
