/* eslint-disable max-classes-per-file */
// @flow

import { getFormModulesNames } from '@expandorg/modules/model';
import { moduleControls } from '@expandorg/modules/app';

import {
  type Form,
  type ModuleControl,
} from '@expandorg/modules/src/form/model/types.flow';
import type { Draft, DraftOnboardingStep } from '../../../model/types.flow';
import { getQuizDataVarialbes } from '../../../model/onboardingData';

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

const defaultVars = ['workerId'];

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

  static getVariablesParams(
    selection: FormSelection,
    draft: Draft,
    onToggleVarsDialog: Function
  ) {
    if (selection.isTask()) {
      return {
        variables: [...(draft.variables || []), ...defaultVars],
        onToggleVarsDialog,
      };
    }
    if (selection.isVerification()) {
      return {
        variables: [
          ...getFormModulesNames(draft.taskForm),
          ...(draft.variables || []),
          ...defaultVars,
        ],
        onToggleVarsDialog,
      };
    }

    const group = selection.getOnboardingStep(draft);
    if (group && group.isGroup) {
      return {
        variables: getQuizDataVarialbes(group.data),
        onToggleVarsDialog,
      };
    }
    return {};
  }

  static getPickerModules(selection: FormSelection): Array<ModuleControl> {
    if (selection.isTask()) {
      return moduleControls;
    }
    if (selection.isVerification()) {
      return moduleControls;
    }
    return moduleControls;
  }
}
