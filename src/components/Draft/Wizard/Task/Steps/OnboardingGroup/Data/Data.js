import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import { draftOnboardingStepProps } from '../../../../../../shared/propTypes';

import Header from '../Header';
import { WizardSteps } from '../wizard';

import styles from '../styles.module.styl';

export default class OnboardingGroupData extends Component {
  static propTypes = {
    group: draftOnboardingStepProps.isRequired,
    // onUpdate: PropTypes.func.isRequired,
    onChangeStep: PropTypes.func.isRequired,
  };

  render() {
    const { onChangeStep, group } = this.props;
    console.log(group);

    return (
      <div className={styles.container}>
        <Header
          title="Quiz Module"
          onChangeStep={onChangeStep}
          active={WizardSteps.Data}
        />
        <div className={styles.content}>
          <div>Description about this step goes here.</div>
        </div>
        <div className={styles.actions}>
          <Button theme="secondary" onClick={() => onChangeStep(null)}>
            Back
          </Button>
          <Button onClick={() => onChangeStep(WizardSteps.Quiz)}>Next</Button>
        </div>
      </div>
    );
  }
}
