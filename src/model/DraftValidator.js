// @flow
import { type Draft } from './types.flow';
import {
  TaskFormValidator,
  OnboardingFormValidator,
  VerificationFormValidator,
} from './FormValidator';

import { DraftManager } from './draft';

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

  checkVerificationForm(draft: Draft): ?FormValidationResult {
    if (!DraftManager.hasVerificationForm(draft)) {
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
}
