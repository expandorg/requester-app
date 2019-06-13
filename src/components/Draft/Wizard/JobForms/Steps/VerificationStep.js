import React from 'react';
import PropTypes from 'prop-types';

import { NavItem, Settings } from './controls';
import { FormSelection } from '../forms';

export default function VerificationStep({ selected, onSelect }) {
  return (
    <NavItem
      selected={selected}
      onClick={() => onSelect(FormSelection.verification)}
    >
      Verification <Settings />
    </NavItem>
  );
}

VerificationStep.propTypes = {
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
