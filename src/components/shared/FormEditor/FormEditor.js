import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formProps } from '@expandorg/modules';

import { WalkthroughProvider, WalkthroughPin } from '@expandorg/components/app';

import { Form, FormContainer, Spacer } from './Canvas';
import { PropertiesPanel } from './Properties';
import Sidebar from './Sidebar';
import { LogicPanel } from './Logic';

import FormEditorContainer from './FormEditorContainer';

import { availableModules } from './model/modules';
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

  render() {
    const {
      form,
      onHide,
      variables,
      varsSample,
      title,
      validateForm,
      onSave: onSaveForm,
    } = this.props;

    return (
      <FormEditorContainer
        form={form}
        validateForm={validateForm}
        onSave={onSaveForm}
      >
        {({
          modules,
          selection,
          controls,
          onSave,
          onSelect,
          onDeselect,
          onAdd,
          onRemove,
          onEdit,
          onCopy,
          onEndDrag,
          onMove,
          onValidateModule,
          formRef,
        }) => (
          <WalkthroughProvider settings={help}>
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
                  onSave={onSave}
                  onCancel={onHide}
                >
                  <LogicPanel
                    module={selection.find(modules, 'logic')}
                    modules={modules}
                    variables={variables}
                    onSave={onEdit}
                    onCancel={onDeselect}
                  />
                  <Form
                    ref={formRef}
                    modules={modules}
                    selected={selection.getId('edit')}
                    controls={controls}
                    onAdd={onAdd}
                    onMove={onMove}
                    onRemove={onRemove}
                    onSelect={onSelect}
                    onCopy={onCopy}
                  />
                  <Spacer visible={selection.isType('edit')} />
                </FormContainer>
                <PropertiesPanel
                  module={selection.find(modules, 'edit')}
                  controls={controls}
                  variables={variables}
                  onEdit={onEdit}
                  onValidate={onValidateModule}
                  onCancel={onDeselect}
                />
              </div>
            </div>
            <WalkthroughPin id="search" className={styles.serachPin} />
            <WalkthroughPin id="components" className={styles.componentsPin} />
          </WalkthroughProvider>
        )}
      </FormEditorContainer>
    );
  }
}
