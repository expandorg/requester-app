import React, { Component } from 'react';
import PropTypes from 'prop-types';

import immer from 'immer';
import nanoid from 'nanoid';

import { moduleControls, formProps } from '@gemsorg/modules';

import Editor from './Editor/Editor';
import AvailableModules from './Available/AvailableModules';

import { treeEditor } from './tree';

import styles from './FormEditor.module.styl';

const scaffold = ({ editor: { defaults, properties }, type }, isDragging) => ({
  ...defaults,
  type,
  name: `${type}-${nanoid()}`,
  modules: properties && properties.modules ? [] : undefined,
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
      modules: treeEditor.push(modules, scaffold(meta)),
    });
  };

  handleRemove = path => {
    this.setState(({ modules }) => ({
      modules: treeEditor.removeAt(modules, path),
    }));
  };

  handleMove = (dragPath, hoverPath, meta) => {
    const { modules } = this.state;
    if (dragPath.length === 0) {
      this.setState({
        modules: treeEditor.insertAt(modules, hoverPath, scaffold(meta, true)),
      });
    } else {
      this.setState({
        modules: treeEditor.moveAt(modules, dragPath, hoverPath),
      });
    }
  };

  handleEndDrag = path => {
    const { modules } = this.state;
    this.setState({
      modules: treeEditor.modifyAt(modules, path, item => {
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
