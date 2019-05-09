import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VariablesDropdown from './VariablesDropdown';

import { insertVariable } from '../../content';

export default class VariablesTool extends Component {
  static propTypes = {
    className: PropTypes.string,
    editorState: PropTypes.shape({}).isRequired,
    variables: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: [],
    className: null,
  };

  state = {
    opened: false,
  };

  handleChange = value => {
    const { onChange, editorState } = this.props;
    onChange(insertVariable(editorState, value));
  };

  handleToggle = () => {
    this.setState(({ opened }) => ({
      opened: !opened,
    }));
  };

  handleHide = () => {
    this.setState(() => ({
      opened: false,
    }));
  };

  render() {
    const { children, variables, className } = this.props;
    const { opened } = this.state;

    return (
      <>
        {children({ onToggle: this.handleToggle })}
        {opened && variables && variables.length && (
          <VariablesDropdown
            className={className}
            variables={variables}
            onClick={this.handleChange}
            onHide={this.handleHide}
          />
        )}
      </>
    );
  }
}
