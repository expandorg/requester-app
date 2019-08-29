// @flow
import type {
  Module,
  ModuleControlsMap,
} from '@expandorg/modules/src/form/model/types.flow';

import { moduleControls } from '@expandorg/modules/app';
import { getModuleControlsMap } from '@expandorg/modules/model';

export type FormValidationResult = {
  commonMessage: string,
  meta?: {
    id?: string,
    name?: string,
  },
  [key: string]: any,
};

export const submitModules: Array<string> = ['submit', 'wizard'];

export const findFirstVisitor = (
  modules: Array<Module>,
  condition: Function
) => {
  // eslint-disable-next-line
  for (const mod of modules) {
    const meet = condition(mod);
    if (meet) {
      return meet;
    }
    if (mod.modules) {
      const meetChildren = findFirstVisitor(mod.modules, condition);

      if (meetChildren) {
        return meetChildren;
      }
    }
  }
  return false;
};

export default class FormValidator {
  static controls: ModuleControlsMap = getModuleControlsMap(moduleControls);

  checkDeprecatedModules(modules: Array<Module>): ?FormValidationResult {
    const notSuportedType = findFirstVisitor(
      modules,
      m => !FormValidator.controls[m.type] && m.type
    );

    if (notSuportedType) {
      return {
        commonMessage: `Form includes deprecated module: ${notSuportedType}`,
      };
    }
    return null;
  }

  checkSubmit(modules: Array<Module>): ?FormValidationResult {
    if (!modules.some(module => submitModules.includes(module.type))) {
      return { commonMessage: 'Form should have submit button' };
    }
    return null;
  }

  validate(modules: Array<Module>): ?FormValidationResult {
    let error = this.checkDeprecatedModules(modules);
    if (error) {
      return error;
    }
    error = this.checkSubmit(modules);
    if (error) {
      return error;
    }
    return null;
  }
}
