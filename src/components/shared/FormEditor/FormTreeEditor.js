import { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@expandorg/modules';
import { deepCopyModule } from '@expandorg/modules/model';

import Selection from './model/Selection';

import { scaffold, getUniqId } from './model/modules';
import { treeEditor } from './model/dnd';

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
    onChange(treeEditor.push(modules, scaffold(meta)), selection);

    if (scroll) {
      this.formRef.current.decoratedRef.current.scrollBottom();
    }
  };

  handleEndDrag = path => {
    const { modules, onChange, selection } = this.props;
    const modifiled = treeEditor.modifyAt(modules, path, item => {
      if (item !== undefined) {
        item.isDragging = undefined;
      }
    });
    onChange(modifiled, selection);
  };

  handleRemove = path => {
    const { modules, onChange } = this.props;
    onChange(treeEditor.removeAt(modules, path), Selection.empty);
  };

  handleCopy = (path, module) => {
    const { modules, onChange } = this.props;

    const editied = treeEditor.insertAt(
      modules,
      path,
      deepCopyModule(module, getUniqId)
    );
    onChange(editied, Selection.empty);
  };

  handleEdit = mod => {
    const { modules, onChange, selection } = this.props;
    onChange(
      treeEditor.replaceAt(modules, selection.path, mod),
      Selection.empty
    );
  };

  handleMove = (dragPath, hoverPath, meta) => {
    const { modules, onChange } = this.props;

    const edited =
      dragPath.length === 0
        ? treeEditor.insertAt(modules, hoverPath, scaffold(meta, true))
        : treeEditor.moveAt(modules, dragPath, hoverPath);

    onChange(edited, Selection.empty);
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
