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
  validateForm,
  onSave: onSaveForm,
}) {
  return (
    <FormEditorContainer
      form={form}
      validateForm={validateForm}
      onSave={onSaveForm}
    >
      {p => (
        <FormLayout>
          <Left>
            <Sidebar
              moduleControls={availableModules}
              onEndDrag={p.onEndDrag}
              onAddModule={p.onAdd}
              onRemoveModule={p.onRemove}
            />
          </Left>
          <Content>
            <FormContainer
              modules={p.modules}
              varsSample={varsSample}
              onSave={p.onSave}
              onCancel={onHide}
            >
              <LogicPanel
                module={p.selection.find(p.modules, 'logic')}
                modules={p.modules}
                variables={variables}
                onSave={p.onEdit}
                onCancel={p.onDeselect}
              />
              <Form
                ref={p.formRef}
                modules={p.modules}
                selected={p.selection.getId('edit')}
                controls={p.controls}
                onAdd={p.onAdd}
                onMove={p.onMove}
                onRemove={p.onRemove}
                onSelect={p.onSelect}
                onCopy={p.onCopy}
              />
              <Spacer visible={p.selection.isType('edit')} />
            </FormContainer>
            <PropertiesPanel
              module={p.selection.find(p.modules, 'edit')}
              controls={p.controls}
              variables={variables}
              onEdit={p.onEdit}
              onValidate={p.onValidateModule}
              onCancel={p.onDeselect}
            />
          </Content>
        </FormLayout>
      )}
    </FormEditorContainer>
  );
}

FormEditor.propTypes = {
  form: formProps,
  variables: PropTypes.arrayOf(PropTypes.string),
  varsSample: PropTypes.object, // eslint-disable-line
  validateForm: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

FormEditor.defaultProps = {
  form: null,
  variables: [],
  varsSample: null,
};
