import { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@expandorg/modules';
import { deepCopyModule } from '@expandorg/modules/model';

import Selection from './Selection';
import { treeEditor, Ops } from './editor';

import { createModule, newModuleId } from '../modules';

export default class FormTreeEditor extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps),
    selection: PropTypes.instanceOf(Selection).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  formRef = createRef();

  static defaultProps = {
    modules: [],
  };

  handleAdd = (meta, scroll) => {
    const { modules, onChange, selection } = this.props;
    onChange(treeEditor.push(modules, createModule(meta)), selection);

    if (scroll) {
      this.formRef.current.decoratedRef.current.scrollBottom();
    }
  };

  handleEndDrag = path => {
    const { modules, onChange, selection } = this.props;
    const modifiled = treeEditor.modifyAt(modules, path, item => {
      if (item !== undefined && item.isDragging) {
        item.isDragging = undefined;
      }
    });
    onChange(modifiled, selection);
  };

  handleRemove = path => {
    const { modules, onChange } = this.props;
    onChange(treeEditor.removeAt(modules, path), Ops.Remove);
  };

  handleCopy = (path, module) => {
    const { modules, onChange } = this.props;

    const editied = treeEditor.insertAt(
      modules,
      path,
      deepCopyModule(module, newModuleId)
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
        ? treeEditor.insertAt(modules, hoverPath, createModule(meta, true))
        : treeEditor.moveAt(modules, dragPath, hoverPath);

    onChange(edited, Ops.Move);
  };

  render() {
    const { children } = this.props;

    return children({
      onAdd: this.handleAdd,
      onEndDrag: this.handleEndDrag,
      onRemove: this.handleRemove,
      onEdit: this.handleEdit,
      onCopy: this.handleCopy,
      onMove: this.handleMove,
      formRef: this.formRef,
    });
  }
}
