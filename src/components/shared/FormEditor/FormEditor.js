import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleControls as defaultControls, formProps } from '@gemsorg/modules';

import { WalkthroughProvider, WalkthroughPin } from '../Walkthrough';

import Editor from './Editor/Editor';
import AvailableModules from './Available/AvailableModules';

import RichText from './RichText';

import { treeEditor } from './dnd';
import { scaffold } from './model/modules';

import help from './help';

import styles from './FormEditor.module.styl';

const moduleControls = [...defaultControls, RichText];

export default class FormEditor extends Component {
  static propTypes = {
    form: formProps,
    variables: PropTypes.arrayOf(PropTypes.string),
    validateForm: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: [],
    form: null,
  };

  constructor(props) {
    super(props);

    this.previewTab = null;

    this.state = {
      selected: null,
      prev: props.form, // eslint-disable-line react/no-unused-state
      modules: props.form ? props.form.modules : [],
    };
  }

  static getDerviedStateFromProps({ form }, state) {
    if (state.prev !== form) {
      return {
        selected: null,
        prev: form,
        modules: form ? form.modules : [],
      };
    }
    return null;
  }

  handleSave = modules => {
    const { onSave, form } = this.props;
    onSave({ ...form, modules });
  };

  handleAdd = meta => {
    const { modules } = this.state;
    this.setState({
      modules: treeEditor.push(modules, scaffold(meta)),
    });
  };

  handleRemove = path => {
    if (path.length) {
      this.setState(({ modules }) => ({
        selected: null,
        modules: treeEditor.removeAt(modules, path),
      }));
    }
  };

  handleMoveAt = (dragPath, hoverPath, meta) => {
    const { modules } = this.state;
    if (dragPath.length === 0) {
      this.setState({
        selected: null,
        modules: treeEditor.insertAt(modules, hoverPath, scaffold(meta, true)),
      });
    } else {
      this.setState({
        selected: null,
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

  handleSelectModule = path => {
    const { selected } = this.state;
    this.setState({ selected: treeEditor.eq(selected, path) ? null : path });
  };

  handleEditModule = (path, module) => {
    const { modules } = this.state;
    this.setState({
      selected: null,
      modules: treeEditor.replaceAt(modules, path, module),
    });
  };

  render() {
    const { onHide, validateForm, variables } = this.props;
    const { modules, selected } = this.state;

    return (
      <WalkthroughProvider settings={help}>
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
              selected={selected}
              moduleControls={moduleControls}
              validateForm={validateForm}
              variables={variables}
              onAddModule={this.handleAdd}
              onEditModule={this.handleEditModule}
              onMoveModule={this.handleMoveAt}
              onRemoveModule={this.handleRemove}
              onSelectModule={this.handleSelectModule}
              onSave={this.handleSave}
              onCancel={onHide}
            />
          </div>
        </div>
        <WalkthroughPin id="search" className={styles.serachPin} />
        <WalkthroughPin id="components" className={styles.componentsPin} />
      </WalkthroughProvider>
    );
  }
}
