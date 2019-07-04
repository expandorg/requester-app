import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { NavItem } from '../controls';
import { FormSelection } from '../../forms';

export default function TaskMenuItem({ selected, onSelect }) {
  const select = useCallback(() => onSelect(FormSelection.task), [onSelect]);

  return (
    <NavItem selected={selected} onClick={select}>
      Task
    </NavItem>
  );
}

TaskMenuItem.propTypes = {
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
