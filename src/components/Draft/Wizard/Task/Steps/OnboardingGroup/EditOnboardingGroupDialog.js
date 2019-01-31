import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@expandorg/components';

import { draftOnboardingStepProps } from '../../../../../shared/propTypes';

import FormEditor from '../../../../../shared/FormEditor/FormEditor';
import { validationFormProps } from '../../../../../shared/FormEditor/model/validation';

import OnboardingGroupData from './Data/OnboardingGroupData';
import OnboardingForm from './Form/OnboardingForm';
import OnboardingGroupPreview from './Preview/OnboardingGroupPreview';

import { WizardSteps } from './wizard';

import styles from './EditOnboardingGroupDialog.module.styl';

export default class EditOnboardingGroupDialog extends Component {
  static propTypes = {
    group: draftOnboardingStepProps.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  state = {
    step: WizardSteps.Data,
  };

  handleUpdateForm = form => {
    const { onUpdate, group } = this.props;

    onUpdate({ ...group, form });
    this.handleChangeStep(WizardSteps.Quiz);
  };

  handleUpdateData = () => {};

  handleChangeStep = step => {
    const { onHide } = this.props;
    if (step === null) {
      onHide();
    } else {
      this.setState({ step });
    }
  };

  render() {
    const { onHide, group } = this.props;
    const { step } = this.state;

    return (
      <Dialog
        visible
        onHide={onHide}
        modalClass={styles.modal}
        contentLabel="edit-onboarding-group-dialog"
        hideButton
        shouldCloseOnEsc={false}
      >
        {step === WizardSteps.Data && (
          <OnboardingGroupData
            group={group}
            onUpdate={this.handleUpdateData}
            onChangeStep={this.handleChangeStep}
          />
        )}
        {step === WizardSteps.Quiz && (
          <OnboardingForm group={group} onChangeStep={this.handleChangeStep} />
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
          <OnboardingGroupPreview
            group={group}
            onChangeStep={this.handleChangeStep}
          />
        )}
      </Dialog>
    );
  }
}