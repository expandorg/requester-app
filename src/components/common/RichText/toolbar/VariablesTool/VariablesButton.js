import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VariablesTool from './VariablesTool';

import styles from './VariablesButton.module.styl';

export default class VariablesButton extends Component {
  static propTypes = {
    editorState: PropTypes.shape({}).isRequired,
    variables: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: [],
  };

  render() {
    const { variables, editorState, onChange } = this.props;

    return (
      <div className={styles.container}>
        <VariablesTool
          variables={variables}
          editorState={editorState}
          onChange={onChange}
        >
          {({ onToggle }) => (
            <button className={styles.button} onClick={onToggle}>
              variable
            </button>
          )}
        </VariablesTool>
      </div>
    );
  }
}
