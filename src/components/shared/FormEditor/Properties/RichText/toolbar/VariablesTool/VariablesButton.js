import React from 'react';
import PropTypes from 'prop-types';

import VariablesTool from '../../variables/VariablesTool';

import styles from './VariablesButton.module.styl';

export default function VariablesButton({
  variables,
  onSelect,
  onToggleVarsDialog,
}) {
  return (
    <div className={styles.container}>
      <VariablesTool
        variables={variables}
        onSelect={onSelect}
        onToggleVarsDialog={onToggleVarsDialog}
      >
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
  onToggleVarsDialog: PropTypes.func,
};

VariablesButton.defaultProps = {
  variables: [],
  onToggleVarsDialog: null,
};
