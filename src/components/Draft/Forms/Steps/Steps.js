import React from 'react';
import PropTypes from 'prop-types';

import { draftProps } from '../../../shared/propTypes';

import { Topbar } from '../../../shared/FormEditor/Layout';

import { Navs } from './controls';
import { FormSelection } from '../forms';

import Add from './Add/Add';
import OnboardingMenu from './Onboarding/OnboardingMenu';
import TaskMenuItem from './Task/MenuItem';
import VerificationMenuItem from './Verification/MenuItem';

import styles from './Steps.module.styl';

export default function Steps({ draft, selection, onSelect, validation }) {
  return (
    <Topbar className={styles.topbar}>
      <Add draft={draft} />
      <Navs>
        <OnboardingMenu
          draft={draft}
          validation={validation}
          selection={selection}
          onSelect={onSelect}
        />
        <TaskMenuItem
          selected={selection.isTask()}
          validation={validation.taskForm}
          onSelect={onSelect}
        />
        <VerificationMenuItem
          draft={draft}
          selected={selection.isVerification()}
          validation={validation.verificationForm}
          onSelect={onSelect}
        />
      </Navs>
    </Topbar>
  );
}

Steps.propTypes = {
  validation: PropTypes.shape({}).isRequired,
  draft: draftProps.isRequired,
  selection: PropTypes.instanceOf(FormSelection).isRequired,
  onSelect: PropTypes.func.isRequired,
};
