// @flow
import type { Module } from '@expandorg/modules/src/form/model/types.flow';
import { findModuleVisitor } from '@expandorg/modules/model';
import FormValidator, { type FormValidationResult } from './FormValidator';

export default class TaskFormValidator extends FormValidator {
  checkInputs(modules: Array<Module>): ?FormValidationResult {
    const found = findModuleVisitor(
      modules,
      (m) => !!FormValidator.controls[m.type].module.isInput
    );
    if (!found) {
      return this.errorMsg('Form should have at least one input module');
    }
    return null;
  }

  validate(modules: Array<Module>): ?FormValidationResult {
    let error = super.validate(modules);
    if (error) {
      return error;
    }
    error = this.checkInputs(modules);
    if (error) {
      return error;
    }
    return null;
  }
}
