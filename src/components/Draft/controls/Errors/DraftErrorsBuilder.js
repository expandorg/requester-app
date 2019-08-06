// @flow
import { type DraftValidateionResult } from '../../../../model/DraftValidator';
import { FormSelection } from '../../Forms/forms';

import WizardSteps from '../../WizardSteps';

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
}
