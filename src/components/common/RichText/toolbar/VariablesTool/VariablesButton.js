import React from 'react';
import PropTypes from 'prop-types';

import VariablesTool from './VariablesTool';

import styles from './VariablesButton.module.styl';

export default function VariablesButton({ variables, onSelect }) {
  return (
    <div className={styles.container}>
      <VariablesTool variables={variables} onSelect={onSelect}>
        {({ onToggle }) => (
          <button className={styles.button} onClick={onToggle}>
            + var
          </button>
        )}
      </VariablesTool>
    </div>
  );
}

VariablesButton.propTypes = {
  variables: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
};

VariablesButton.defaultProps = {
  variables: [],
};
