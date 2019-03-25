// @flow

import type { Module } from '@expandorg/modules/src/form/model/types.flow';

export type WorkflowForm = {
  modules: Array<Module>,
};

export type OnboardingGroup = {
  steps: Array<{
    form: WorkflowForm,
    answer?: any,
  }>,
  isGroup: boolean,
  scoreThreshold?: number,
  retries?: number,
  failureMessage?: string,
};

export type OnboardingGroupState = {
  groupIndex: number,
  stepIndex: number,
  incorrect: number,
  currentTry: number,
};

export type WorkflowState = {
  state: string,
  groups?: Array<OnboardingGroup>,
  groupState?: OnboardingGroupState,
  form?: WorkflowForm,
};

export const TaskWorkflowState = {
  ONBOARDING_GROUP: 'ONBOARDING_GROUP',
  ONBOARDING_GROUP_FAILED: 'ONBOARDING_GROUP_FAILED',
  ONBOARDING_PASSED: 'ONBOARDING_PASSED',
  ONBOARDING_FAILED: 'ONBOARDING_FAILED',
  TASK: 'TASK',
  VERIFICATION: 'VERIFICATION',
  REPEAT: 'REPEAT',
};

export const createRepeatState = (): WorkflowState => ({
  state: TaskWorkflowState.REPEAT,
});

export const createTaskState = (draft: Object): WorkflowState => ({
  state: TaskWorkflowState.TASK,
  form: draft.taskForm,
});

export const createVerificationState = (draft: Object): WorkflowState => ({
  state: TaskWorkflowState.VERIFICATION,
  form: draft.verificationForm,
});
