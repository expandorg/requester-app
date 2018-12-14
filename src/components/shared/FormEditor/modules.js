// @flow
import generate from 'nanoid/generate';
import { rules, validateForm } from '@gemsorg/validation';

export const supportNesting = (module: Object): boolean =>
  !!(module.editor.properties && module.editor.properties.modules);

export const scaffold = (module: Object, isDragging: boolean) => ({
  ...module.editor.defaults,
  type: module.type,
  name: `${module.type}-${generate('1234567890abcdef', 4)}`,
  modules: supportNesting(module) ? [] : undefined,
  isDragging,
});

const getModuleNames = (root: Object) => {
  let names = root.name ? [root.name] : [];
  if (root.modules) {
    names = root.modules.reduce(
      (all, m) => all.concat(getModuleNames(m)),
      names
    );
  }
  return names;
};

const nameIsUniq = (modules: Array<Object>, originalName: string) => name => {
  if (name === originalName) {
    return true;
  }
  const names = new Set(getModuleNames({ modules }));
  return !names.has(name);
};

const isRequired = prop => !!prop;

const getModulePropsRules = (
  editor: Object,
  originalName: string,
  modules: Array<Object>
) => {
  const nameRules = [[isRequired, 'Name is required']];
  if (originalName && modules) {
    nameRules.push([
      nameIsUniq(modules, originalName),
      'Name should be uniq in form',
    ]);
  }

  return Reflect.ownKeys(editor.properties).reduce(
    (r, propertyName) => {
      const property = editor.properties[propertyName];
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
  module: Object,
  originalName: string,
  editor: Object,
  modules: Array<Object>
) => {
  const propRules = getModulePropsRules(editor, originalName, modules);
  return validateForm(module, propRules);
};

export const validationFormProps = (modules: Array<Object>) => {
  if (!modules.some(module => module.type === 'submit')) {
    return { commonMessage: 'Module should have submit button' };
  }
  return null;
};
