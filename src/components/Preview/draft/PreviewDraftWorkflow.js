import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OnboardingComplete from './OnboardingComplete';
import TaskComplete from './TaskComplete';

import ModulesForm from './ModulesForm';

import { draftProps } from '../../shared/propTypes';

import { TaskWorkflowBackend, TaskWorkflowState } from '../workflow';

export default class PreviewDraftWorkflow extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    variables: PropTypes.object, // eslint-disable-line
    onNotify: PropTypes.func,
  };

  static defaultProps = {
    variables: null,
    onNotify: Function.prototype,
  };

  constructor(props) {
    super(props);

    this.state = {
      draft: props.draft, // eslint-disable-line react/no-unused-state
      workflow: TaskWorkflowBackend.getNextState(props.draft),
    };
  }

  static getDerivedStateFromProps({ draft }, state) {
    if (draft !== state.draft) {
      return {
        draft,
        workflow: TaskWorkflowBackend.getNextState(draft),
      };
    }
    return null;
  }

  handleSubmit = (...args) => {
    const { draft } = this.props;
    this.setState(({ workflow }) => ({
      workflow: TaskWorkflowBackend.getNextState(draft, workflow, ...args),
    }));
  };

  render() {
    const { draft, variables, onNotify } = this.props;
    const { workflow } = this.state;

    return (
      <>
        {workflow.state === TaskWorkflowState.ONBOARDING_PASSED && (
          <OnboardingComplete draft={draft} onSubmit={this.handleSubmit} />
        )}
        {workflow.state === TaskWorkflowState.ONBOARDING_GROUP && (
          <ModulesForm
            form={workflow.form}
            onSubmit={this.handleSubmit}
            onNotify={onNotify}
          />
        )}
        {workflow.state === TaskWorkflowState.TASK && (
          <ModulesForm
            form={workflow.form}
            variables={variables}
            onSubmit={this.handleSubmit}
            onNotify={onNotify}
          />
        )}
        {workflow.state === TaskWorkflowState.REPEAT && (
          <TaskComplete draft={draft} onSubmit={this.handleSubmit} />
        )}
      </>
    );
  }
}
