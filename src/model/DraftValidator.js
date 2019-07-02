// @flow
import { type Draft } from './types.flow';
import {
  TaskFormValidator,
  OnboardingFormValidator,
  VerificationFormValidator,
} from './FormValidator';

import { VerificationType } from './enums';

import type { FormValidationResult } from './FormValidator/FormValidator';

export type DraftValidateionResult = {
  onboardingForms: { [id: string]: ?FormValidationResult },
  taskForm: ?FormValidationResult,
  verificationForm: ?FormValidationResult,
};

export default class DraftValidator {
  static emptyOnboardingResult = {};

  static valid: DraftValidateionResult = {
    onboardingForms: {},
    taskForm: null,
    verificationForm: null,
  };

  static hasData = ({ dataId }: Draft) =>
    dataId !== null && dataId !== undefined;

  static hasFunding = ({ funding }: Draft) =>
    funding && typeof funding.balance !== 'undefined';

  static hasVerificationForm = ({ verification }: Draft) =>
    verification.module === VerificationType.Requester ||
    verification.module === VerificationType.AuditWhitelist;

  taskValidator = new TaskFormValidator();
  verificationValidator = new VerificationFormValidator();
  onboardingValidator = new OnboardingFormValidator();

  checkOnboardingForms(draft: Draft) {
    if (!draft.onboarding.steps || !draft.onboarding.steps.length) {
      return DraftValidator.emptyOnboardingResult;
    }

    return draft.onboarding.steps.reduce((result, step) => {
      const error = this.onboardingValidator.validate(step.form.modules);
      if (error) {
        result[step.id] = { ...error, meta: { name: step.name, id: step.id } };
      }
      return result;
    }, {});
  }

  static countFormErrors(formResult: ?FormValidationResult): number {
    if (!formResult) {
      return 0;
    }
    return 1;
  }

  static errorsCount(result: DraftValidateionResult): number {
    if (result === DraftValidator.valid) {
      return 0;
    }

    const taskCount = DraftValidator.countFormErrors(result.taskForm);
    const verificationCount = DraftValidator.countFormErrors(
      result.verificationForm
    );

    return Reflect.ownKeys(result.onboardingForms).reduce(
      (sum, key) =>
        sum + DraftValidator.countFormErrors(result.onboardingForms[key]),
      taskCount + verificationCount
    );
  }

  checkVerificationForm(draft: Draft): ?FormValidationResult {
    if (!DraftValidator.hasVerificationForm(draft)) {
      return null;
    }
    if (!draft.verificationForm) {
      return { commonMessage: 'Verification Form should not be empty' };
    }
    return this.verificationValidator.validate(draft.verificationForm.modules);
  }

  validate(draft: ?Draft): DraftValidateionResult {
    if (!draft) {
      return DraftValidator.valid;
    }
    return {
      onboardingForms: this.checkOnboardingForms(draft),
      taskForm: this.taskValidator.validate(draft.taskForm.modules),
      verificationForm: this.checkVerificationForm(draft),
    };
  }

  static isReadyToPublish(
    result: DraftValidateionResult,
    draft: Draft
  ): boolean {
    if (!DraftValidator.hasFunding(draft)) {
      return false;
    }
    return DraftValidator.errorsCount(result) === 0;
  }
}
