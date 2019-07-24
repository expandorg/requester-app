// @flow
import generate from 'nanoid/generate';
import { getFormModulesNames } from '@expandorg/modules/model';
import type {
  ModuleControlMeta,
  Module,
} from '@expandorg/modules/src/form/model/types.flow';

export const supportNesting = ({ editor }: ModuleControlMeta): boolean =>
  !!(editor && editor.properties && editor.properties.modules);

export const newModuleId = (modules: Array<Module>) => {
  const names = new Set(getFormModulesNames({ modules }));
  return ({ type }: ModuleControlMeta) => {
    let i = 0;
    while (i < 1000) {
      const name = `${type}${i}`;
      if (!names.has(name)) {
        return name;
      }
      i += 1;
    }
    return `${type}-${generate('1234567890abcdef', 3)}`;
  };
};

export const createModule = (
  meta: ModuleControlMeta,
  modules: Array<Module>,
  isDragging: boolean = false
): Module => ({
  ...(meta.editor && meta.editor.defaults),
  type: meta.type,
  name: newModuleId(modules)(meta),
  isDragging,
  modules: supportNesting(meta) ? [] : undefined,
});
