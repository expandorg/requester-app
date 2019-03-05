import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps } from '@expandorg/modules';
import { getModuleControlsMap } from '@expandorg/modules/model';

import { NotificationAnimated } from '@expandorg/components/app';

import Toolbar from './Toolbar/Toolbar';
import Form from './Form';

import { treeEditor } from '../model/dnd';

import styles from './Canvas.module.styl';

export default class Canvas extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps).isRequired,
    selected: PropTypes.arrayOf(PropTypes.number),
    title: PropTypes.string.isRequired,
    varsSample: PropTypes.object, // eslint-disable-line
    moduleControls: PropTypes.arrayOf(PropTypes.func).isRequired,
    validateForm: PropTypes.func.isRequired,
    onAddModule: PropTypes.func.isRequired,
    onMoveModule: PropTypes.func.isRequired,
    onRemoveModule: PropTypes.func.isRequired,
    onSelectModule: PropTypes.func.isRequired,
    onCopyModule: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    varsSample: null,
    selected: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      controls: getModuleControlsMap(props.moduleControls),
    };
  }

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
          modules={modules}
          onSave={this.handleSave}
          onCancel={onCancel}
          title={title}
          varsSample={varsSample}
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
