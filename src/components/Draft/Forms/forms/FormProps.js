// @flow

import { getFormModulesNames } from '@expandorg/modules/model';
import { moduleControls } from '@expandorg/modules/app';

import {
  type Module,
  type ModuleControl,
} from '@expandorg/modules/src/form/model/types.flow';

import type { Draft } from '../../../../model/types.flow';
import { getQuizDataVarialbes } from '../../../../model/onboardingData';

import FormSelection from './FormSelection';

const defaultVars = ['workerId'];

const hiddenControls = {
  task: new Set(['verify', 'progress']),
  onboarding: new Set(['verify']),
  verification: new Set(['progress']),
};

const removeActions = new Set(['remove']);
const allActions = new Set(['remove', 'copy']);

const defaultActionsCheck = (m: Module) => {
  if (m.type === 'submit' || m.type === 'wizard') {
    return removeActions;
  }
  return allActions;
};

const verificationActionsCheck = (m: Module) => {
  if (m.type === 'verify') {
    return new Set([]);
  }
  return defaultActionsCheck(m);
};

export default class FormProps {
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

  static getModuleActionsFactory(
    selection: FormSelection
  ): (m: Module) => Set<string> {
    if (selection.isVerification()) {
      return verificationActionsCheck;
    }
    return defaultActionsCheck;
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

  static getPickerControls(selection: FormSelection): Array<ModuleControl> {
    const restricted = hiddenControls[selection.type];
    if (!restricted) {
      return moduleControls;
    }
    return moduleControls.filter(({ module }) => !restricted.has(module.type));
  }
}
