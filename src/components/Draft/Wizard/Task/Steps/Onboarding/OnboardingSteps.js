import React, { Component } from 'react';
import PropTypes from 'prop-types';

import immer from 'immer';
import { removeAtIndex, replaceAtIndex } from '@expandorg/utils';

import Step from '../Step';
import AddNew from './AddNew';
import FormEditorDialog from '../FormEditor/FormEditorDialog';
import EditOnboardingGroupDialog from '../OnboardingGroup/EditOnboardingGroupDialog';

import { validationFormProps } from '../../../../../shared/FormEditor/model/validation';

import { draftOnboardingProps } from '../../../../../shared/propTypes';
import { getStepFromTemplate } from '../../../../../../model/draft';

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
      steps: replaceAtIndex(steps, selected, step),
    });
    this.handleDeselect();
  };

  handleUpdateGroup = group => {
    const { onUpdateOnboarding, onboarding } = this.props;
    const { selected, steps } = this.state;

    onUpdateOnboarding({
      ...onboarding,
      steps: replaceAtIndex(steps, selected, group),
    });
  };

  handleAdd = template => {
    const { onUpdateOnboarding, onboarding } = this.props;
    const { steps: prev } = this.state;

    const step = getStepFromTemplate(template);
    const steps = [step, ...prev];

    this.setState({ steps });

    onUpdateOnboarding({ ...onboarding, steps });
  };

  handleEndDrag = () => {
    const { onUpdateOnboarding, onboarding } = this.props;
    const { steps } = this.state;
    onUpdateOnboarding({ ...onboarding, steps });
  };

  handleDeleteStep = order => {
    const { onUpdateOnboarding, onboarding } = this.props;
    const { steps } = this.state;
    onUpdateOnboarding({
      ...onboarding,
      steps: removeAtIndex(steps, order),
    });
  };

  handleMoveStep = (dragId, hoverId) => {
    const { steps } = this.state;

    const dragIndex = steps.findIndex(m => m.id === dragId);
    const hoverIndex = steps.findIndex(m => m.id === hoverId);

    const dragged = steps[dragIndex];
    const hovered = steps[hoverIndex];

    this.setState({
      steps: immer(steps, draft => {
        draft[dragIndex] = hovered;
        draft[hoverIndex] = dragged;
      }),
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
        <AddNew onAdd={this.handleAdd} />
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
        {selected !== null && !steps[selected].isGroup && (
          <FormEditorDialog
            title="Onboarding"
            form={steps[selected].form}
            validateForm={validationFormProps}
            onSave={this.handleUpdate}
            onHide={this.handleDeselect}
          />
        )}
        {selected !== null && steps[selected].isGroup && (
          <EditOnboardingGroupDialog
            group={steps[selected]}
            onUpdate={this.handleUpdateGroup}
            onHide={this.handleDeselect}
          />
        )}
      </>
    );
  }
}
