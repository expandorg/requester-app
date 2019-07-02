import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { NavItem, ErrorIcon } from '../controls';
import { FormSelection } from '../../forms';

export default function TaskMenuItem({ selected, onSelect, validation }) {
  const select = useCallback(() => onSelect(FormSelection.task), [onSelect]);

  return (
    <NavItem selected={selected} onClick={select}>
      Task → <ErrorIcon error={validation} />
    </NavItem>
  );
}

TaskMenuItem.propTypes = {
  validation: PropTypes.shape({}),
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

TaskMenuItem.defaultProps = {
  validation: null,
};
