import React from 'react';
import PropTypes from 'prop-types';

import { WalkthroughPin } from '@expandorg/components/app';
import { formProps } from '@expandorg/modules';
import { moduleControls } from '@expandorg/modules/app';

import FormEditor from '../../shared/FormEditor/FormEditor';
import {
  FormLayout,
  Sidebar,
  Content,
  Canvas,
} from '../../shared/FormEditor/Layout';

// import { LogicPanel } from '../../shared/FormEditor/Logic';
import ModulePicker from '../../shared/FormEditor/ModulePicker';
import Form from '../../shared/FormEditor/Form';
import { PropertiesPanel } from '../../shared/FormEditor/Properties';

import walkthrough from './walkthrough';

import styles from './Editor.module.styl';

export default function Editor({
  form,
  variables,
  toolbar,
  children,
  pickerModules,
  onSave,
  onToggleVarsDialog,
}) {
  return (
    <FormEditor form={form} onChange={onSave} controls={moduleControls}>
      {p => (
        <FormLayout className={styles.container} walkthrough={walkthrough}>
          <Sidebar visible={p.selection.isEmpty()}>
            <ModulePicker
              moduleControls={pickerModules}
              onEndDrag={p.onEndDrag}
              onAdd={p.onAdd}
              onRemoveModule={p.onRemove}
            />
          </Sidebar>
          <Content>
            {children}
            <Canvas>
              {/* <LogicPanel
                module={p.selection.find(p.modules, 'logic')}
                modules={p.modules}
                variables={variables}
                onSave={p.onEdit}
                onCancel={p.onDeselect}
              /> */}
              <Form
                ref={p.formRef}
                modules={p.modules}
                selected={p.selection.getId('edit')}
                controls={p.controlsMap}
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
            controls={p.controlsMap}
            variables={variables}
            onSave={p.onEdit}
            onValidate={p.onValidateModule}
            onCancel={p.onDeselect}
            onToggleVarsDialog={onToggleVarsDialog}
          />
          <WalkthroughPin id="search" className={styles.serachPin} />
          <WalkthroughPin id="components" className={styles.componentsPin} />
        </FormLayout>
      )}
    </FormEditor>
  );
}

Editor.propTypes = {
  form: formProps.isRequired,
  toolbar: PropTypes.element.isRequired,
  variables: PropTypes.arrayOf(PropTypes.string),
  pickerModules: PropTypes.arrayOf(PropTypes.func).isRequired,
  onSave: PropTypes.func.isRequired,
  onToggleVarsDialog: PropTypes.func,
};

Editor.defaultProps = {
  variables: [],
  onToggleVarsDialog: null,
};
