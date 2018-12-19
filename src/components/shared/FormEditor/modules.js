// @flow
import generate from 'nanoid/generate';

export const supportNesting = (module: Object): boolean =>
  !!(module.editor.properties && module.editor.properties.modules);

export const scaffold = (module: Object, isDragging: boolean) => ({
  ...module.editor.defaults,
  type: module.type,
  name: `${module.type}-${generate('1234567890abcdef', 4)}`,
  modules: supportNesting(module) ? [] : undefined,
  isDragging,
});
