import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import OnboardingComplete from './OnboardingComplete';
import TaskComplete from './TaskComplete';

import ModulesForm from './ModulesForm';
import { hasData } from '../../Draft/wizard';

import { draftProps } from '../../shared/propTypes';

import { fetch as fetchData } from '../../../sagas/dataSagas';

import { makeDataVarsSampleSelector } from '../../../selectors/dataSelectors';

import {
  TaskWorkflowBackend,
  TaskWorkflowState,
} from '../../../model/workflow';

const makeMapStateToProps = () => {
  const dataVarsSampleSelector = makeDataVarsSampleSelector();
  return (state, props) => ({
    variables: dataVarsSampleSelector(state, props.draft.dataId),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchData }, dispatch);

class PreviewDraftWorkflow extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    variables: PropTypes.object, // eslint-disable-line
    fetchData: PropTypes.func.isRequired,
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

  componentDidMount() {
    const { draft } = this.props;
    if (draft.dataId) {
      this.props.fetchData(draft.id, draft.dataId, 0);
    }
  }

  componentDidUpdate({ draft: prev }) {
    const { draft } = this.props;
    if (hasData(draft) && draft.dataId !== prev.dataId) {
      this.props.fetchData(draft.id, draft.dataId, 0);
    }
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

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(PreviewDraftWorkflow);
