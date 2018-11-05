// @flow
import immer from 'immer';

declare type TreeModule = {
  modules?: Array<TreeModule>,
};

export class ModulesTreeEditor {
  findByPath = (
    modules: Array<TreeModule>,
    path: Array<number>
  ): TreeModule => {
    let [index, ...p] = path; // eslint-disable-line prefer-const
    let result = modules[index];
    while (p && p.length !== 0) {
      index = p.shift();
      if (result.modules === undefined) {
        throw new Error('wrong path');
      }
      result = result.modules[index];
    }
    return result;
  };

  findParent = (modules: Array<TreeModule>, path: Array<number>): TreeModule =>
    this.findByPath(modules, path.slice(0, -1));

  findParentModules = (
    modules: Array<TreeModule>,
    path: Array<number>
  ): Array<TreeModule> => {
    let parent;
    if (path.length === 1) {
      parent = { modules };
    } else {
      parent = this.findByPath(modules, path.slice(0, -1));
    }
    if (parent.modules === undefined) {
      throw new Error('Invalid parent');
    }
    return parent.modules;
  };

  modifyAt = (
    modules: Array<TreeModule>,
    path: Array<number>,
    cb: TreeModule => void
  ) => {
    const entity = this.findByPath(modules, path);
    cb(entity);
  };

  push = (modules: Array<TreeModule>, module: TreeModule): void => {
    modules.push(module);
  };

  pathOnRemoved = (removePath: Array<number>, insertPath: Array<number>) => {
    const removeLen = removePath.length;
    const insertLen = insertPath.length;
    if (removeLen === 0 || removeLen >= insertLen) {
      return insertPath;
    }
    let i = 0;
    for (i = 0; i < removeLen - 1; i += 1) {
      if (removePath[i] !== insertPath[i]) {
        return insertPath;
      }
    }
    if (removePath[i] >= insertPath[i]) {
      return insertPath;
    }
    const result = [...insertPath];
    result[i] -= 1;
    return result;
  };

  insertAt = (
    modules: Array<TreeModule>,
    path: Array<number>,
    module: TreeModule
  ): void => {
    const parent = this.findParentModules(modules, path);
    if (parent.length === 0) {
      parent.unshift(module);
    } else {
      const index = path[path.length - 1];
      parent.splice(index, 0, module);
    }
  };

  insertAfter = (
    modules: Array<TreeModule>,
    path: Array<number>,
    module: TreeModule
  ): void => {
    const parent = this.findParentModules(modules, path);
    if (parent.length === 0) {
      parent.unshift(module);
    } else {
      const index = path[path.length - 1];
      parent.splice(index + 1, 0, module);
    }
  };

  removeAt = (modules: Array<TreeModule>, path: Array<number>): void => {
    const parent = this.findParentModules(modules, path);
    const index = path[path.length - 1];
    parent.splice(index, 1);
  };

  moveAt = (
    modules: Array<TreeModule>,
    from: Array<number>,
    to: Array<number>
  ): void => {
    const module = this.findByPath(modules, from);
    const path = this.pathOnRemoved(from, to);
    this.removeAt(modules, from);
    this.insertAt(modules, path, module);
  };

  // moveAfter = (
  //   modules: Array<TreeModule>,
  //   from: Array<number>,
  //   to: Array<number>
  // ): void => {
  //   const module = this.findByPath(modules, from);
  //   const path = this.pathOnRemoved(from, to);
  //   this.removeAt(modules, from);
  //   this.insertAfter(modules, path, module);
  // };
}

export class ImmutableTreeBuilder {
  builder = new ModulesTreeEditor();

  push = (modules: Array<TreeModule>, module: TreeModule): Array<TreeModule> =>
    immer(modules, draft => this.builder.push(draft, module));

  pathOnRemoved = (removePath: Array<number>, insertPath: Array<number>) =>
    this.builder.pathOnRemoved(removePath, insertPath);

  modifyAt = (
    modules: Array<TreeModule>,
    path: Array<number>,
    cb: TreeModule => void
  ) => immer(modules, draft => this.builder.modifyAt(draft, path, cb));

  removeAt = (
    modules: Array<TreeModule>,
    path: Array<number>
  ): Array<TreeModule> =>
    immer(modules, draft => this.builder.removeAt(draft, path));

  insertAt = (
    modules: Array<TreeModule>,
    path: Array<number>,
    module: TreeModule
  ): Array<TreeModule> =>
    immer(modules, draft => this.builder.insertAt(draft, path, module));

  insertAfter = (
    modules: Array<TreeModule>,
    path: Array<number>,
    module: TreeModule
  ): Array<TreeModule> =>
    immer(modules, draft => this.builder.insertAfter(draft, path, module));

  moveAt = (
    modules: Array<TreeModule>,
    from: Array<number>,
    to: Array<number>
  ): Array<TreeModule> =>
    immer(modules, draft => this.builder.moveAt(draft, from, to));

  // moveAfter = (
  //   modules: Array<TreeModule>,
  //   from: Array<number>,
  //   to: Array<number>
  // ): Array<TreeModule> =>
  //   immer(modules, draft => this.builder.moveAfter(draft, from, to));
}

export const treeEditor = new ImmutableTreeBuilder();
