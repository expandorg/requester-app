// @flow

import { type Form } from '@expandorg/modules/src/form/model/types.flow';

import type { Draft, DraftOnboardingStep } from '../../../../model/types.flow';

type FormSelectionType = 'task' | 'verification' | 'onboarding' | string;

export default class FormSelection {
  static task: FormSelection = new FormSelection('task');
  static verification: FormSelection = new FormSelection('verification');

  static onboarding(step: string, settings: any = null): FormSelection {
    return new FormSelection('onboarding', step, settings);
  }

  type: FormSelectionType;
  step: ?string;
  settings: ?any;

  constructor(
    type: FormSelectionType,
    step: ?string = null,
    settings: any = null
  ) {
    this.type = type;
    this.step = step;
    this.settings = settings;
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

  getFormId(): string {
    return `${this.type}-${this.step || ''}`;
  }

  isOnboardingStep(step: string): boolean {
    return this.isOnboarding() && this.step === step;
  }

  quizDialog(id: string): boolean {
    return this.isOnboardingStep(id) && !!this.settings;
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
