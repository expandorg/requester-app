import React from 'react';
import PropTypes from 'prop-types';

import { WalkthroughPin } from '@expandorg/components/app';
import { formProps } from '@expandorg/modules';

import FormEditorContainer from '../../shared/FormEditor/FormEditorContainer';
import {
  FormLayout,
  Sidebar,
  Content,
  Canvas,
} from '../../shared/FormEditor/Layout';

import ModulePicker from '../../shared/FormEditor/ModulePicker';
import { LogicPanel } from '../../shared/FormEditor/Logic';
import { Form } from '../../shared/FormEditor/Canvas';
import { PropertiesPanel } from '../../shared/FormEditor/Properties';
import { availableModules } from '../../shared/FormEditor/model/modules';
import help from '../../shared/FormEditor/model/help';
import Selection from '../../shared/FormEditor/model/Selection';

import styles from './Editor.module.styl';

export default function Editor({
  form,
  variables,
  toolbar,
  validateForm,
  children,
  onSave,
}) {
  return (
    <FormEditorContainer
      form={form}
      validateForm={validateForm}
      onChange={onSave}
    >
      {p => (
        <FormLayout className={styles.container} walkthrough={help}>
          <Sidebar hidden={p.selection !== Selection.empty}>
            <ModulePicker
              moduleControls={availableModules}
              onEndDrag={p.onEndDrag}
              onAdd={p.onAdd}
              onRemoveModule={p.onRemove}
            />
          </Sidebar>
          <Content>
            {children}
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
                onEndDrag={p.onEndDrag}
                onMove={p.onMove}
                onRemove={p.onRemove}
                onSelect={p.onSelect}
                onCopy={p.onCopy}
              />
            </Canvas>
            {toolbar}
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

Editor.propTypes = {
  form: formProps.isRequired,
  toolbar: PropTypes.element.isRequired,
  variables: PropTypes.arrayOf(PropTypes.string),
  validateForm: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

Editor.defaultProps = {
  variables: [],
};
