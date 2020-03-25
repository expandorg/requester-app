// @flow
import type {
  Module,
  ModuleControlsMap,
} from '@expandorg/modules/src/form/model/types.flow';

import { moduleControls } from '@expandorg/modules/app';
import {
  getModuleControlsMap,
  findModuleVisitor,
} from '@expandorg/modules/model';

export type FormValidationResult = {
  commonMessage: string,
  meta?: {
    id?: string,
    name?: string,
  },
  [key: string]: any,
};

export const submitModules: Array<string> = ['submit', 'wizard'];

export default class FormValidator {
  static controls: ModuleControlsMap = getModuleControlsMap(moduleControls);

  errorMsg(commonMessage: string) {
    return {
      commonMessage,
    };
  }

  checkDeprecatedModules(modules: Array<Module>): ?FormValidationResult {
    const notSuported = findModuleVisitor(
      modules,
      (m) => !FormValidator.controls[m.type] && !!m.type
    );

    if (notSuported) {
      return this.errorMsg(
        `Form includes deprecated module: ${notSuported.type}`
      );
    }
    return null;
  }

  checkSubmit(modules: Array<Module>): ?FormValidationResult {
    if (!modules.some((module) => submitModules.includes(module.type))) {
      return this.errorMsg('Form should have submit button');
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
