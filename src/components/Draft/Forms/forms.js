// @flow

import { type Form } from '@expandorg/modules/src/form/model/types.flow';
import type { Draft, DraftOnboardingStep } from '../../../model/types.flow';

import {
  validationFormProps,
  validationTaskFormProps,
} from '../../shared/FormEditor/model/validation';

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

  isTask(): boolean {
    return this.type === 'task';
  }

  isVerification(): boolean {
    return this.type === 'verification';
  }

  isOnboardingStep(step: string): boolean {
    return this.isOnboarding() && this.step === step;
  }

  isQuiz(draft: Draft): boolean {
    const step = this.getOnboardingStep(draft);
    return step ? step.isGroup : false;
  }

  getOnboardingStep(draft: Draft): ?DraftOnboardingStep {
    if (!this.isOnboarding()) {
      throw new Error('invalid selection type');
    }

    if (!draft.onboarding || !draft.onboarding.steps) {
      return null;
    }

    return draft.onboarding.steps.find(s => s.id === this.step);
  }

  getForm(draft: Draft): ?Form {
    switch (this.type) {
      case 'task':
        return draft.taskForm;
      case 'verification':
        return draft.verificationForm;
      case 'onboarding': {
        const selected = this.getOnboardingStep(draft);
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
    task: () => {},
    ver: () => {},
    onb: () => {}
  ): () => {} {
    switch (selection) {
      case FormSelection.task:
        return task;
      case FormSelection.verification:
        return ver;
      default:
        break;
    }
    return onb;
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

  static getFormProps(
    selection: FormSelection,
    dataColumns: Array<string>,
    draft: Draft,
    toggleVars: Function
  ) {
    const isOnboarding = selection.isOnboarding();
    return {
      variables: dataColumns,
      validateForm: FormProps.getValidator(selection),
      onToggleVarsDialog:
        !isOnboarding || selection.isQuiz(draft) ? toggleVars : undefined,
    };
  }
}
