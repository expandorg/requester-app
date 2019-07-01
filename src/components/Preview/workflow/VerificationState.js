// @flow
import { createRepeatState, type WorkflowState } from './defs';

export default class VerificationState {
  static getNextState(): WorkflowState {
    return createRepeatState();
  }
}
