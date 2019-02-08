// @flow
import generate from 'nanoid/generate';

// import {
// Input,
// Title,
// Text,
// RichText,
// Article,
// Paragraph,
// SelectModule,
// MultiSelectModule,
// Checkbox,
// ClipboardText,
// Submit,
// Video,
// Image,
// Description,
// Question,
// Instructions,
// InstructionsItem,
// Agreement,
// Collapsable,
// Progress,
// Dropdown,
// RegionSelect,
// RegionMultiselect,
// ImageTiles,
// TagVideo,
// MultipleTagVideo,
// } from '@expandorg/modules';

import { moduleControls } from '@expandorg/modules';

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
