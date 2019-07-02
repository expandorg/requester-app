// @flow
import type { FormValidationResult } from '../../../model/FormValidator/FormValidator';
import DraftValidator, {
  type DraftValidateionResult,
} from '../../../model/DraftValidator';
import { FormSelection } from '../Forms/forms';

import WizardSteps from '../WizardSteps';

type ErrorMessage = {
  path?: string,
  message: string,
  nav: {
    tab: number,
  },
};

export default class DraftErrorsBuilder {
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
        nav: {
          tab: WizardSteps.Forms,
          selected: FormSelection.task,
        },
      });
    }
    if (result.verificationForm) {
      messages.push({
        message: result.verificationForm.commonMessage,
        path: 'Create Task → Verification',
        nav: {
          tab: WizardSteps.Forms,
          selected: FormSelection.verification,
        },
      });
    }
    Reflect.ownKeys(result.onboardingForms).forEach(id => {
      const item = result.onboardingForms[id];
      if (item && item.meta) {
        messages.push({
          message: item.commonMessage,
          path: `Create Task → ${item.meta.name || ''}`,
          nav: {
            tab: WizardSteps.Forms,
            selected: item.meta.id
              ? FormSelection.onboarding(item.meta.id)
              : undefined,
          },
        });
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

    const taskCount = DraftErrorsBuilder.countFormErrors(result.taskForm);
    const verificationCount = DraftErrorsBuilder.countFormErrors(
      result.verificationForm
    );

    return Reflect.ownKeys(result.onboardingForms).reduce(
      (sum, key) =>
        sum + DraftErrorsBuilder.countFormErrors(result.onboardingForms[key]),
      taskCount + verificationCount
    );
  }
}
