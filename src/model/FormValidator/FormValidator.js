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

export const inputModules: Array<string> = ['submit', 'wizard'];

export default class FormValidator {
  static controls: ModuleControlsMap = getModuleControlsMap(moduleControls);

  static conditionalVisitor = (
    modules: Array<Module>,
    conditional: Function
  ) => {
    // eslint-disable-next-line
    for (const mod of modules) {
      const notMeet = conditional(mod);
      if (notMeet) {
        return notMeet;
      }
      if (mod.modules) {
        const nestedError = FormValidator.conditionalVisitor(
          mod.modules,
          conditional
        );

        if (nestedError) {
          return nestedError;
        }
      }
    }
    return false;
  };

  checkDeprecatedModules(modules: Array<Module>): ?FormValidationResult {
    const notSuportedType = FormValidator.conditionalVisitor(
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
    if (!modules.some(module => inputModules.includes(module.type))) {
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
