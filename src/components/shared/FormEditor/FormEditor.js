import React, { Component } from 'react';
import PropTypes from 'prop-types';

import immer from 'immer';
import nanoid from 'nanoid';

import { moduleControls, formProps } from '@gemsorg/modules';

import Editor from './Editor/Editor';
import AvailableModules from './Available/AvailableModules';

import styles from './FormEditor.module.styl';

import { findParent } from './dnd';

const scaffold = (meta, isDragging) => ({
  ...meta.editor.defaults,
  type: meta.type,
  name: `${meta.type}-${nanoid()}`,
  isDragging,
});

export default class FormEditor extends Component {
  static propTypes = {
    form: formProps,
    onSave: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  static defaultProps = {
    form: null,
  };

  constructor(props) {
    super(props);

    this.previewTab = null;

    this.state = {
      prev: props.form, // eslint-disable-line react/no-unused-state
      modules: props.form ? props.form.modules : [],
    };
  }

  static getDerviedStateFromProps({ form }, state) {
    if (state.prev !== form) {
      return {
        prev: form,
        modules: form ? form.modules : [],
      };
    }
    return null;
  }

  handleSave = () => {
    const { onSave, form } = this.props;
    const { modules } = this.state;

    onSave({ ...form, modules });
  };

  handleAdd = meta => {
    const { modules } = this.state;
    this.setState({
      modules: immer(modules, draft => {
        draft.push(scaffold(meta));
      }),
    });
  };

  handleRemove = path => {
    this.setState(({ modules }) => ({
      modules: immer(modules, draft => {
        findParent(draft, path).splice(path[path.length - 1], 1);
      }),
    }));
  };

  handleMove = (dragPath, hoverPath, meta) => {
    const { modules } = this.state;

    if (dragPath.length === 0) {
      this.setState({
        modules: immer(modules, draft => {
          const newItem = scaffold(meta, true);
          const parent = findParent(draft, hoverPath, true);
          parent.splice(hoverPath[hoverPath.length - 1], 0, newItem);
        }),
      });
    } else {
      this.setState({
        modules: immer(modules, draft => {
          const hoverParent = findParent(draft, hoverPath, true);
          const dragParent = findParent(draft, dragPath, true);

          const dragIndex = dragPath[dragPath.length - 1];
          const hoverIndex = hoverPath[hoverPath.length - 1];

          const dragged = dragParent[dragIndex];

          dragParent.splice(dragIndex, 1);
          hoverParent.splice(hoverIndex, 0, dragged);
        }),
      });
    }
  };

  handleEndDrag = path => {
    const { modules } = this.state;
    this.setState({
      modules: immer(modules, draft => {
        const parent = findParent(draft, path);
        const item = parent[path[path.length - 1]];
        if (item !== undefined) {
          item.isDragging = undefined;
        }
      }),
    });
  };

  handleEditModule = (moduleId, module) => {
    const { modules } = this.state;
    const index = modules.findIndex(m => m.name === moduleId);

    this.setState({
      modules: immer(modules, draft => {
        draft[index] = module;
      }),
    });
  };

  render() {
    const { onHide } = this.props;

    const { modules } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <AvailableModules
            moduleControls={moduleControls}
            onEndDrag={this.handleEndDrag}
            onAddModule={this.handleAdd}
            onRemoveModule={this.handleRemove}
          />
        </div>
        <div className={styles.editor}>
          <Editor
            modules={modules}
            moduleControls={moduleControls}
            onAddModule={this.handleAdd}
            onEditModule={this.handleEditModule}
            onMoveModule={this.handleMove}
            onRemoveModule={this.handleRemove}
            onSave={this.handleSave}
            onCancel={onHide}
          />
        </div>
      </div>
    );
  }
}
