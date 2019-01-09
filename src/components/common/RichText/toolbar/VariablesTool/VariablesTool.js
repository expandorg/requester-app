import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dropdown from './VariablesDropdown';

import { insertVariable } from '../../content';

import styles from './VariablesTool.module.styl';

export default class VariablesTool extends Component {
  static propTypes = {
    editorState: PropTypes.shape({}).isRequired,
    variables: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
  };

  state = {
    opened: false,
  };

  static defaultProps = {
    variables: [],
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
    const { variables } = this.props;
    const { opened } = this.state;
    return (
      <div className={styles.container}>
        <button
          className={styles.button}
          onClick={this.handleToggle}
          disabled={!(variables && variables.length)}
        >
          add variable
        </button>
        {opened && (
          <Dropdown
            variables={variables}
            onClick={this.handleChange}
            onHide={this.handleHide}
          />
        )}
      </div>
    );
  }
}
