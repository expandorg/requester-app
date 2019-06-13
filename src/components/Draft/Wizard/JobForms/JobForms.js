import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { WalkthroughPin } from '@expandorg/components/app';

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
import Navigation from './Navigation/Navigation';

import { draftProps } from '../../../shared/propTypes';

import styles from './JobForms.module.styl';

export default class JobForms extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    onNext: PropTypes.func.isRequired,
  };

  handleSubmit = () => {
    const { onNext } = this.props;
    onNext();
  };

  render() {
    const { draft } = this.props;

    return (
      <FormEditorContainer
        form={draft.taskForm}
        validateForm={Function.prototype}
        onSave={Function.prototype}
      >
        {p => (
          <FormLayout className={styles.container} walkthrough={help}>
            <Sidebar>
              <ModulePicker
                moduleControls={availableModules}
                onEndDrag={p.onEndDrag}
                onAddModule={p.onAdd}
                onRemoveModule={p.onRemove}
              />
            </Sidebar>
            <Content>
              <Navigation draft={draft} />
              <Canvas>
                <LogicPanel
                  module={p.selection.find(p.modules, 'logic')}
                  modules={p.modules}
                  variables={[]}
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
              variables={[]}
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