// @flow
import { createTaskState, type WorkflowState } from './defs';
import type { Draft } from '../types.flow';
import { createOnboardingState } from './onboarding';

export default class InitialState {
  static getNextState(draft: Draft): WorkflowState {
    if (
      draft.onboarding.enabled &&
      draft.onboarding.steps &&
      draft.onboarding.steps.length
    ) {
      return createOnboardingState(draft);
    }
    return createTaskState(draft);
  }
}
