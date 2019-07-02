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

export const getCategories = (
  controls: Array<ModuleControl>,
  exclude?: Array<string> = []
): Array<ModuleCategoryItem> => {
  const available =
    exclude && exclude.length
      ? controls.filter(c => !exclude.includes(c.module.type))
      : controls;

  const grouped = groupModulesByCategory(available);
  return displayCategories.map(category => ({
    category,
    // $FlowFixMe
    modules: grouped[category]
      ? grouped[category].map(({ module }) => module)
      : [],
  }));
};

export const searchModules = (
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
