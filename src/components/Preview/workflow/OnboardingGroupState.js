// @flow
import { TaskWorkflowState, createTaskState, type WorkflowState } from './defs';
import { type Draft } from '../../../model/types.flow';

import {
  createOnboardingState,
  getNextOnboardingState,
  repeatOnboardingGroup,
} from './onboarding';

export default class OnboardingGroupState {
  static getNextState(
    draft: Draft,
    current: WorkflowState,
    args: any
  ): WorkflowState {
    switch (current.state) {
      case TaskWorkflowState.ONBOARDING_GROUP_FAILED: {
        if (args === false) {
          return createOnboardingState(draft);
        }
        return repeatOnboardingGroup(current);
      }
      case TaskWorkflowState.ONBOARDING_PASSED: {
        return createTaskState(draft);
      }
      case TaskWorkflowState.ONBOARDING_FAILED: {
        return createOnboardingState(draft);
      }
      default:
        break;
    }
    return getNextOnboardingState(current, args);
  }
}
