// @flow
import { type Draft } from '../../../model/types.flow';
import { TaskWorkflowState, type WorkflowState } from './defs';

import InitialState from './InitialState';
import OnboardingGroupState from './OnboardingGroupState';
import TaskState from './TaskState';
import VerificationState from './VerificationState';

export default class TaskWorkflowBackend {
  static getNextState(
    draft: Draft,
    current?: WorkflowState,
    response?: any
  ): WorkflowState {
    if (current !== null && current !== undefined) {
      switch (current.state) {
        case TaskWorkflowState.ONBOARDING_GROUP:
        case TaskWorkflowState.ONBOARDING_GROUP_FAILED:
        case TaskWorkflowState.ONBOARDING_PASSED:
        case TaskWorkflowState.ONBOARDING_FAILED: {
          return OnboardingGroupState.getNextState(draft, current, response);
        }
        case TaskWorkflowState.TASK: {
          return TaskState.getNextState(draft, response);
        }
        case TaskWorkflowState.VERIFICATION: {
          return VerificationState.getNextState();
        }
        default:
          break;
      }
    }
    return InitialState.getNextState(draft);
  }
}
