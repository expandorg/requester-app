import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import { Section, Description } from '../../../../Form';

import Header from '../Header';

import FormPreview from '../../../../../../shared/FormPreview';
import { draftOnboardingStepProps } from '../../../../../../shared/propTypes';

import { WizardSteps } from '../wizard';

import styles from '../styles.module.styl';

export default class Summary extends Component {
  static propTypes = {
    group: draftOnboardingStepProps.isRequired,
    onChangeStep: PropTypes.func.isRequired,
  };

  render() {
    const { onChangeStep, group } = this.props;
    return (
      <div className={styles.container}>
        <Header title="Preview" />
        <div className={styles.content}>
          <Description>Description about this step goes here.</Description>
          <Section title="Data">test</Section>
          <Section title="Task" blue>
            <FormPreview form={group.form} className={styles.form} />
          </Section>
        </div>
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
