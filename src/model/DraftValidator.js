// @flow
import { type Draft } from './types.flow';
import {
  TaskFormValidator,
  OnboardingFormValidator,
  VerificationFormValidator,
} from './FormValidator';

import { DraftManager } from './draft';

import type { FormValidationResult } from './FormValidator/FormValidator';

type DraftValidateionResult = {
  onboardingForms: Array<?FormValidationResult>,
  taskForm?: ?FormValidationResult,
  verificationForm?: ?FormValidationResult,
};

const valid: DraftValidateionResult = {
  onboardingForms: [],
  taskForm: null,
  verificationForm: null,
};

export default class DraftValidator {
  taskFormValidator = new TaskFormValidator();
  verificationFormValidator = new VerificationFormValidator();
  onboardingFormValidator = new OnboardingFormValidator();

  checkVerificationForm(draft: Draft): ?FormValidationResult {
    if (!DraftManager.hasVerificationForm(draft)) {
      return null;
    }
    if (!draft.verificationForm) {
      return { commonMessage: 'Verification Form should not be empty' };
    }
    return this.verificationFormValidator.validate(
      draft.verificationForm.modules
    );
  }

  validate(draft: ?Draft): DraftValidateionResult {
    if (!draft) {
      return valid;
    }
    return {
      ...valid,
      taskForm: this.taskFormValidator.validate(draft.taskForm.modules),
      verificationForm: this.checkVerificationForm(draft),
    };
  }
}
