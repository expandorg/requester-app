import React from 'react';
import PropTypes from 'prop-types';

import { formProps } from '@expandorg/modules';
import { WalkthroughPin } from '@expandorg/components/app';

import { Form } from './Canvas';
import Toolbar from './Toolbar/Toolbar';
import { PropertiesPanel } from './Properties';
import ModulePicker from './ModulePicker';
import { LogicPanel } from './Logic';

import FormEditorContainer from './FormEditorContainer';
import { FormLayout, Sidebar, Content, Canvas } from './Layout';

import { availableModules } from './model/modules';
import help from './model/help';

import styles from './FormEditor.module.styl';

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
        <FormLayout className={styles.container} walkthrough={help}>
          <Sidebar className={styles.sidebar}>
            <ModulePicker
              moduleControls={availableModules}
              onEndDrag={p.onEndDrag}
              onAddModule={p.onAdd}
              onRemoveModule={p.onRemove}
            />
          </Sidebar>
          <Content className={styles.content}>
            <Canvas>
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
            </Canvas>
            <Toolbar
              modules={p.modules}
              onSave={p.onSave}
              onCancel={onHide}
              varsSample={varsSample}
            />
          </Content>
          <PropertiesPanel
            module={p.selection.find(p.modules, 'edit')}
            controls={p.controls}
            variables={variables}
            onEdit={p.onEdit}
            onValidate={p.onValidateModule}
            onCancel={p.onDeselect}
          />
          <WalkthroughPin id="search" className={styles.serachPin} />
          <WalkthroughPin id="components" className={styles.componentsPin} />
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
