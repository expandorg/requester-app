import React from 'react';
import PropTypes from 'prop-types';

import { Topbar } from '../../../../shared/FormEditor/Layout';
import { draftProps } from '../../../../shared/propTypes';

import Add from './Add';

import { Navs, NavItem } from './controls';
import { FormSelection } from '../forms';

export default function Navigation({ draft, selection, onSelect }) {
  return (
    <Topbar>
      <Add onAddTemplate={Function.prototype} />
      <Navs>
        {draft.onboarding.steps.map((step, index) => (
          <NavItem
            key={step.id}
            onClick={() => onSelect(FormSelection.onboarding(index))}
            selected={selection.isOnboardingStep(index)}
          >
            {step.name}
          </NavItem>
        ))}
        <NavItem
          selected={selection === FormSelection.task}
          onClick={() => onSelect(FormSelection.task)}
        >
          Task
        </NavItem>
        <NavItem
          selected={selection === FormSelection.verification}
          onClick={() => onSelect(FormSelection.verification)}
        >
          Verification
        </NavItem>
      </Navs>
    </Topbar>
  );
}

Navigation.propTypes = {
  draft: draftProps.isRequired,
  selection: PropTypes.instanceOf(FormSelection).isRequired,
  onSelect: PropTypes.func.isRequired,
};
