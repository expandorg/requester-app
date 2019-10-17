import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import { draftOnboardingStepProps } from '../../../../shared/propTypes';
import { gerAnswerFields } from '../../../../../model/onboardingData';

import DataTable from './DataTable';
import Nav from '../Nav';
import { WizardSteps } from '../wizard';

import styles from '../styles.module.styl';

export default class OnboardingGroupData extends Component {
  static propTypes = {
    group: draftOnboardingStepProps.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onChangeStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      original: props.group, // eslint-disable-line react/no-unused-state
      data: props.group.data,
      isDirty: false,
    };
  }

  static getDerivedStateFromProps({ group }, state) {
    if (state.original !== group) {
      return {
        original: group,
        data: group.data,
        isDirty: false,
      };
    }
    return null;
  }

  handleUpdateData = data => {
    this.setState({
      data,
      isDirty: true,
    });
  };

  handleSave = () => {
    const { onChangeStep, onUpdate, group } = this.props;
    const { isDirty, data } = this.state;
    if (isDirty) {
      onUpdate({ ...group, data });
    }
    onChangeStep(WizardSteps.Settings);
  };

  handleChangeStep = step => {
    const { onChangeStep, onUpdate, group } = this.props;
    const { isDirty, data } = this.state;

    // update navigate away from page with changes
    if (isDirty && step !== WizardSteps.Data) {
      onUpdate({ ...group, data });
    }
    onChangeStep(step);
  };

  render() {
    const { onChangeStep, group } = this.props;
    const { data } = this.state;

    return (
      <div className={styles.container}>
        <Nav onChangeStep={this.handleChangeStep} active={WizardSteps.Data} />
        <div className={styles.content}>
          <div className={styles.description}>Your quiz data</div>
          {data && (
            <DataTable
              fields={gerAnswerFields(group.form)}
              data={data}
              onUpdate={this.handleUpdateData}
            />
          )}
        </div>
        <div className={styles.actions}>
          <Button theme="grey" onClick={() => onChangeStep(null)}>
            Hide
          </Button>
          <Button onClick={this.handleSave}>Next</Button>
        </div>
      </div>
    );
  }
}
