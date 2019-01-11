import React, { Component } from 'react';
import PropTypes from 'prop-types';

import immer from 'immer';
import { removeAtIndex, replaceAtIndex } from '@expandorg/utils';

import FormEditorDialog from './FormEditorDialog';
import Step from './Step';
import AddNew from './AddNew';

import { formProps, draftOnboardingProps } from '../../../../shared/propTypes';

import { taskSelected, verificationSelected, getFormEditorProps } from './form';

import styles from './StepsForm.module.styl';

export default class StepsForm extends Component {
  static propTypes = {
    taskForm: formProps,
    verificationForm: formProps,
    onboarding: draftOnboardingProps,
    variables: PropTypes.arrayOf(PropTypes.string),
    varsSample: PropTypes.object, // eslint-disable-line
    onUpdateOnboarding: PropTypes.func.isRequired,
    onUpdateTask: PropTypes.func.isRequired,
    onUpdateVerification: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: [],
    varsSample: null,
    taskForm: null,
    verificationForm: null,
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
    const {
      onUpdateTask,
      onUpdateVerification,
      onUpdateOnboarding,
      onboarding,
    } = this.props;
    const { selected, steps } = this.state;

    if (selected === taskSelected) {
      onUpdateTask(form);
    } else if (selected === verificationSelected) {
      onUpdateVerification(form);
    } else {
      const step = { ...steps[selected], form };
      onUpdateOnboarding({
        ...onboarding,
        steps: replaceAtIndex(steps, selected, step),
      });
    }
    this.handleDeselect();
  };

  handleAddOnboarding = step => {
    const { onUpdateOnboarding, onboarding } = this.props;
    const { steps: prev } = this.state;
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

  handleSelectOnboarding = selected => {
    this.setState({ selected });
  };

  handleSelectTask = () => {
    this.setState({ selected: taskSelected });
  };

  handleSelectVerification = () => {
    this.setState({ selected: verificationSelected });
  };

  handleDeselect = () => {
    this.setState({ selected: null });
  };

  render() {
    const { taskForm, verificationForm } = this.props;
    const { steps, selected } = this.state;
    return (
      <div className={styles.container}>
        {selected === null && (
          <div className={styles.list}>
            <AddNew onAdd={this.handleAddOnboarding} />
            {steps.map((step, order) => (
              <Step
                id={step.id}
                key={step.id}
                name={step.name}
                order={order}
                onMove={this.handleMoveStep}
                onDelete={this.handleDeleteStep}
                onEndDrag={this.handleEndDrag}
                onSelect={this.handleSelectOnboarding}
              />
            ))}
            {taskForm && (
              <Step
                isOnboarding={false}
                name="Task"
                onSelect={this.handleSelectTask}
              />
            )}
            {verificationForm && (
              <Step
                isOnboarding={false}
                name="Verification"
                onSelect={this.handleSelectVerification}
              />
            )}
          </div>
        )}
        {selected !== null && (
          <FormEditorDialog
            {...getFormEditorProps(this.props, this.state)}
            onSave={this.handleUpdate}
            onHide={this.handleDeselect}
          />
        )}
      </div>
    );
  }
}
