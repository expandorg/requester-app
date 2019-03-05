import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps } from '@expandorg/modules';
import { getModuleControlsMap } from '@expandorg/modules/model';

import { NotificationAnimated } from '@expandorg/components/app';

import Form from './Form/Form';
import Toolbar from './Toolbar';
import { PropertiesPanel } from '../Properties';

import { treeEditor } from '../model/dnd';
import { validateModuleProps } from '../model/validation';

import styles from './Editor.module.styl';

export default class Editor extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps).isRequired,
    selected: PropTypes.arrayOf(PropTypes.number),
    variables: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    varsSample: PropTypes.object, // eslint-disable-line
    moduleControls: PropTypes.arrayOf(PropTypes.func).isRequired,
    validateForm: PropTypes.func.isRequired,
    onAddModule: PropTypes.func.isRequired,
    onEditModule: PropTypes.func.isRequired,
    onMoveModule: PropTypes.func.isRequired,
    onRemoveModule: PropTypes.func.isRequired,
    onSelectModule: PropTypes.func.isRequired,
    onCopyModule: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: [],
    varsSample: null,
    selected: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      controls: getModuleControlsMap(props.moduleControls),
    };
  }

  handleCancel = () => {
    const { selected, onSelectModule } = this.props;
    onSelectModule(selected);
  };

  handleEditModule = edited => {
    const { selected, onEditModule } = this.props;
    onEditModule(selected, edited);
  };

  validateModuleProps = (module, originalName) => {
    const { modules } = this.props;
    const { controls } = this.state;
    const { editor } = controls[module.type].module;

    return validateModuleProps(module, originalName, editor, modules);
  };

  handleSave = () => {
    const { modules, onSave, validateForm } = this.props;
    const { controls } = this.state;

    const errors = validateForm(modules, controls);
    if (errors) {
      this.setState({
        error: {
          type: 'error',
          message: errors.commonMessage,
        },
      });
    } else {
      onSave(modules);
    }
  };

  handleClearError = () => {
    this.setState({ error: null });
  };

  render() {
    const {
      modules,
      title,
      onMoveModule,
      onAddModule,
      onSelectModule,
      onRemoveModule,
      onCopyModule,
      onCancel,
      variables,
      varsSample,
      selected,
    } = this.props;
    const { controls, error } = this.state;

    const selectedModule = selected && treeEditor.findByPath(modules, selected);

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.form}>
            <Form
              modules={modules}
              selected={selected && treeEditor.getIdByPath(selected)}
              controls={controls}
              onAddModule={onAddModule}
              onMoveModule={onMoveModule}
              onSelectModule={onSelectModule}
              onRemoveModule={onRemoveModule}
              onCopyModule={onCopyModule}
            />
          </div>
          <div
            className={cn(styles.spacer, {
              [styles.expanded]: !!selectedModule,
            })}
          />
        </div>
        <Toolbar
          module={module}
          onSave={this.handleSave}
          onCancel={onCancel}
          title={title}
          varsSample={varsSample}
        />
        <PropertiesPanel
          module={selectedModule}
          controls={controls}
          variables={variables}
          onEdit={this.handleEditModule}
          onValidate={this.validateModuleProps}
          onCancel={this.handleCancel}
        />
        <NotificationAnimated
          className={styles.notifications}
          notification={error}
          onClear={this.handleClearError}
        />
      </div>
    );
  }
}
