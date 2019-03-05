import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formProps } from '@expandorg/modules';
import { deepCopyModule, getModuleControlsMap } from '@expandorg/modules/model';
import {
  NotificationAnimated,
  WalkthroughProvider,
  WalkthroughPin,
} from '@expandorg/components/app';

import { Form, FormContainer, Spacer } from './Canvas';
import { PropertiesPanel } from './Properties';
import Sidebar from './Sidebar/Sidebar';

import { treeEditor } from './model/dnd';
import { scaffold, getUniqId, availableModules } from './model/modules';
import { validateModuleProps } from './model/validation';
import help from './model/help';

import styles from './FormEditor.module.styl';

export default class FormEditor extends Component {
  static propTypes = {
    form: formProps,
    title: PropTypes.string,
    variables: PropTypes.arrayOf(PropTypes.string),
    varsSample: PropTypes.object, // eslint-disable-line
    validateForm: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: [],
    title: 'Task',
    varsSample: null,
    form: null,
  };

  constructor(props) {
    super(props);

    this.previewTab = null;

    this.state = {
      selected: null,
      prev: props.form, // eslint-disable-line react/no-unused-state
      modules: props.form ? props.form.modules : [],
      controls: getModuleControlsMap(availableModules),
      error: null,
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

  handleSave = () => {
    const { validateForm, onSave, form } = this.props;
    const { controls, modules } = this.state;

    const errors = validateForm(modules, controls);
    if (errors) {
      this.setState({
        error: {
          type: 'error',
          message: errors.commonMessage,
        },
      });
    } else {
      onSave({ ...form, modules });
    }
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

  handleCopyModule = (path, module) => {
    const { modules } = this.state;
    this.setState({
      selected: null,
      modules: treeEditor.insertAt(
        modules,
        path,
        deepCopyModule(module, getUniqId)
      ),
    });
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

  handleSelect = path => {
    const { selected } = this.state;
    this.setState({ selected: treeEditor.eq(selected, path) ? null : path });
  };

  handleEdit = edited => {
    const { modules, selected } = this.state;
    this.setState({
      selected: null,
      modules: treeEditor.replaceAt(modules, selected, edited),
    });
  };

  handleClearError = () => {
    this.setState({ error: null });
  };

  validateModuleProps = (module, originalName) => {
    const { controls, modules } = this.state;
    const { editor } = controls[module.type].module;
    return validateModuleProps(module, originalName, editor, modules);
  };

  render() {
    const { onHide, variables, varsSample, title } = this.props;
    const { modules, selected, controls, error } = this.state;

    const selectedModule = selected && treeEditor.findByPath(modules, selected);
    return (
      <WalkthroughProvider settings={help}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Sidebar
              moduleControls={availableModules}
              onEndDrag={this.handleEndDrag}
              onAddModule={this.handleAdd}
              onRemoveModule={this.handleRemove}
            />
          </div>
          <div className={styles.editor}>
            <FormContainer
              modules={modules}
              title={title}
              varsSample={varsSample}
              onSave={this.handleSave}
              onCancel={onHide}
            >
              <Form
                modules={modules}
                selected={selected && treeEditor.getIdByPath(selected)}
                controls={controls}
                onAdd={this.handleAdd}
                onMove={this.handleMoveAt}
                onRemove={this.handleRemove}
                onSelect={this.handleSelect}
                onCopy={this.handleCopyModule}
              />
              <Spacer visible={!!selected} />
            </FormContainer>
            <PropertiesPanel
              module={selectedModule}
              controls={controls}
              variables={variables}
              onEdit={this.handleEdit}
              onValidate={this.validateModuleProps}
              onCancel={() => this.handleSelect(selected)}
            />
          </div>
          <NotificationAnimated
            className={styles.notifications}
            notification={error}
            onClear={this.handleClearError}
          />
        </div>
        <WalkthroughPin id="search" className={styles.serachPin} />
        <WalkthroughPin id="components" className={styles.componentsPin} />
      </WalkthroughProvider>
    );
  }
}
