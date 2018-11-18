// @flow

import { groupModulesByCategory, ModuleCategories } from '@gemsorg/modules';

declare type ModuleCategoryItem = {
  category: string,
  modules: Array<Object>,
};

export const displayCategories = [
  ModuleCategories.Text,
  ModuleCategories.Input,
  ModuleCategories.Display,
  ModuleCategories.Image,
  ModuleCategories.Video,
];

export const getAvailableModulesTree = (
  controls: Array<Object>
): Array<ModuleCategoryItem> => {
  const grouped = groupModulesByCategory(controls);
  return displayCategories.map(category => ({
    category,
    // $FlowFixMe
    modules: grouped[category].map(({ module }) => module),
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
  console.log(term, result);
  return result;
};
