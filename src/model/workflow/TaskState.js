// @flow
import {
  createRepeatState,
  // createVerificationState,
  type WorkflowState,
} from './defs';

import type { Draft } from '../types.flow';

export default class TaskState {
  static getNextState(draft: Draft): WorkflowState {
    if (draft.verificationForm) {
      return createRepeatState();
    }
    return createRepeatState();
  }
}
