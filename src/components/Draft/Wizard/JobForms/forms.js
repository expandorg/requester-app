// @flow

import type { Form } from '@expandorg/modules/src/form/model/types.flow';
import type { Draft } from '../../../../model/types.flow';

import {
  validationFormProps,
  validationTaskFormProps,
} from '../../../shared/FormEditor/model/validation';

export type FormSelectionType = 'task' | 'verification' | 'onboarding';

export class FormSelection {
  static task: FormSelection = new FormSelection('task');
  static verification: FormSelection = new FormSelection('verification');

  static onboarding(step: string): FormSelection {
    return new FormSelection('onboarding', step);
  }

  type: FormSelectionType;
  step: ?string;

  constructor(type: FormSelectionType, step: ?string = null) {
    this.type = type;
    this.step = step;
  }

  isOnboarding(): boolean {
    return this.type === 'onboarding';
  }

  isOnboardingStep(step: string): boolean {
    return this.isOnboarding() && this.step === step;
  }

  getForm(draft: Draft): ?Form {
    switch (this.type) {
      case 'task':
        return draft.taskForm;
      case 'verification':
        return draft.verificationForm;
      case 'onboarding': {
        const selected =
          draft.onboarding && draft.onboarding.steps
            ? draft.onboarding.steps.find(s => s.id === this.step)
            : null;
        return selected ? selected.form : null;
      }
      default:
        break;
    }
    throw new Error('Invalid selection type');
  }
}

export class FormProps {
  static getUpdateAction(
    selection: FormSelection,
    updateTask: Function,
    updateVerification: Function,
    updateOnboarding: Function
  ): Function {
    switch (selection) {
      case FormSelection.task:
        return updateTask;
      case FormSelection.verification:
        return updateVerification;
      default:
        break;
    }
    return updateOnboarding;
  }

  static getValidator(selection: FormSelection): Function {
    switch (selection) {
      case FormSelection.task:
        return validationTaskFormProps;
      case FormSelection.verification:
        return validationTaskFormProps;
      default:
        break;
    }
    return validationFormProps;
  }

  static getFormProps(selection: FormSelection, dataColumns: Array<string>) {
    return {
      variables: dataColumns,
      validateForm: FormProps.getValidator(selection),
    };
  }
}
