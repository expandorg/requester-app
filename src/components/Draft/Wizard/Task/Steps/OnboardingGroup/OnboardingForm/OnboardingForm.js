import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import FormPreview from '../../../../../../shared/FormPreview';
import { draftOnboardingStepProps } from '../../../../../../shared/propTypes';

import Nav from '../Nav';
import { WizardSteps } from '../wizard';

import styles from '../styles.module.styl';

export default class OnboardingForm extends Component {
  static propTypes = {
    group: draftOnboardingStepProps.isRequired,
    onChangeStep: PropTypes.func.isRequired,
  };

  render() {
    const { onChangeStep, group } = this.props;

    return (
      <div className={styles.container}>
        <Nav
          title="Quiz Module"
          onChangeStep={onChangeStep}
          active={WizardSteps.Quiz}
        />
        <div className={styles.content}>
          <div className={styles.formInner}>
            <FormPreview form={group.form} className={styles.form} />
          </div>
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
            onClick={() => onChangeStep(WizardSteps.Settings)}
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
