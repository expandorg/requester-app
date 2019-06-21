import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formProps } from '@expandorg/modules';
import { NotificationAnimated } from '@expandorg/components/app';

import { getModuleControlsMap } from '@expandorg/modules/model';

import { availableModules } from './model/modules';
import { validateModuleProps } from './model/validation';

import { ValueContextProvider } from './Canvas';
import Selection from './model/Selection';

import FormTreeEditor from './FormTreeEditor';

import styles from './FormEditorContainer.module.styl';

export default class FormEditorContainer extends Component {
  static propTypes = {
    form: formProps,
    validateForm: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    form: null,
    onChange: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      selection: Selection.empty,
      prev: props.form, // eslint-disable-line react/no-unused-state
      modules: props.form ? props.form.modules : [],
      controls: getModuleControlsMap(availableModules),
      error: null,
    };
  }

  static getDerivedStateFromProps({ form }, state) {
    if (state.prev !== form) {
      return {
        selection: Selection.empty,
        prev: form,
        modules: form ? form.modules : [],
        error: null,
      };
    }
    return null;
  }

  handleSave = () => {
    const { validateForm, onSave, form } = this.props;
    const { controls, modules } = this.state;

    const errors = validateForm(modules, controls);
    if (errors) {
      this.setState({
        error: {
          type: 'error',
          message: errors.commonMessage,
        },
      });
    } else {
      onSave({ ...form, modules });
    }
  };

  handleSelect = (path, type) => {
    this.setState(({ selection }) => ({
      selection: Selection.select(path, selection, type),
    }));
  };

  handleDeselect = () => {
    this.handleSelect(undefined);
  };

  handleChange = (modules, selection) => {
    const { onChange, form } = this.props;
    this.setState({ modules, selection }, () => {
      if (onChange) {
        onChange({ ...form, modules });
      }
    });
  };

  handleClearError = () => {
    this.setState({ error: null });
  };

  validateModule = (module, originalName) => {
    const { controls, modules } = this.state;
    const { module: meta } = controls[module.type];
    return validateModuleProps(module, originalName, meta, modules);
  };

  render() {
    const { children } = this.props;
    const { selection, modules, error, controls } = this.state;

    return (
      <ValueContextProvider selection={selection}>
        <FormTreeEditor
          modules={modules}
          selection={selection}
          onChange={this.handleChange}
        >
          {props =>
            children({
              ...props,
              modules,
              selection,
              controls,
              onSave: this.handleSave,
              onSelect: this.handleSelect,
              onDeselect: this.handleDeselect,
              onValidateModule: this.validateModule,
            })
          }
        </FormTreeEditor>
        <NotificationAnimated
          className={styles.notifications}
          notification={error}
          onClear={this.handleClearError}
        />
      </ValueContextProvider>
    );
  }
}
