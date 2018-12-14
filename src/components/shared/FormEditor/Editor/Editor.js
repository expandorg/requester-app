import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps, getModuleControlsMap } from '@gemsorg/modules';

import Button from '../../../common/Button';
import ErrorMessage from '../../../common/ErrorMessage';

import Form from './Form/Form';
import Properties from './Properties/Properties';
import PreviewCtx from './PreviewCtx';

import { treeEditor } from '../tree';
import { validateModuleProps, validationFormProps } from '../modules';

import styles from './Editor.module.styl';

export default class Editor extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps).isRequired,
    selected: PropTypes.arrayOf(PropTypes.number),
    moduleControls: PropTypes.arrayOf(PropTypes.func).isRequired,
    onAddModule: PropTypes.func.isRequired,
    onEditModule: PropTypes.func.isRequired,
    onMoveModule: PropTypes.func.isRequired,
    onRemoveModule: PropTypes.func.isRequired,
    onSelectModule: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selected: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      original: props.modules, // eslint-disable-line react/no-unused-state
      controls: getModuleControlsMap(props.moduleControls),
      errors: null,
    };
  }

  static getDerivedStateFromProps({ modules }, state) {
    if (modules !== state.original && state.errors) {
      return {
        original: modules,
        errors: null,
      };
    }
    return null;
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

    const {
      module: { editor },
    } = controls[module.type];

    return validateModuleProps(module, originalName, editor, modules);
  };

  handleSave = () => {
    const { modules, onSave } = this.props;
    const errors = validationFormProps(modules);
    if (errors) {
      this.setState({ errors });
    } else {
      onSave(modules);
    }
  };

  render() {
    const {
      modules,
      onMoveModule,
      onAddModule,
      onSelectModule,
      onRemoveModule,
      onCancel,
      selected,
    } = this.props;
    const { controls, errors } = this.state;
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
          <div>
            <PreviewCtx modules={modules}>
              {({ onPreview }) => (
                <Button theme="aqua" className={styles.btn} onClick={onPreview}>
                  Preview
                </Button>
              )}
            </PreviewCtx>
          </div>
          {errors ? (
            <ErrorMessage errors={errors} className={styles.errors} />
          ) : (
            <div className={styles.title}>Edit Task Module</div>
          )}
          <div>
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
          onEdit={this.handleEditModule}
          onValidate={this.validateModuleProps}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}
