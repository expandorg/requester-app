// @flow
import {
  createRepeatState,
  createVerificationState,
  type WorkflowState,
} from './defs';

import type { Draft } from '../../../model/types.flow';
import DraftValidator from '../../../model/DraftValidator';

export default class TaskState {
  static getNextState(draft: Draft, response: any): WorkflowState {
    if (DraftValidator.hasVerificationForm(draft) && draft.verificationForm) {
      return createVerificationState(draft, response);
    }
    return createRepeatState();
  }
}
