// @flow
import generate from 'nanoid/generate';

import { moduleControls } from '@expandorg/modules/app';

export const supportNesting = (meta: Object): boolean =>
  !!(meta.editor.properties && meta.editor.properties.modules);

export const getUniqId = (moduleType: string) =>
  `${moduleType}-${generate('1234567890abcdef', 4)}`;

export const scaffold = (module: Object, isDragging: boolean) => ({
  ...module.editor.defaults,
  type: module.type,
  name: getUniqId(module.type),
  modules: supportNesting(module) ? [] : undefined,
  isDragging,
});

export const deepCopy = (module: Object) => {
  const { modules: children, type, ...rest } = module;
  let modules;

  if (children) {
    modules = children.map(child => deepCopy(child));
  }

  return {
    ...rest,
    type,
    name: getUniqId(type),
    modules,
  };
};

export const availableModules = moduleControls;
