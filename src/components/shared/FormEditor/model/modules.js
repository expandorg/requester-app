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

export const scaffold = (module: Object, isDragging: boolean) => ({
  ...module.editor.defaults,
  type: module.type,
  name: `${module.type}-${generate('1234567890abcdef', 4)}`,
  modules: supportNesting(module) ? [] : undefined,
  isDragging,
});

export const availableModules = moduleControls;
// [
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
// ];
