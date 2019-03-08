// @flow

import { ModuleCategories } from '@expandorg/modules';
import { groupModulesByCategory } from '@expandorg/modules/model';

import type {
  ModuleControl,
  ModuleControlMeta,
} from '@expandorg/modules/src/form/model/types.flow';

declare type ModuleCategoryItem = {
  category: string,
  modules: Array<ModuleControlMeta>,
};

export const displayCategories = [
  ModuleCategories.Text,
  ModuleCategories.Input,
  ModuleCategories.Display,
  ModuleCategories.Image,
  ModuleCategories.Media,
  ModuleCategories.Onboarding,
];

export const getAvailableModulesTree = (
  controls: Array<ModuleControl>
): Array<ModuleCategoryItem> => {
  const grouped = groupModulesByCategory(controls);
  return displayCategories.map(category => ({
    category,
    // $FlowFixMe
    modules: grouped[category]
      ? grouped[category].map(({ module }) => module)
      : [],
  }));
};

export const searchModulesTree = (
  tree: Array<ModuleCategoryItem>,
  term?: string
) => {
  if (!term) {
    return tree;
  }
  const lcTerm = term.toLowerCase();
  // $FlowFixMe
  const result = tree.map(({ category, modules }) => {
    const filtered = modules.filter(
      m => m.name.toLowerCase().indexOf(lcTerm) !== -1
    );
    return { category, modules: filtered };
  });
  return result;
};
