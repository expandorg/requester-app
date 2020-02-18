import React from 'react';
import PropTypes from 'prop-types';

import { Topbar } from '@expandorg/form-editor';

import { draftProps } from '../../../shared/propTypes';

import { Navs } from './controls';
import { FormSelection } from '../forms';

import Add from './Add/Add';
import OnboardingMenu from './Onboarding/OnboardingMenu';
import TaskMenuItem from './Task/MenuItem';
import VerificationMenuItem from './Verification/MenuItem';

import styles from './Steps.module.styl';

export default function Steps({
  draft,
  selection,
  onSelect,
  onUpdateVerificationForm,
}) {
  return (
    <Topbar className={styles.topbar}>
      <Add draft={draft} onSelect={onSelect} />
      <Navs>
        <OnboardingMenu
          draft={draft}
          selection={selection}
          onSelect={onSelect}
        />
        <TaskMenuItem selected={selection.isTask()} onSelect={onSelect} />
        <VerificationMenuItem
          draft={draft}
          selected={selection.isVerification()}
          onSelect={onSelect}
          onUpdate={onUpdateVerificationForm}
        />
      </Navs>
    </Topbar>
  );
}

Steps.propTypes = {
  draft: draftProps.isRequired,
  selection: PropTypes.instanceOf(FormSelection).isRequired,
  onSelect: PropTypes.func.isRequired,
  onUpdateVerificationForm: PropTypes.func.isRequired,
};
