import React from 'react';
import PropTypes from 'prop-types';

import { formProps } from '@expandorg/modules';

import { Form, FormContainer, Spacer } from './Canvas';
import { PropertiesPanel } from './Properties';
import Sidebar from './Sidebar';
import { LogicPanel } from './Logic';

import FormEditorContainer from './FormEditorContainer';
import { FormLayout, Left, Content } from './Layout';

import { availableModules } from './model/modules';

export default function FormEditor({
  form,
  onHide,
  variables,
  varsSample,
  title,
  validateForm,
  onSave: onSaveForm,
}) {
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
        <FormLayout>
          <Left>
            <Sidebar
              moduleControls={availableModules}
              onEndDrag={onEndDrag}
              onAddModule={onAdd}
              onRemoveModule={onRemove}
            />
          </Left>
          <Content>
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
          </Content>
        </FormLayout>
      )}
    </FormEditorContainer>
  );
}

FormEditor.propTypes = {
  form: formProps,
  title: PropTypes.string,
  variables: PropTypes.arrayOf(PropTypes.string),
    varsSample: PropTypes.object, // eslint-disable-line
  validateForm: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

FormEditor.defaultProps = {
  form: null,
  variables: [],
  title: 'Task',
  varsSample: null,
};
