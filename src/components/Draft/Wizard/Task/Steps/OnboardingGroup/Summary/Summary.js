import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import { Section, Description, SummaryField } from '../../../../Form';

import Nav from '../Nav';

import FormPreview from '../../../../../../shared/FormPreview';
import { draftOnboardingStepProps } from '../../../../../../shared/propTypes';
import DataTable from '../Data/DataTable';

import { WizardSteps, hasData, hasModules } from '../wizard';

import styles from '../styles.module.styl';

export const getStatus = value => (value ? 'complete' : 'required');

export default class Summary extends Component {
  static propTypes = {
    group: draftOnboardingStepProps.isRequired,
    onChangeStep: PropTypes.func.isRequired,
  };

  render() {
    const { onChangeStep, group } = this.props;
    return (
      <div className={styles.container}>
        <Nav title="Preview" />
        <div className={styles.content}>
          <Description>Description about this step goes here.</Description>
          <Section title="Data" status={getStatus(hasData(group.data))}>
            <DataTable data={group.data} readOnly />
          </Section>
          <Section title="Settings" blue status="complete">
            <div className={styles.settings}>
              <SummaryField title="Number of tries" value={group.retries} />
              <SummaryField
                title="Score threshold"
                value={group.scoreThreshold}
              />
              <SummaryField
                title="Failure Message"
                value={group.failureMessage}
              />
            </div>
          </Section>
          <Section title="Task" status={getStatus(hasModules(group.form))}>
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
