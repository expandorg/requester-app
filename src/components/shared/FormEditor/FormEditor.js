import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formProps } from '@expandorg/modules';

import { getModuleControlsMap } from '@expandorg/modules/model';
import { validateModuleProperties } from './Properties';
import { ValueContextProvider } from './ValueContext';

import Selection from './Tree/Selection';

import { Ops, TreeEditor } from './Tree';

const actions = new Set([Ops.Remove, Ops.Copy, Ops.Edit, Ops.Move]);

const changeSelection = (current, op) => {
  if (current !== Selection.empty && actions.has(op)) {
    return Selection.empty;
  }
  return current;
};

export default class FormEditor extends Component {
  static propTypes = {
    form: formProps,
    controls: PropTypes.arrayOf(PropTypes.func).isRequired,
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
      controlsMap: getModuleControlsMap(props.controls),
    };
  }

  static getDerivedStateFromProps({ form }, state) {
    if (state.prev !== form) {
      return {
        selection: Selection.empty,
        prev: form,
        modules: form ? form.modules : [],
      };
    }
    return null;
  }

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

  validate = (module, originalName) => {
    const { controlsMap, modules } = this.state;
    const { module: meta } = controlsMap[module.type];
    return validateModuleProperties(module, originalName, meta, modules);
  };

  render() {
    const { children } = this.props;
    const { selection, modules, controlsMap } = this.state;

    return (
      <ValueContextProvider selection={selection}>
        <TreeEditor
          modules={modules}
          selection={selection}
          onChange={this.handleChange}
        >
          {props =>
            children({
              ...props,
              modules,
              selection,
              controlsMap,
              onSelect: this.handleSelect,
              onDeselect: this.handleDeselect,
              onValidateModule: this.validate,
            })
          }
        </TreeEditor>
      </ValueContextProvider>
    );
  }
}
