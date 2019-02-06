import React, { Component } from 'react';
import PropTypes from 'prop-types';

import debounce from 'debounce';

import { Dialog } from '@expandorg/components';

import { LoadIndicator } from '../../../Form';
import { draftOnboardingStepProps } from '../../../../../shared/propTypes';
import FormEditor from '../../../../../shared/FormEditor/FormEditor';

import { validationFormProps } from '../../../../../shared/FormEditor/model/validation';

import Data from './Data/Data';
import Settings from './Settings/Settings';
import OnboardingForm from './OnboardingForm/OnboardingForm';
import Summary from './Summary/Summary';

import { WizardSteps, LoadingMessages } from './wizard';

import styles from './OnboardingGroupDialog.module.styl';

const DELAY = 500;

export default class OnboardingGroupDialog extends Component {
  static propTypes = {
    group: draftOnboardingStepProps.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.changeStep = debounce(this.changeStep, DELAY);

    this.state = {
      step: WizardSteps.Data,
      loading: null,
    };
  }

  componentWillUnmount() {
    this.changeStep.clear();
  }

  changeStep = step => this.setState({ step, loading: null });

  handleUpdateData = data => {
    const { onUpdate, group } = this.props;
    onUpdate({ ...group, data });
  };

  handleUpdateSettings = settings => {
    const { onUpdate, group } = this.props;
    onUpdate({ ...group, ...settings });
    this.handleChangeStep(WizardSteps.Quiz);
  };

  handleUpdateForm = form => {
    const { onUpdate, group } = this.props;

    onUpdate({ ...group, form });
    this.handleChangeStep(WizardSteps.Quiz);
  };

  handleChangeStep = step => {
    const { onHide } = this.props;
    if (step === null) {
      onHide();
    } else if (LoadingMessages[step]) {
      this.setState(
        () => ({ loading: LoadingMessages[step] }),
        () => this.changeStep(step)
      );
    } else {
      this.setState({ step, loading: null });
    }
  };

  render() {
    const { onHide, group } = this.props;
    const { step, loading } = this.state;

    return (
      <Dialog
        visible
        onHide={onHide}
        modalClass={styles.modal}
        contentLabel="edit-onboarding-group-dialog"
        hideButton
        shouldCloseOnEsc={false}
      >
        <LoadIndicator isLoading={!!loading} message={loading}>
          {step === WizardSteps.Data && (
            <Data
              group={group}
              onUpdate={this.handleUpdateData}
              onChangeStep={this.handleChangeStep}
            />
          )}
          {step === WizardSteps.Settings && (
            <Settings
              group={group}
              onUpdate={this.handleUpdateSettings}
              onChangeStep={this.handleChangeStep}
            />
          )}
          {step === WizardSteps.Quiz && (
            <OnboardingForm
              group={group}
              onChangeStep={this.handleChangeStep}
            />
          )}
          {step === WizardSteps.FormEditor && (
            <FormEditor
              form={group.form}
              title="Quiz"
              validateForm={validationFormProps}
              onSave={this.handleUpdateForm}
              onHide={() => this.handleChangeStep(WizardSteps.Quiz)}
            />
          )}
          {step === WizardSteps.Preview && (
            <Summary group={group} onChangeStep={this.handleChangeStep} />
          )}
        </LoadIndicator>
      </Dialog>
    );
  }
}
