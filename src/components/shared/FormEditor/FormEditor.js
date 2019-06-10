import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formProps } from '@expandorg/modules';
import { getModuleControlsMap } from '@expandorg/modules/model';
import {
  NotificationAnimated,
  WalkthroughProvider,
  WalkthroughPin,
} from '@expandorg/components/app';

import { Form, FormContainer, Spacer } from './Canvas';
import { PropertiesPanel } from './Properties';
import Sidebar from './Sidebar';
import { LogicPanel } from './Logic';

import FormTreeEditor from './FormTreeEditor';

import Selection from './model/Selection';
import { availableModules } from './model/modules';
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

  handleSelect = (path, type) => {
    this.setState(({ selection }) => ({
      selection: Selection.select(path, selection, type),
    }));
  };

  handleClearSelect = () => {
    this.handleSelect(undefined);
  };

  handleChange = (modules, selection) => {
    this.setState({ modules, selection });
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
        <FormTreeEditor
          modules={modules}
          selection={selection}
          onChange={this.handleChange}
        >
          {({
            onAdd,
            onRemove,
            onEdit,
            onCopy,
            onEndDrag,
            onMove,
            formRef,
          }) => (
            <div className={styles.container}>
              <div className={styles.left}>
                <Sidebar
                  moduleControls={availableModules}
                  onEndDrag={onEndDrag}
                  onAddModule={onAdd}
                  onRemoveModule={onRemove}
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
                    onSave={onEdit}
                    onCancel={this.handleClearSelect}
                  />
                  <Form
                    ref={formRef}
                    modules={modules}
                    selected={selection.getId('edit')}
                    controls={controls}
                    onAdd={onAdd}
                    onMove={onMove}
                    onRemove={onRemove}
                    onSelect={this.handleSelect}
                    onCopy={onCopy}
                  />
                  <Spacer visible={selection.isType('edit')} />
                </FormContainer>
                <PropertiesPanel
                  module={selection.find(modules, 'edit')}
                  controls={controls}
                  variables={variables}
                  onEdit={onEdit}
                  onValidate={this.validateModuleProps}
                  onCancel={this.handleClearSelect}
                />
              </div>
              <NotificationAnimated
                className={styles.notifications}
                notification={error}
                onClear={this.handleClearError}
              />
            </div>
          )}
        </FormTreeEditor>
        <WalkthroughPin id="search" className={styles.serachPin} />
        <WalkthroughPin id="components" className={styles.componentsPin} />
      </WalkthroughProvider>
    );
  }
}
