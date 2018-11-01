import React, { Component } from 'react';
import PropTypes from 'prop-types';

import immer from 'immer';

import { moduleControls, formProps } from '@gemsorg/modules';

import { removeAtIndex } from '@gemsorg/utils/src/immutable';
import { insertAtIndex } from '../../../common/immutable';

import Editor from './Editor/Editor';
import AvailableModules from './Available/AvailableModules';

import styles from './FormEditor.module.styl';

const scaffold = (meta, last, isDragging) => ({
  ...meta.editor.defaults,
  type: meta.type,
  name: `${meta.type}-${last}`,
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
      modules: [...modules, scaffold(meta, modules.length)],
    });
  };

  handleRemove = order => {
    this.setState(({ modules }) => ({
      modules: removeAtIndex(modules, order),
    }));
  };

  handleMove = (dragIndex, hoverIndex, meta) => {
    const { modules } = this.state;

    if (dragIndex === -1) {
      this.setState({
        modules: insertAtIndex(
          modules,
          hoverIndex,
          scaffold(meta, modules.length, true)
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

  handleEndDrag = order => {
    const { modules } = this.state;
    this.setState({
      modules: immer(modules, draft => {
        const item = draft[order];
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
