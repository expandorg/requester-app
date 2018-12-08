import React, { Component } from 'react';
import PropTypes from 'prop-types';

import immer from 'immer';
import { removeAtIndex, replaceAtIndex } from '@gemsorg/utils';

import FormEditorDialog from '../../../../shared/FormEditor/FormEditorDialog';
import Step from './Step';
import AddNew from './AddNew';

import {
  draftTaskProps,
  draftOnboardingProps,
} from '../../../../shared/propTypes';

import styles from './StepsForm.module.styl';

const taskSelected = Symbol('taskSelected');

export default class StepsForm extends Component {
  static propTypes = {
    task: draftTaskProps,
    onboarding: draftOnboardingProps,
    onUpdateTask: PropTypes.func.isRequired,
    onUpdateOnboarding: PropTypes.func.isRequired,
  };

  static defaultProps = {
    task: null,
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
    const { onUpdateTask, onUpdateOnboarding, onboarding, task } = this.props;
    const { selected, steps } = this.state;

    if (selected === taskSelected) {
      onUpdateTask({ ...task, form });
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

  handleSelectStep = selected => {
    this.setState({ selected });
  };

  handleSelectTask = () => {
    this.setState({ selected: taskSelected });
  };

  handleDeselect = () => {
    this.setState({ selected: null });
  };

  getSelectedForm = selected => {
    if (selected === taskSelected) {
      const { task } = this.props;
      return task.form;
    }
    const { steps } = this.state;
    return steps[selected].form;
  };

  render() {
    const { task } = this.props;
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
                onSelect={this.handleSelectStep}
              />
            ))}
            {task && (
              <Step isTask name={task.name} onSelect={this.handleSelectTask} />
            )}
          </div>
        )}
        {selected !== null && (
          <FormEditorDialog
            form={this.getSelectedForm(selected)}
            onSave={this.handleUpdate}
            onHide={this.handleDeselect}
          />
        )}
      </div>
    );
  }
}
