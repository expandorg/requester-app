import { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@expandorg/modules';
import { getFormModulesNames } from '@expandorg/modules/model';

import Selection from './Selection';
import { treeEditor, Ops } from './editor';
import { createModule, deepCopyModule } from '../modules';

export default class TreeEditor extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps),
    selection: PropTypes.instanceOf(Selection).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    modules: [],
  };

  handleAdd = meta => {
    const { modules, onChange } = this.props;
    onChange(treeEditor.push(modules, createModule(meta, modules)), Ops.Add);
  };

  handleEndDrag = path => {
    const { modules, onChange } = this.props;
    const modifiled = treeEditor.modifyAt(modules, path, item => {
      if (item !== undefined && item.isDragging) {
        item.isDragging = undefined;
      }
    });
    onChange(modifiled, Ops.EndDrag);
  };

  handleRemove = path => {
    const { modules, onChange } = this.props;
    onChange(treeEditor.removeAt(modules, path), Ops.Remove);
  };

  handleCopy = (path, module) => {
    const { modules, onChange } = this.props;
    const names = new Set(getFormModulesNames({ modules }));
    const editied = treeEditor.insertAt(
      modules,
      path,
      deepCopyModule(module, names)
    );
    onChange(editied, Ops.Copy);
  };

  handleEdit = mod => {
    const { modules, onChange, selection } = this.props;
    onChange(treeEditor.replaceAt(modules, selection.path, mod), Ops.Edit);
  };

  handleMove = (dragPath, hoverPath, meta) => {
    const { modules, onChange } = this.props;

    const edited =
      dragPath.length === 0
        ? treeEditor.insertAt(
            modules,
            hoverPath,
            createModule(meta, modules, true)
          )
        : treeEditor.moveAt(modules, dragPath, hoverPath);

    onChange(edited, Ops.Move);
  };

  render() {
    const { children } = this.props;

    return children({
      onAdd: this.handleAdd,
      onRemove: this.handleRemove,
      onEdit: this.handleEdit,
      onMove: this.handleMove,
      onEndDrag: this.handleEndDrag,
      onCopy: this.handleCopy,
    });
  }
}
