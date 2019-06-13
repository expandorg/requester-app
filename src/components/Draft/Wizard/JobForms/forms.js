// @flow

import type { Form } from '@expandorg/modules/src/form/model/types.flow';
import type { Draft } from '../../../../model/types.flow';

export type FormSelectionType = 'task' | 'verification' | 'onboarding';

// eslint-disable-next-line import/prefer-default-export
export class FormSelection {
  static task: FormSelection = new FormSelection('task');
  static verification: FormSelection = new FormSelection('verification');

  static onboarding(step: number): FormSelection {
    return new FormSelection('onboarding', step);
  }

  type: FormSelectionType;
  step: number;

  constructor(type: FormSelectionType, step?: number = 0) {
    this.type = type;
    this.step = step;
  }

  isOnboarding(): boolean {
    return this.type === 'onboarding';
  }

  isOnboardingStep(step: number): boolean {
    return this.isOnboarding() && this.step === step;
  }

  getForm(draft: Draft): ?Form {
    switch (this.type) {
      case 'task':
        return draft.taskForm;
      case 'verification':
        return draft.verificationForm;
      case 'onboarding': {
        return draft.onboarding.steps[this.step].form;
      }
      default:
        break;
    }
    throw new Error('Invalid selection type');
  }
}
