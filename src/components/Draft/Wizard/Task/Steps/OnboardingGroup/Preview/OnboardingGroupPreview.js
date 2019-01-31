import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import Header from '../Header';
// import { draftOnboardingStepProps } from '../../../../../../shared/propTypes';

import { WizardSteps } from '../wizard';

import styles from './OnboardingGroupPreview.module.styl';

export default class OnboardingGroupPreview extends Component {
  static propTypes = {
    // group: draftOnboardingStepProps.isRequired,
    onChangeStep: PropTypes.func.isRequired,
  };

  render() {
    const { onChangeStep } = this.props;
    return (
      <div className={styles.container}>
        <Header title="Preview" />
        <div className={styles.content} />
        <div className={styles.actions}>
          <Button
            theme="secondary"
            onClick={() => onChangeStep(WizardSteps.Quiz)}
          >
            Back
          </Button>
          <Button onClick={() => onChangeStep(null)}>Done</Button>
        </div>
      </div>
    );
  }
}
