import React, { Component } from 'react';
import PropTypes from 'prop-types';

import immer from 'immer';

import { moduleControls, formProps } from '@gemsorg/modules';

import { insertAtIndex } from '../../../common/immutable';

import Editor from './Editor/Editor';
import AvailableModules from './Available/AvailableModules';

import styles from './FormEditor.module.styl';

const scaffold = (meta, name, isDragging) => ({
  ...meta.editor.defaults,
  type: meta.type,
  name,
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

  handleAdd = (dragId, meta) => {
    const { modules } = this.state;
    this.setState({
      modules: [...modules, scaffold(meta, dragId)],
    });
  };

  handleRemove = id => {
    this.setState(({ modules }) => ({
      modules: modules.filter(m => m.name !== id),
    }));
  };

  handleMove = (dragId, hoverId, meta) => {
    const { modules } = this.state;

    const dragIndex = modules.findIndex(m => m.name === dragId);
    const hoverIndex = modules.findIndex(m => m.name === hoverId);

    if (dragIndex === -1) {
      this.setState({
        modules: insertAtIndex(
          modules,
          hoverIndex,
          scaffold(meta, dragId, true)
        ),
      });
    } else {
      const dragged = modules[dragIndex];
      const hovered = modules[hoverIndex];

      this.setState({
        modules: immer(modules, draft => {
          draft[dragIndex] = hovered;
          draft[hoverIndex] = dragged;
        }),
      });
    }
  };

  handleEndDrag = dragId => {
    const { modules } = this.state;
    this.setState({
      modules: immer(modules, draft => {
        const module = draft.find(m => m.name === dragId);
        if (module) {
          module.isDragging = undefined;
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
            totalModules={modules.length}
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
