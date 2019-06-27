import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import VariablesDropdown from './VariablesDropdown';

export default function VariablesTool({
  children,
  variables,
  className,
  onSelect,
  onToggleVarsDialog,
}) {
  const [opened, setOpened] = useState(false);

  const onToggle = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  const select = useCallback(
    value => {
      onSelect(`$(${value})`, value);
    },
    [onSelect]
  );

  const hide = useCallback(() => {
    setOpened(false);
  }, []);

  return (
    <>
      {children({ onToggle })}
      {opened && (
        <VariablesDropdown
          className={className}
          variables={variables}
          onSelect={select}
          onHide={hide}
          onToggleVarsDialog={onToggleVarsDialog}
        />
      )}
    </>
  );
}

VariablesTool.propTypes = {
  className: PropTypes.string,
  variables: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
  onToggleVarsDialog: PropTypes.func,
};

VariablesTool.defaultProps = {
  variables: [],
  className: null,
  onToggleVarsDialog: null,
};
