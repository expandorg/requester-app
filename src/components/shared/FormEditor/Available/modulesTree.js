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
  ModuleCategories.Onboarding,
];

export const getAvailableModulesTree = (
  controls: Array<Object>
): Array<ModuleCategoryItem> => {
  const grouped = groupModulesByCategory(controls);

  return displayCategories.map(category => ({
    category,
    // $FlowFixMe
    modules: grouped[category],
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
  const result = tree.map(({ category, modules }) => {
    const filtered = modules.filter(
      ({ module }) => module.title.toLowerCase().indexOf(lcTerm) !== -1
    );
    if (!filtered.length) {
      return null;
    }
    return { category, modules: filtered };
  });
  // $FlowFixMe
  return result.filter(c => c !== null);
};
