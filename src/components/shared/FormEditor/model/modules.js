// @flow
import generate from 'nanoid/generate';

import {
  Input,
  // Title,
  Text,
  RichText,
  // Article,
  // Paragraph,
  SelectModule,
  MultiSelectModule,
  Checkbox,
  ClipboardText,
  Submit,
  Video,
  Image,
  // Description,
  // Question,
  Instructions,
  InstructionsItem,
  Agreement,
  Collapsable,
  Progress,
  Dropdown,
  RegionSelect,
  RegionMultiselect,
  ImageTiles,
  TagVideo,
  MultipleTagVideo,
  // ModuleCategories,
} from '@expandorg/modules';

// class Dropdown2 extends Dropdown {
//   static module = {
//     type: 'dropdown',
//     name: 'Dropdown  - 2',
//     isInput: true,
//     validation: {},
//     editor: {
//       category: ModuleCategories.Input,
//       properties: {
//         content: {
//           type: 'options',
//         },
//       },
//       defaults: {
//         placeholder: 'Select one',
//         options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
//       },
//     },
//   };
// }

export const supportNesting = (meta: Object): boolean =>
  !!(meta.editor.properties && meta.editor.properties.modules);

export const scaffold = (module: Object, isDragging: boolean) => ({
  ...module.editor.defaults,
  type: module.type,
  name: `${module.type}-${generate('1234567890abcdef', 4)}`,
  modules: supportNesting(module) ? [] : undefined,
  isDragging,
});

export const availableModules = [
  Input,
  // Title,
  Text,
  RichText,
  // Article,
  // Paragraph,
  SelectModule,
  MultiSelectModule,
  Checkbox,
  ClipboardText,
  Submit,
  Video,
  Image,
  // Description,
  // Question,
  Instructions,
  InstructionsItem,
  Agreement,
  Collapsable,
  Progress,
  Dropdown,
  RegionSelect,
  RegionMultiselect,
  ImageTiles,
  TagVideo,
  MultipleTagVideo,
];
