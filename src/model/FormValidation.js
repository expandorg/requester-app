// @flow
import type {
  Module,
  ModuleControlsMap,
} from '@expandorg/modules/src/form/model/types.flow';

export const formConditionalVisitor = (
  modules: Array<Module>,
  conditional: Function
) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const mod of modules) {
    const notMeet = conditional(mod);
    if (notMeet) {
      return notMeet;
    }
    if (mod.modules) {
      const nestedError = formConditionalVisitor(mod.modules, conditional);
      if (nestedError) {
        return nestedError;
      }
    }
  }
  return false;
};

export const validationFormProps = (
  modules: Array<Module>,
  controls: ModuleControlsMap
) => {
  const notSuportedType = formConditionalVisitor(
    modules,
    m => !controls[m.type] && m.type
  );

  if (notSuportedType) {
    return {
      commonMessage: `Form includes deprecated module: ${notSuportedType}`,
    };
  }

  // TODO: add nesting
  if (!modules.some(module => module.type === 'submit')) {
    return { commonMessage: 'Form should have submit button' };
  }
  return null;
};

export const validationTaskFormProps = (
  modules: Array<Module>,
  controls: ModuleControlsMap
) => {
  const errors = validationFormProps(modules, controls);
  if (errors) {
    return errors;
  }

  // TODO: add nesting
  if (!modules.some(m => !!controls[m.type].module.isInput)) {
    return { commonMessage: 'Form should have at least one input module' };
  }
  return null;
};
