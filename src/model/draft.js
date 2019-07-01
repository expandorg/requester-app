// @flow

import { rules } from '@expandorg/validation';
import { VerificationType } from './enums';
import { ge } from './validation';

import { type Draft } from './types.flow';

export class DraftManager {
  static hasFunding = (draft: ?Draft) =>
    draft && draft.funding && typeof draft.funding.balance !== 'undefined';

  static hasData = (draft: ?Draft) =>
    draft && draft.dataId !== null && draft.dataId !== undefined;

  static validate = (draft: Draft) => {
    if (!DraftManager.hasFunding(draft)) {
      return false;
    }
    return true;
  };

  static hasVerificationForm = ({ verification }: Draft) =>
    verification.module === VerificationType.Requester ||
    verification.module === VerificationType.AuditWhitelist;
}

export const settingsRules = {
  name: [
    [rules.isRequired, 'Title is required'],
    [
      (x: string) => x && x.length <= 40,
      'Title can be a maximum of 40 characters',
    ],
  ],
  // description: [[rules.isRequired, 'Description is required']],
};

export const onboardingGroupSettingsRules = {
  retries: [[rules.isNumber, 'Should be a positive number'], ge(0)],
  scoreThreshold: [[rules.isNumber, 'Should be a positive number'], ge(0)],
  failureMessage: [[rules.isRequired, 'Failure Message is required']],
};
