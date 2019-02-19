// @flow
import {
  createRepeatState,
  // createVerificationState,
  type WorkflowState,
} from './defs';

export default class TaskState {
  static getNextState(draft: Object): WorkflowState {
    if (draft.verificationForm) {
      return createRepeatState();
      // return createVerificationState(draft);
    }
    return createRepeatState();
  }
}
