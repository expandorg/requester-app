// @flow
import nanoid from 'nanoid';

import { rules } from '@expandorg/validation';
import { VerificationType } from './enums';
import { ge } from './validation';

import {
  type Draft,
  type DraftOnboardingGroupTemplate,
  type DraftOnboardingStep,
} from './types.flow';

export class DraftManager {
  static hasTemplate = (draft: ?Draft) =>
    draft && draft.templateId !== null && draft.templateId !== undefined;

  static hasWhitelist = (draft: ?Draft) =>
    draft && draft.whitelist !== null && draft.whitelist !== undefined;

  static hasFunding = (draft: ?Draft) =>
    draft && draft.funding && typeof draft.funding.balance !== 'undefined';

  static hasData = (draft: ?Draft) =>
    draft && draft.dataId !== null && draft.dataId !== undefined;

  static isFormsReviewed(draft: ?Draft) {
    if (!draft) {
      return false;
    }
    if (!DraftManager.isVerificationFormReviewed(draft)) {
      return false;
    }
    return DraftManager.isTaskFormReviewed(draft);
  }

  static isVerificationFormReviewed(draft: Draft) {
    if (!DraftManager.shouldUseVerificationForm(draft)) {
      return true;
    }
    return !!draft.verificationReviewed;
  }

  static isTaskFormReviewed(draft: Draft) {
    return !!draft.taskReviewed;
  }

  static validate = (draft: Draft) => {
    if (!DraftManager.hasFunding(draft)) {
      return false;
    }
    return true;
  };

  static shouldUseVerificationForm = ({ verification }: Draft) =>
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

export const getOnboardingStepFromTemplate = ({
  name,
  taskForm,
  isGroup,
  scoreThreshold,
  retries,
  failureMessage,
  data,
}: DraftOnboardingGroupTemplate): DraftOnboardingStep => ({
  id: nanoid(),
  name,
  isGroup,
  scoreThreshold,
  retries,
  failureMessage,
  data,
  form: taskForm,
});
