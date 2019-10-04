// @flow
import type {
  Form,
  Module,
} from '@expandorg/modules/src/form/model/types.flow';

import { transformMap, identityTransform } from './transformModule';

export function transformModule(module: Module): ?Module {
  const { modules: nested, ...rest } = module;
  const transformFn = transformMap[module.type] || identityTransform;

  const result = transformFn(rest);
  if (!result) {
    return result;
  }
  if (!nested) {
    return result;
  }
  return {
    ...result,
    modules: nested.map(child => transformModule(child)).filter(Boolean),
  };
}

export default function generate(taskForm: Form): Form {
  const modules = taskForm.modules
    .map(module => transformModule(module))
    .filter(Boolean);

  return {
    modules,
    autogenenrated: true,
  };
}
