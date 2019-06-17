import React from 'react';
import PropTypes from 'prop-types';

import { draftProps } from '../../../../shared/propTypes';

import { Topbar } from '../../../../shared/FormEditor/Layout';

import { Navs } from './controls';
import { FormSelection } from '../forms';

import Add from './Add/Add';
import OnboardingMenu from './Onboarding/OnboardingMenu';
import TaskMenuItem from './Task/MenuItem';
import VerificationMenuItem from './Verification/MenuItem';

export default function Steps({ draft, selection, onSelect }) {
  return (
    <Topbar>
      <Add draft={draft} />
      <Navs>
        <OnboardingMenu
          draft={draft}
          selection={selection}
          onSelect={onSelect}
        />
        <TaskMenuItem
          selected={selection === FormSelection.task}
          onSelect={onSelect}
        />
        <VerificationMenuItem
          draft={draft}
          selected={selection === FormSelection.verification}
          onSelect={onSelect}
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
