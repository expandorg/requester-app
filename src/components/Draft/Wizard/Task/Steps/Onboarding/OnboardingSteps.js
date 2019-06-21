import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { replaceAtIndex } from '@expandorg/utils';

import Step from '../Step';
import FormEditorDialog from '../FormEditor/FormEditorDialog';

import { validationFormProps } from '../../../../../shared/FormEditor/model/validation';

import { draftOnboardingProps } from '../../../../../shared/propTypes';

export default class OnboardingSteps extends Component {
  static propTypes = {
    onboarding: draftOnboardingProps,
    onUpdateOnboarding: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onboarding: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      onboarding: props.onboarding, // eslint-disable-line react/no-unused-state
      steps: (props.onboarding && props.onboarding.steps) || [],
      selected: null,
    };
  }

  static getDerivedStateFromProps({ onboarding }, state) {
    if (onboarding !== state.onboarding) {
      return {
        onboarding,
        steps: (onboarding && onboarding.steps) || [],
      };
    }
    return null;
  }

  handleUpdate = form => {
    const { onUpdateOnboarding, onboarding } = this.props;
    const { selected, steps } = this.state;

    const step = { ...steps[selected], form };
    onUpdateOnboarding({
      ...onboarding,
      enabled: steps.length > 0,
      steps: replaceAtIndex(steps, selected, step),
    });
    this.handleDeselect();
  };

  handleUpdateGroup = group => {
    const { onUpdateOnboarding, onboarding } = this.props;
    const { selected, steps } = this.state;

    onUpdateOnboarding({
      ...onboarding,
      enabled: steps.length > 0,
      steps: replaceAtIndex(steps, selected, group),
    });
  };

  handleSelect = selected => {
    this.setState({ selected });
  };

  handleDeselect = () => {
    this.setState({ selected: null });
  };

  render() {
    const { steps, selected } = this.state;

    return (
      <>
        {steps.map((step, order) => (
          <Step
            id={step.id}
            key={step.id}
            name={step.name}
            order={order}
            isOnboarding
            onMove={this.handleMoveStep}
            onDelete={this.handleDeleteStep}
            onEndDrag={this.handleEndDrag}
            onSelect={this.handleSelect}
          />
        ))}
        {selected !== null && (
          <FormEditorDialog
            title="Onboarding"
            form={steps[selected].form}
            validateForm={validationFormProps}
            onSave={this.handleUpdate}
            onHide={this.handleDeselect}
          />
        )}
      </>
    );
  }
}
