import React, { Component } from 'react';
import PropTypes from 'prop-types';

import immer from 'immer';
import { removeAtIndex, replaceAtIndex } from '@gemsorg/utils';

import FormEditorDialog from './FormEditorDialog';
import Step from './Step';
import AddNew from './AddNew';

import {
  validationFormProps,
  validationTaskFormProps,
} from '../../../../shared/FormEditor/model/validation';

import {
  draftTaskFormProps,
  draftOnboardingProps,
} from '../../../../shared/propTypes';

import styles from './StepsForm.module.styl';

const taskSelected = Symbol('taskSelected');

export default class StepsForm extends Component {
  static propTypes = {
    taskForm: draftTaskFormProps,
    onboarding: draftOnboardingProps,
    variables: PropTypes.arrayOf(PropTypes.string),
    varsSample: PropTypes.object, // eslint-disable-line
    onUpdateTask: PropTypes.func.isRequired,
    onUpdateOnboarding: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: [],
    varsSample: null,
    taskForm: null,
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
      onUpdateOnboarding,
      onboarding,
      taskForm,
    } = this.props;
    const { selected, steps } = this.state;

    if (selected === taskSelected) {
      onUpdateTask({ ...taskForm, form });
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

  renderEditor(selected) {
    const { taskForm, variables, varsSample } = this.props;
    const { steps } = this.state;

    const task = selected === taskSelected;

    const form = task ? taskForm.form : steps[selected].form;
    const validate = task ? validationTaskFormProps : validationFormProps;

    return (
      <FormEditorDialog
        form={form}
        variables={variables}
        varsSample={varsSample}
        validateForm={validate}
        onSave={this.handleUpdate}
        onHide={this.handleDeselect}
      />
    );
  }

  render() {
    const { taskForm } = this.props;
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
            {taskForm && (
              <Step
                isTask
                name={taskForm.name}
                onSelect={this.handleSelectTask}
              />
            )}
          </div>
        )}
        {selected !== null && this.renderEditor(selected)}
      </div>
    );
  }
}
