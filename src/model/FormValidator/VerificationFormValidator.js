// @flow
import type { Module } from '@expandorg/modules/src/form/model/types.flow';
import { findModuleVisitor } from '@expandorg/modules/model';
import { type FormValidationResult } from './FormValidator';

import TaskFormValidator from './TaskFormValidator';

export default class VerificationFormValidator extends TaskFormValidator {
  checkVerifyModule(modules: Array<Module>) {
    const found = findModuleVisitor(modules, m => m.type === 'verify');
    if (!found) {
      return this.errorMsg('Verification form should have verify module');
    }
    return null;
  }

  validate(modules: Array<Module>): ?FormValidationResult {
    let error = super.validate(modules);
    if (error) {
      return error;
    }
    error = this.checkVerifyModule(modules);
    if (error) {
      return error;
    }
    return null;
  }
}
