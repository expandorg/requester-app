// @flow
import { createActionTypes } from '@expandorg/app-utils';

export const tasksActionTypes = createActionTypes('tasks', {
  FETCH: null,
  FETCH_COMPLETE: null,
  FETCH_FAILED: null,

  FETCH_STATS: null,
  FETCH_STATS_COMPLETE: null,
  FETCH_STATS_FAILED: null,

  FETCH_LIST: null,
  FETCH_LIST_COMPLETE: null,
  FETCH_LIST_FAILED: null,

  FETCH_TEMPLATES: null,
  FETCH_TEMPLATES_COMPLETE: null,
  FETCH_TEMPLATES_FAILED: null,

  FETCH_TEMPLATE: null,
  FETCH_TEMPLATE_COMPLETE: null,
  FETCH_TEMPLATE_FAILED: null,
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

  UPDATE_VARIABLES: null,
  UPDATE_VARIABLES_COMPLETE: null,
  UPDATE_VARIABLES_FAILED: null,

  UPDATE_TASK: null,
  UPDATE_TASK_COMPLETE: null,
  UPDATE_TASK_FAILED: null,

  UPDATE_VERIFICATION_SETTINGS: null,
  UPDATE_VERIFICATION_SETTINGS_COMPLETE: null,
  UPDATE_VERIFICATION_SETTINGS_FAILED: null,

  UPDATE_VERIFICATION_FORM: null,
  UPDATE_VERIFICATION_FORM_COMPLETE: null,
  UPDATE_VERIFICATION_FORM_FAILED: null,

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

  REMOVE: null,
  REMOVE_COMPLETE: null,
  REMOVE_FAILED: null,

  COPY: null,
  COPY_COMPLETE: null,
  COPY_FAILED: null,
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

export const formActionTypes = createActionTypes('formTemplates', {
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

export const accessTokenActionTypes = createActionTypes('accessTokens', {
  GENERATE_KEY: null,
  GENERATE_KEY_COMPLETE: null,
  GENERATE_KEY_FAILED: null,
});

export const jobReportsActionTypes = createActionTypes('jobReports', {
  FETCH_LIST: null,
  FETCH_LIST_COMPLETE: null,
  FETCH_LIST_FAILED: null,
});

export const jobsActionTypes = createActionTypes('jobs', {
  FETCH: null,
  FETCH_COMPLETE: null,
  FETCH_FAILED: null,
});

export const responsesActionTypes = createActionTypes('responses', {
  FETCH_ACCEPTED: null,
  FETCH_ACCEPTED_COMPLETE: null,
  FETCH_ACCEPTED_FAILED: null,

  FETCH_PENDING: null,
  FETCH_PENDING_COMPLETE: null,
  FETCH_PENDING_FAILED: null,

  BULK_VERIFY: null,
  BULK_VERIFY_COMPLETE: null,
  BULK_VERIFY_FAILED: null,
});
