import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { WalkthroughPin } from '@expandorg/components/app';
import { formProps } from '@expandorg/modules';

import FormEditorContainer from '../../../shared/FormEditor/FormEditorContainer';
import {
  FormLayout,
  Sidebar,
  Content,
  Canvas,
} from '../../../shared/FormEditor/Layout';

import ModulePicker from '../../../shared/FormEditor/ModulePicker';
import { LogicPanel } from '../../../shared/FormEditor/Logic';
import { Form } from '../../../shared/FormEditor/Canvas';
import { PropertiesPanel } from '../../../shared/FormEditor/Properties';
import { availableModules } from '../../../shared/FormEditor/model/modules';
import help from '../../../shared/FormEditor/model/help';

import Toolbar from './Toolbar/Toolbar';

import styles from './Editor.module.styl';

export default class Editor extends Component {
  static propTypes = {
    form: formProps.isRequired,

    variables: PropTypes.arrayOf(PropTypes.string),
    varsSample: PropTypes.object, // eslint-disable-line

    validateForm: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: [],
    varsSample: null,
  };

  handleSave = () => {
    const { onSubmit } = this.props;
    onSubmit();
  };

  render() {
    const { form, variables, validateForm, children } = this.props;

    return (
      <FormEditorContainer
        form={form}
        validateForm={validateForm}
        onSave={this.handleSave}
      >
        {p => (
          <FormLayout className={styles.container} walkthrough={help}>
            <Sidebar>
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
                  onMove={p.onMove}
                  onRemove={p.onRemove}
                  onSelect={p.onSelect}
                  onCopy={p.onCopy}
                />
              </Canvas>
              <Toolbar modules={p.modules} onSave={p.onSave} varsSample={{}} />
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
}
