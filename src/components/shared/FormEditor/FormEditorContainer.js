import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formProps } from '@expandorg/modules';

import { getModuleControlsMap } from '@expandorg/modules/model';

import { availableModules } from './model/modules';
import { validateModuleProps } from './model/validation';

import { ValueContextProvider } from './Canvas';
import Selection from './model/Selection';

import FormTreeEditor, { Ops } from './FormTreeEditor';

const actions = new Set([Ops.Remove, Ops.Copy, Ops.Edit, Ops.Move]);

const changeSelection = (current, op) => {
  if (current !== Selection.empty && actions.has(op)) {
    return Selection.empty;
  }
  return current;
};

export default class FormEditorContainer extends Component {
  static propTypes = {
    form: formProps,
    validateForm: PropTypes.func.isRequired,
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
      // error: null,
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

  handleValidate = () => {
    const { validateForm } = this.props;
    const { controls, modules } = this.state;

    const errors = validateForm(modules, controls);
    console.log(errors);
  };

  handleSelect = (path, type) => {
    this.setState(({ selection }) => ({
      selection: Selection.select(path, selection, type),
    }));
  };

  handleDeselect = () => {
    this.handleSelect(undefined);
  };

  handleChange = (modules, op) => {
    const { onChange, form } = this.props;
    const { selection } = this.state;

    this.setState(
      { modules, selection: changeSelection(selection, op) },
      () => {
        if (onChange && op !== Ops.Move) {
          onChange({ ...form, modules });
        }
      }
    );
  };

  validateModule = (module, originalName) => {
    const { controls, modules } = this.state;
    const { module: meta } = controls[module.type];
    return validateModuleProps(module, originalName, meta, modules);
  };

  render() {
    const { children } = this.props;
    const { selection, modules, controls } = this.state;

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
              onSelect: this.handleSelect,
              onDeselect: this.handleDeselect,
              onValidateModule: this.validateModule,
            })
          }
        </FormTreeEditor>
      </ValueContextProvider>
    );
  }
}
