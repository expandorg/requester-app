// @flow

import type { Form } from '@expandorg/modules/src/form/model/types.flow';
import type { Draft } from '../../../model/types.flow';

export type OnboardingGroup = {
  steps: Array<{
    form: Form,
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
  form?: Form,
  response?: ?any,
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

export const createTaskState = (draft: Draft): WorkflowState => ({
  state: TaskWorkflowState.TASK,
  form: draft.taskForm,
});

export const createVerificationState = (
  draft: Draft,
  response: any
): WorkflowState => ({
  state: TaskWorkflowState.VERIFICATION,
  form: draft.verificationForm,
  response: response || {},
});
