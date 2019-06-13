import React from 'react';
import PropTypes from 'prop-types';

import { Topbar } from '../../../../shared/FormEditor/Layout';
import { draftProps } from '../../../../shared/propTypes';

import Add from './Add';

import { Navs, NavItem } from './controls';
import { FormSelection } from '../forms';

import VerificationStep from './VerificationStep';

export default function Steps({ draft, selection, onSelect }) {
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
            {step.name} →
          </NavItem>
        ))}
        <NavItem
          selected={selection === FormSelection.task}
          onClick={() => onSelect(FormSelection.task)}
        >
          Task →
        </NavItem>
        <VerificationStep
          onSelect={onSelect}
          selected={selection === FormSelection.verification}
        />
      </Navs>
    </Topbar>
  );
}

Steps.propTypes = {
  draft: draftProps.isRequired,
  selection: PropTypes.instanceOf(FormSelection).isRequired,
  onSelect: PropTypes.func.isRequired,
};
