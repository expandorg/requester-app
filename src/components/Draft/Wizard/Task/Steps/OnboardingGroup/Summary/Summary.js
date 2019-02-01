import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import { Section, Description } from '../../../../Form';

import Nav from '../Nav';

import FormPreview from '../../../../../../shared/FormPreview';
import { draftOnboardingStepProps } from '../../../../../../shared/propTypes';
import DataTable from '../Data/DataTable';

import { WizardSteps } from '../wizard';

import styles from '../styles.module.styl';

const getFormStatus = form =>
  form && form.modules && form.modules.length > 0 ? 'complete' : 'required';

const getDataStatus = data =>
  data && data.values && data.values.length > 0 ? 'complete' : 'required';

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
          <Section title="Data" status={getDataStatus(group.data)}>
            <DataTable data={group.data} readOnly />
          </Section>
          <Section title="Task" blue status={getFormStatus(group.form)}>
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
