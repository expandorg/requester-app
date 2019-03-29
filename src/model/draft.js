// @flow
import nanoid from 'nanoid';

import { rules } from '@expandorg/validation';
import { VerificationType } from './enums';

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
    draft && draft.funding && typeof draft.funding.reward !== 'undefined';

  static hasData = (draft: ?Draft) =>
    draft && draft.dataId !== null && draft.dataId !== undefined;

  static validate = (draft: Draft) => {
    if (!DraftManager.hasTemplate(draft)) {
      return false;
    }
    if (!DraftManager.hasFunding(draft)) {
      return false;
    }
    return true;
  };
}

export const settingsRules = {
  name: [
    [rules.isRequired, 'Title is required'],
    [
      (x: string) => x && x.length <= 40,
      'Title can be a maximum of 40 characters',
    ],
  ],
  description: [[rules.isRequired, 'Description is required']],
};

const ge = (g: number = 0) => [
  (v: number) => v >= g,
  `Should be greater then ${g}`,
];

export const fundingRules = {
  balance: [[rules.isNumber, 'Should be a positive number'], ge(0)],
  reward: [[rules.isNumber, 'Should be a positive number'], ge(0)],
};

export const onboardingGroupSettingsRules = {
  retries: [[rules.isNumber, 'Should be a positive number'], ge(0)],
  scoreThreshold: [[rules.isNumber, 'Should be a positive number'], ge(0)],
  failureMessage: [[rules.isRequired, 'Failure Message is required']],
};

export const shouldUseVerificationForm = ({ verification }: Draft) =>
  verification.module === VerificationType.Requester ||
  verification.module === VerificationType.AuditWhitelist;

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
