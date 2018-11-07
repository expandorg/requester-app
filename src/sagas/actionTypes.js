// @flow
import { createActionTypes } from '@gemsorg/app-utils';

export const appActionTypes = createActionTypes('app', {
  NOTIFICATION_ADD: null,
  NOTIFICATION_REMOVE: null,
});

export const authActionTypes = createActionTypes('auth', {
  GET_CURRENT: null,
  GET_CURRENT_COMPLETE: null,
  GET_CURRENT_FAILED: null,

  LOGIN: null,
  LOGIN_COMPLETE: null,
  LOGIN_FAILED: null,

  LOGIN_METAMASK: null,
  LOGIN_METAMASK_COMPLETE: null,
  LOGIN_METAMASK_FAILED: null,

  LOGOUT: null,
  LOGOUT_COMPLETE: null,
  LOGOUT_FAILED: null,
});

export const tasksActionTypes = createActionTypes('tasks', {
  FETCH_LIST: null,
  FETCH_LIST_COMPLETE: null,
  FETCH_LIST_FAILED: null,

  FETCH_TEMPLATES: null,
  FETCH_TEMPLATES_COMPLETE: null,
  FETCH_TEMPLATES_FAILED: null,
});

export const draftsActionTypes = createActionTypes('drafts', {
  FETCH: null,
  FETCH_COMPLETE: null,
  FETCH_FAILED: null,

  CREATE: null,
  CREATE_COMPLETE: null,
  CREATE_FAILED: null,

  UPDATE_SETTINGS: null,
  UPDATE_SETTINGS_COMPLETE: null,
  UPDATE_SETTINGS_FAILED: null,

  UPDATE_TEMPLATE: null,
  UPDATE_TEMPLATE_COMPLETE: null,
  UPDATE_TEMPLATE_FAILED: null,

  UPDATE_TEMPLATE_SETTINGS: null,
  UPDATE_TEMPLATE_SETTINGS_COMPLETE: null,
  UPDATE_TEMPLATE_SETTINGS_FAILED: null,

  UPDATE_TASK: null,
  UPDATE_TASK_COMPLETE: null,
  UPDATE_TASK_FAILED: null,

  UPDATE_ONBOARDING: null,
  UPDATE_ONBOARDING_COMPLETE: null,
  UPDATE_ONBOARDING_FAILED: null,

  UPDATE_FUNDING: null,
  UPDATE_FUNDING_COMPLETE: null,
  UPDATE_FUNDING_FAILED: null,

  UPDATE_WHITELIST: null,
  UPDATE_WHITELIST_COMPLETE: null,
  UPDATE_WHITELIST_FAILED: null,

  PUBLISH: null,
  PUBLISH_COMPLETE: null,
  PUBLISH_FAILED: null,
});

export const dataActionTypes = createActionTypes('data', {
  FETCH: null,
  FETCH_COMPLETE: null,
  FETCH_FAILED: null,

  UPLOAD_DATA: null,
  UPLOAD_DATA_COMPLETE: null,
  UPLOAD_DATA_FAILED: null,

  UPDATE_COLUMNS: null,
  UPDATE_COLUMNS_COMPLETE: null,
  UPDATE_COLUMNS_FAILED: null,

  REMOVE_DATA: null,
  REMOVE_DATA_COMPLETE: null,
  REMOVE_DATA_FAILED: null,
});

export const onboardingActionTypes = createActionTypes('onboarding', {
  FETCH_TEMPLATES: null,
  FETCH_TEMPLATES_COMPLETE: null,
  FETCH_TEMPLATES_FAILED: null,

  FETCH_TEMPLATE: null,
  FETCH_TEMPLATE_COMPLETE: null,
  FETCH_TEMPLATE_FAILED: null,
});

export const whitelistActionTypes = createActionTypes('whitelist', {
  GET_ELIGIBLE: null,
  GET_ELIGIBLE_COMPLETE: null,
  GET_ELIGIBLE_FAILED: null,
});
