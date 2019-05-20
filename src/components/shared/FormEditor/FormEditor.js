import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { formProps } from '@expandorg/modules';
import { deepCopyModule, getModuleControlsMap } from '@expandorg/modules/model';
import {
  NotificationAnimated,
  WalkthroughProvider,
  WalkthroughPin,
} from '@expandorg/components/app';

import { Form, FormContainer, Spacer, ValueContextProvider } from './Canvas';
import { PropertiesPanel } from './Properties';
import Sidebar from './Sidebar';
import { LogicPanel } from './Logic';

import { treeEditor } from './model/dnd';
import Selection from './model/Selection';
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

    this.formRef = createRef();

    this.state = {
      selection: Selection.empty,
      prev: props.form, // eslint-disable-line react/no-unused-state
      modules: props.form ? props.form.modules : [],
      controls: getModuleControlsMap(availableModules),
      error: null,
    };
  }

  static getDerviedStateFromProps({ form }, state) {
    if (state.prev !== form) {
      return {
        selection: Selection.empty,
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

  handleAdd = (meta, scroll) => {
    const { modules } = this.state;
    this.setState({
      modules: treeEditor.push(modules, scaffold(meta)),
    });

    if (scroll) {
      this.formRef.current.decoratedRef.current.scrollBottom();
    }
  };

  handleRemove = path => {
    if (path.length) {
      this.setState(({ modules }) => ({
        selection: Selection.empty,
        modules: treeEditor.removeAt(modules, path),
      }));
    }
  };

  handleCopyModule = (path, module) => {
    const { modules } = this.state;
    this.setState({
      selection: Selection.empty,
      modules: treeEditor.insertAt(
        modules,
        path,
        deepCopyModule(module, getUniqId)
      ),
    });
  };

  handleMoveAt = (dragPath, hoverPath, meta) => {
    const { modules } = this.state;

    this.setState({
      selection: Selection.empty,
      modules:
        dragPath.length === 0
          ? treeEditor.insertAt(modules, hoverPath, scaffold(meta, true))
          : treeEditor.moveAt(modules, dragPath, hoverPath),
    });
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

  handleSelect = (path, type) => {
    this.setState(({ selection }) => ({
      selection: Selection.select(path, selection, type),
    }));
  };

  handleEdit = mod => {
    const { modules, selection } = this.state;
    this.setState({
      selection: Selection.empty,
      modules: treeEditor.replaceAt(modules, selection.path, mod),
    });
  };

  handleClearError = () => {
    this.setState({ error: null });
  };

  validateModuleProps = (module, originalName) => {
    const { controls, modules } = this.state;
    const { module: meta } = controls[module.type];
    return validateModuleProps(module, originalName, meta, modules);
  };

  render() {
    const { onHide, variables, varsSample, title } = this.props;
    const { modules, selection, controls, error } = this.state;

    return (
      <WalkthroughProvider settings={help}>
        <div className={styles.container}>
          <ValueContextProvider selection={selection}>
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
                <LogicPanel
                  module={selection.find(modules, 'logic')}
                  modules={modules}
                  variables={variables}
                  onSave={this.handleEdit}
                  onCancel={() => this.handleSelect(null)}
                />
                <Form
                  ref={this.formRef}
                  modules={modules}
                  selected={selection.getId('edit')}
                  controls={controls}
                  onAdd={this.handleAdd}
                  onMove={this.handleMoveAt}
                  onRemove={this.handleRemove}
                  onSelect={this.handleSelect}
                  onCopy={this.handleCopyModule}
                />
                <Spacer visible={selection.isType('edit')} />
              </FormContainer>
              <PropertiesPanel
                module={selection.find(modules, 'edit')}
                controls={controls}
                variables={variables}
                onEdit={this.handleEdit}
                onValidate={this.validateModuleProps}
                onCancel={() => this.handleSelect(null)}
              />
            </div>
            <NotificationAnimated
              className={styles.notifications}
              notification={error}
              onClear={this.handleClearError}
            />
          </ValueContextProvider>
        </div>
        <WalkthroughPin id="search" className={styles.serachPin} />
        <WalkthroughPin id="components" className={styles.componentsPin} />
      </WalkthroughProvider>
    );
  }
}
