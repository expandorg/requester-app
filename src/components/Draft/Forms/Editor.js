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
} from '../../shared/FormEditor';

import { FormLayout, Content, Canvas } from '../../shared/FormEditor/Layout';
import Sidebar from './Sidebar';

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
    <EditorContextProvider form={form} onChange={onSave} controls={all}>
      <FormLayout className={styles.container} walkthrough={walkthrough}>
        <Sidebar>
          <ModulePicker controls={pickerModules} />
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
