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
  onboardingForms: { [id: string]: ?FormValidationResult },
  taskForm: ?FormValidationResult,
  verificationForm: ?FormValidationResult,
};

type ErrorMessage = {
  path?: string,
  message: string,
};

export default class DraftValidator {
  static emptyOnboardingResult = {};

  static valid: DraftValidateionResult = {
    onboardingForms: {},
    taskForm: null,
    verificationForm: null,
  };

  static errorMessages(result: DraftValidateionResult): Array<ErrorMessage> {
    const messages = [];

    if (result.taskForm) {
      messages.push({
        message: result.taskForm.commonMessage,
        path: 'Create Task → Task',
      });
    }
    if (result.verificationForm) {
      messages.push({
        message: result.verificationForm.commonMessage,
        path: 'Create Task → Verification',
      });
    }
    Reflect.ownKeys(result.onboardingForms).forEach(id => {
      const item = result.onboardingForms[id];
      if (item) {
        messages.push({ message: item.commonMessage, path: item.path });
      }
    });
    return messages;
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
        result[step.id] = { ...error, path: `Create Task → ${step.name}` };
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
