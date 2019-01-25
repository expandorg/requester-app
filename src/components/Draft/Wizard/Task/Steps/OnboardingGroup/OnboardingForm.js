import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import Header from './Header';

import { draftOnboardingStepProps } from '../../../../../shared/propTypes';
import { WizardSteps } from './wizard';

import styles from './OnboardingForm.module.styl';

export default class OnboardingForm extends Component {
  static propTypes = {
    group: draftOnboardingStepProps.isRequired,
    onChangeStep: PropTypes.func.isRequired,
  };

  render() {
    const { onChangeStep, group } = this.props;
    return (
      <div className={styles.container}>
        <Header
          title="Quiz Module"
          group={group}
          onChangeStep={onChangeStep}
          active={WizardSteps.Quiz}
        />
        <div className={styles.content}>
          <div>Description about this step goes here.</div>
        </div>
        <div className={styles.actions}>
          <Button
            theme="secondary"
            onClick={() => onChangeStep(WizardSteps.Data)}
          >
            Back
          </Button>
          <Button onClick={() => onChangeStep(WizardSteps.Preview)}>
            Next
          </Button>
        </div>
      </div>
    );
  }
}
