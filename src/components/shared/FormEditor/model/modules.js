// @flow
import generate from 'nanoid/generate';

import { moduleControls } from '@expandorg/modules/app';

export const supportNesting = (meta: Object): boolean =>
  !!(meta.editor.properties && meta.editor.properties.modules);

export const getUniqId = (module: Object) =>
  `${module.type}-${generate('1234567890abcdef', 4)}`;

export const scaffold = (module: Object, isDragging: boolean) => ({
  ...module.editor.defaults,
  type: module.type,
  name: getUniqId(module),
  modules: supportNesting(module) ? [] : undefined,
  isDragging,
});

export const availableModules = moduleControls;
