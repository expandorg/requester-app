import React from 'react';
import PropTypes from 'prop-types';

import { WalkthroughPin } from '@expandorg/components/app';
import { formProps } from '@expandorg/modules';
import { moduleControls } from '@expandorg/modules/app';

import { EditorContextProvider } from '../../shared/FormEditor/EditorContext';
import { FormLayout, Content, Canvas } from '../../shared/FormEditor/Layout';
import Sidebar from './Sidebar';

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
    <EditorContextProvider
      form={form}
      onChange={onSave}
      controls={moduleControls}
    >
      <FormLayout className={styles.container} walkthrough={walkthrough}>
        <Sidebar>
          <ModulePicker moduleControls={pickerModules} />
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

// <LogicPanel
// module={p.selection.find(p.modules, 'logic')}
// modules={p.modules}
// variables={variables}
// onSave={p.onEdit}
// onCancel={p.onDeselect}
// />
