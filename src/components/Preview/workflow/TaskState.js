// @flow
import {
  createRepeatState,
  createVerificationState,
  type WorkflowState,
} from './defs';

import type { Draft } from '../../../model/types.flow';
import { DraftManager } from '../../../model/draft';

export default class TaskState {
  static getNextState(draft: Draft, response: any): WorkflowState {
    if (DraftManager.hasVerificationForm(draft) && draft.verificationForm) {
      return createVerificationState(draft, response);
    }
    return createRepeatState();
  }
}
