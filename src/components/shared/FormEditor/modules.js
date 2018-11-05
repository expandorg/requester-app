// @flow
import nanoid from 'nanoid';

export const supportNesting = (module: Object): boolean =>
  !!(module.editor.properties && module.editor.properties.modules);

export const scaffold = (module: Object, isDragging: boolean) => ({
  ...module.editor.defaults,
  type: module.type,
  name: `${module.type}-${nanoid()}`,
  modules: supportNesting(module) ? [] : undefined,
  isDragging,
});
