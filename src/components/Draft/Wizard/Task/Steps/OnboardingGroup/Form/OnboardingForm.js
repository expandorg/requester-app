import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import FormPreview from '../../../../../../shared/FormPreview';
import { draftOnboardingStepProps } from '../../../../../../shared/propTypes';

import Header from '../Header';
import { WizardSteps } from '../wizard';

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
          onChangeStep={onChangeStep}
          active={WizardSteps.Quiz}
        />
        <div className={styles.content}>
          <FormPreview form={group.form} className={styles.form} />
        </div>
        <div className={styles.actions}>
          <Button
            theme="blue"
            onClick={() => onChangeStep(WizardSteps.FormEditor)}
          >
            Edit quiz
          </Button>
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
