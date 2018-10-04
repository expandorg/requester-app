// @flow
import { createActionTypes } from '@gemsorg/app-utils';

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

  SIGNUP: null,
  SIGNUP_COMPLETE: null,
  SIGNUP_FAILED: null,

  SIGNUP_METAMASK: null,
  SIGNUP_METAMASK_COMPLETE: null,
  SIGNUP_METAMASK_FAILED: null,

  LOGOUT: null,
  LOGOUT_COMPLETE: null,
  LOGOUT_FAILED: null,
});

export const tasksActionTypes = createActionTypes('tasks', {});
