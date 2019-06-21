import React from 'react';
import PropTypes from 'prop-types';

import { NavItem } from '../controls';
import { FormSelection } from '../../forms';

export default function TaskMenuItem({ selected, onSelect }) {
  return (
    <NavItem selected={selected} onClick={() => onSelect(FormSelection.task)}>
      Task →
    </NavItem>
  );
}

TaskMenuItem.propTypes = {
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
