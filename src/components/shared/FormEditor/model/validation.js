// @flow
import { rules, validateForm } from '@expandorg/validation';
import { getFormModulesNames } from '@expandorg/modules/model';
import type {
  Module,
  ModuleControlMeta,
  ModuleControlsMap,
} from '@expandorg/modules/src/form/model/types.flow';

const nameIsUniq = (modules: Array<Module>, originalName: string) => name => {
  if (name === originalName) {
    return true;
  }
  const names = new Set(getFormModulesNames({ modules }));
  return !names.has(name);
};

const isRequired = prop => !!prop;

const getModulePropsRules = (
  meta: ModuleControlMeta,
  originalName: string,
  modules: Array<Module>
) => {
  const nameRules = [[isRequired, 'Name is required']];
  if (originalName && modules) {
    nameRules.push([
      nameIsUniq(modules, originalName),
      'Name should be uniq in form',
    ]);
  }
  const props = (meta.editor && meta.editor.properties) || {};
  return Reflect.ownKeys(props).reduce(
    (r, propertyName) => {
      const property = props[propertyName];
      if (property.required) {
        return {
          ...r,
          [propertyName]: [[rules.isRequired, `${propertyName} is required`]],
        };
      }
      return r;
    },
    {
      name: nameRules,
    }
  );
};

export const validateModuleProps = (
  module: Module,
  originalName: string,
  meta: ModuleControlMeta,
  modules: Array<Module>
) => {
  const propRules = getModulePropsRules(meta, originalName, modules);
  return validateForm(module, propRules);
};

const formConditionalVisitor = (
  modules: Array<Module>,
  validator: Function
) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const mod of modules) {
    const error = validator(mod);
    if (error) {
      return error;
    }
    if (mod.modules) {
      const nestedError = formConditionalVisitor(mod.modules, validator);
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
