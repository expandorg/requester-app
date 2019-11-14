// @flow
import { getVerificationResponse } from '@expandorg/modules/model';

import { type Draft } from '../../../model/types.flow';
import { createRepeatState, type WorkflowState } from './defs';

export default class VerificationState {
  static getNextState(draft: Draft, response: any): WorkflowState {
    const score = getVerificationResponse(response, draft.verificationForm);
    console.log('verification score:', score);
    return createRepeatState();
  }
}
