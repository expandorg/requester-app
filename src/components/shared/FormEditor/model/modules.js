// @flow
import generate from 'nanoid/generate';
import type {
  ModuleControlMeta,
  Module,
} from '@expandorg/modules/src/form/model/types.flow';

import { moduleControls } from '@expandorg/modules/app';

export const supportNesting = ({ editor }: ModuleControlMeta): boolean =>
  !!(editor && editor.properties && editor.properties.modules);

export const getUniqId = ({ type }: ModuleControlMeta) =>
  `${type}-${generate('1234567890abcdef', 4)}`;

export const scaffold = (
  meta: ModuleControlMeta,
  isDragging: boolean = false
): Module => ({
  ...(meta.editor && meta.editor.defaults),
  type: meta.type,
  name: getUniqId(meta),
  isDragging,
  modules: supportNesting(meta) ? [] : undefined,
});

export const availableModules = moduleControls;
