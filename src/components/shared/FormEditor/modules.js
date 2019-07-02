// @flow
import generate from 'nanoid/generate';
import type {
  ModuleControlMeta,
  Module,
} from '@expandorg/modules/src/form/model/types.flow';

export const supportNesting = ({ editor }: ModuleControlMeta): boolean =>
  !!(editor && editor.properties && editor.properties.modules);

export const newModuleId = ({ type }: ModuleControlMeta) =>
  `${type}-${generate('1234567890abcdef', 4)}`;

export const createModule = (
  meta: ModuleControlMeta,
  isDragging: boolean = false
): Module => ({
  ...(meta.editor && meta.editor.defaults),
  type: meta.type,
  name: newModuleId(meta),
  isDragging,
  modules: supportNesting(meta) ? [] : undefined,
});
