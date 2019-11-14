// @flow
import { getVerificationResponse } from '@expandorg/modules/model';
import { moduleControls } from '@expandorg/modules/app';

import { type Draft } from '../../../model/types.flow';
import { createRepeatState, type WorkflowState } from './defs';

export default class VerificationState {
  static getNextState(draft: Draft, response: any): WorkflowState {
    if (draft.verificationForm) {
      const score = getVerificationResponse(
        response,
        draft.verificationForm,
        moduleControls
      );
      console.log('verification score:', score);
    }
    return createRepeatState();
  }
}
