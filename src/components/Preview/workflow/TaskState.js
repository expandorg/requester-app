// @flow
import {
  createRepeatState,
  createVerificationState,
  type WorkflowState,
} from './defs';

import type { Draft } from '../../../model/types.flow';

export default class TaskState {
  static getNextState(draft: Draft, response: any): WorkflowState {
    if (draft.verificationForm) {
      return createVerificationState(draft, response);
    }
    return createRepeatState();
  }
}
