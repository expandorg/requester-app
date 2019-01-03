import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps, getModuleControlsMap } from '@gemsorg/modules';

import Button from '../../../common/Button';

import Form from './Form/Form';
import Properties from './Properties/Properties';
import PreviewCtx from './PreviewCtx';

import { ReactComponent as Bulb } from '../../../assets/bulb.svg';
import { ToggleWalkthrough, WalkthroughPin } from '../../Walkthrough';

import { NotificationAnimated } from '../../Notifications';

import { treeEditor } from '../dnd';
import { validateModuleProps } from '../model/validation';

import styles from './Editor.module.styl';

export default class Editor extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps).isRequired,
    selected: PropTypes.arrayOf(PropTypes.number),
    variables: PropTypes.arrayOf(PropTypes.string),
    varsSample: PropTypes.object, // eslint-disable-line
    moduleControls: PropTypes.arrayOf(PropTypes.func).isRequired,
    validateForm: PropTypes.func.isRequired,
    onAddModule: PropTypes.func.isRequired,
    onEditModule: PropTypes.func.isRequired,
    onMoveModule: PropTypes.func.isRequired,
    onRemoveModule: PropTypes.func.isRequired,
    onSelectModule: PropTypes.func.isRequired,
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
      onMoveModule,
      onAddModule,
      onSelectModule,
      onRemoveModule,
      onCancel,
      variables,
      varsSample,
      selected,
    } = this.props;
    const { controls, error } = this.state;
    console.log(error);
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
            />
          </div>
          <div
            className={cn(styles.spacer, {
              [styles.expanded]: !!selectedModule,
            })}
          />
        </div>
        <div className={styles.actions}>
          <div className={styles.previewContainer}>
            <PreviewCtx modules={modules} variables={varsSample}>
              {({ onPreview }) => (
                <Button
                  theme="aqua"
                  className={styles.btn}
                  onClick={onPreview}
                  id="gems-preview"
                >
                  Preview
                </Button>
              )}
            </PreviewCtx>
            <WalkthroughPin id="preview" className={styles.previewPin} />
          </div>
          <div className={styles.title}>Edit Task Module</div>
          <div className={styles.buttons}>
            <ToggleWalkthrough>
              {({ onToggle, enabled }) => (
                <button
                  className={cn(styles.toggle, { [styles.enabled]: enabled })}
                  onClick={onToggle}
                  id="gems-toggle"
                >
                  <Bulb width={13} height={15} viewBox="0 0 9 15" />
                </button>
              )}
            </ToggleWalkthrough>
            <WalkthroughPin id="toggle" className={styles.togglePin} />
            <Button theme="grey" className={styles.btn} onClick={onCancel}>
              Cancel
            </Button>
            <Button className={styles.btn} onClick={this.handleSave}>
              Save
            </Button>
          </div>
        </div>
        <Properties
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
