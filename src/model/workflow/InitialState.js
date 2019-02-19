// @flow
import { createTaskState, type WorkflowState } from './defs';
import { createOnboardingState } from './onboarding';

export default class InitialState {
  static getNextState(draft: Object): WorkflowState {
    if (draft.onboarding.enabled) {
      return createOnboardingState(draft);
    }
    return createTaskState(draft);
  }
}
