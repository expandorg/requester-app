// @flow
import type {
  Form,
  Module,
} from '@expandorg/modules/src/form/model/types.flow';

import { transformMap, identityTransform } from './transformModule';

export function transformModule(
  module: Module,
  prev: Map<string, Module>
): ?Module {
  const { modules: nested, ...rest } = module;
  let result = prev.get(rest.name);
  if (!result) {
    const transformFn = transformMap[module.type] || identityTransform;
    result = transformFn(rest);
  }
  if (!result) {
    return result;
  }
  if (!nested) {
    return result;
  }
  return {
    ...result,
    modules: nested.map(child => transformModule(child, prev)).filter(Boolean),
  };
}

export function bfsVisitor(modules: Array<Module>, fn: (mod: Module) => any) {
  const queue = [...modules];
  while (queue.length) {
    const m = queue.shift();
    fn(m);
    if (m.modules && m.modules.length) {
      queue.push(...m.modules);
    }
  }
}

export function getModulesMap(modules: Array<Module>): Map<string, Module> {
  const result: Map<string, Module> = new Map();
  bfsVisitor(modules, m => {
    if (typeof m.__tfId === 'string') {
      result.set(m.__tfId, m);
    }
  });
  return result;
}

export default function generate(
  taskForm: Form,
  prev: Form = { modules: [] }
): Form {
  const existing = getModulesMap(prev.modules);

  const modules = taskForm.modules
    .map(module => transformModule(module, existing))
    .filter(Boolean);

  return {
    modules,
    autogenenrated: true,
  };
}
