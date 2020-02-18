import React from 'react';
import PropTypes from 'prop-types';

import { WalkthroughPin } from '@expandorg/components/app';
import { formProps } from '@expandorg/modules';
import { moduleControls as all } from '@expandorg/modules/app';

import {
  EditorContextProvider,
  PropertiesPanel,
  ModulePicker,
  Form,
  FormLayout,
  Content,
  Canvas,
} from '@expandorg/form-editor';

import Sidebar from './Sidebar';

import walkthrough from './walkthrough';

import styles from './Editor.module.styl';

export default function Editor({
  form,
  formId,
  variables,
  toolbar,
  children,
  pickerControls,
  getModuleActions,
  onSave,
  onToggleVarsDialog,
}) {
  return (
    <EditorContextProvider
      key={formId}
      form={form}
      onChange={onSave}
      controls={all}
      getModuleActions={getModuleActions}
    >
      <FormLayout className={styles.container} walkthrough={walkthrough}>
        <Sidebar>
          <ModulePicker controls={pickerControls} />
        </Sidebar>
        <Content>
          {children}
          <Canvas>
            <Form />
          </Canvas>
          {toolbar}
        </Content>
        <PropertiesPanel
          variables={variables}
          onToggleVarsDialog={onToggleVarsDialog}
        />
        <WalkthroughPin id="search" className={styles.serachPin} />
        <WalkthroughPin id="components" className={styles.componentsPin} />
      </FormLayout>
    </EditorContextProvider>
  );
}

Editor.propTypes = {
  form: formProps.isRequired,
  formId: PropTypes.string.isRequired,
  toolbar: PropTypes.element.isRequired,
  variables: PropTypes.arrayOf(PropTypes.string),
  pickerControls: PropTypes.arrayOf(PropTypes.func).isRequired,
  onSave: PropTypes.func.isRequired,
  onToggleVarsDialog: PropTypes.func,
  getModuleActions: PropTypes.func.isRequired,
};

Editor.defaultProps = {
  variables: [],
  onToggleVarsDialog: null,
};

// <LogicPanel
// module={p.selection.find(p.modules, 'logic')}
// modules={p.modules}
// variables={variables}
// onSave={p.onEdit}
// onCancel={p.onDeselect}
// />
