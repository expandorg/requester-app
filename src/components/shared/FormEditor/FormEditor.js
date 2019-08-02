import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formProps } from '@expandorg/modules';

import { ValueContextProvider } from './ValueContext';
import { EditorContextProvider } from './EditorContext';

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

  getModules = () => {
    const { modules } = this.state;
    return modules;
  };

  render() {
    const { children, controls } = this.props;
    const { selection, modules } = this.state;

    return (
      <EditorContextProvider
        selection={selection}
        controls={controls}
        getModules={this.getModules}
      >
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
                onSelect: this.handleSelect,
                onDeselect: this.handleDeselect,
                onValidateModule: this.validate,
              })
            }
          </TreeEditor>
        </ValueContextProvider>
      </EditorContextProvider>
    );
  }
}
