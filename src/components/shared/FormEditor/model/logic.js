// @flow
import type {
  Module,
  Expression,
  LogicAction,
} from '@expandorg/modules/src/form/model/types.flow';

type ModuleLogicMap = { [key: LogicAction]: ?Expression };

type VisibilityLogic = {
  expression: ?Expression,
  action: LogicAction,
};

export class ModuleLogic {
  static has(module: Module): boolean {
    return !!module.logic;
  }

  static get(module: Module): ModuleLogicMap {
    return module.logic || {};
  }

  static set(
    module: Module,
    action: LogicAction,
    expression: Expression
  ): Module {
    return {
      ...module,
      logic: {
        ...ModuleLogic.get(module),
        [action]: expression,
      },
    };
  }

  static unset(module: Module, action: LogicAction): Module {
    if (!ModuleLogic.has(module)) {
      return module;
    }
    const { [action]: _, ...logic } = ModuleLogic.get(module);

    if (!Reflect.ownKeys(logic).length) {
      const { logic: __, ...modified } = module;
      // $FlowFixMe
      return modified;
    }
    return { ...module, logic };
  }
}

export const getVisibilityLogic = ({ logic }: Module): VisibilityLogic => {
  if (!logic || !(logic.show || logic.hide)) {
    return { expression: [], action: 'show' };
  }
  return {
    expression: logic.show ? logic.show : logic.hide,
    action: logic.show ? 'show' : 'hide',
  };
};
