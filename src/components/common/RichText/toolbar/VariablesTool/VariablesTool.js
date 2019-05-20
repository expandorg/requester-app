import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VariablesDropdown from './VariablesDropdown';

export default class VariablesTool extends Component {
  static propTypes = {
    className: PropTypes.string,
    variables: PropTypes.arrayOf(PropTypes.string),
    onSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: [],
    className: null,
  };

  state = {
    opened: false,
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

  handleSelect = value => {
    const { onSelect } = this.props;
    onSelect(`$(${value})`, value);
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
            onClick={this.handleSelect}
            onHide={this.handleHide}
          />
        )}
      </>
    );
  }
}
