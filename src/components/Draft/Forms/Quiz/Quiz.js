import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Dialog, useSyncedState } from '@expandorg/components';

import { draftOnboardingStepProps } from '../../../shared/propTypes';

import Data from './Data/Data';
import Settings from './Settings';

import { WizardSteps } from './wizard';

import styles from './Quiz.module.styl';

export default function Quiz({ onHide, onUpdate, group, visible }) {
  const [wizard, setWizard] = useState(WizardSteps.Data);

  const [step, setStep] = useSyncedState(group);

  const update = useCallback(
    updated => {
      onUpdate(updated);
      onHide();
    },
    [onHide, onUpdate]
  );

  const changeWizard = useCallback(
    s => {
      if (!s) {
        onHide();
      } else {
        setWizard(s);
      }
    },
    [onHide]
  );

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      modalClass={styles.modal}
      overlayClass={styles.overlay}
      contentLabel="edit-onboarding-group-dialog"
      hideButton
    >
      {wizard === WizardSteps.Data && (
        <Data group={step} onUpdate={setStep} onChangeStep={changeWizard} />
      )}
      {wizard === WizardSteps.Settings && (
        <Settings group={step} onUpdate={update} onChangeStep={changeWizard} />
      )}
    </Dialog>
  );
}

Quiz.propTypes = {
  visible: PropTypes.bool.isRequired,
  group: draftOnboardingStepProps.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};
