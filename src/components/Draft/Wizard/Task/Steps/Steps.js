import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import { requestStateProps } from '@gemsorg/app-utils';

import { draftProps } from '../../../../shared/propTypes';

import StepsForm from './StepsForm';

import { updateTask, updateOnboarding } from '../../../../../sagas/draftsSagas';

import { makeDataColumnNamesSelector } from '../../../../../selectors/dataSelectors';
import {
  updateDraftTaskStateSelector,
  updateDraftOnboardingStateSelector,
} from '../../../../../selectors/uiStateSelectors';

const makeMapStateToProps = () => {
  const dataVariablesSelector = makeDataColumnNamesSelector();
  return (state, props) => ({
    submitTaskState: updateDraftTaskStateSelector(state),
    variables: dataVariablesSelector(state, props.draft.dataId),
    submitOnboardingState: updateDraftOnboardingStateSelector(state),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateTask, updateOnboarding }, dispatch);

class Steps extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    variables: PropTypes.arrayOf(PropTypes.string),

    // submitTaskState: requestStateProps.isRequired,
    // submitOnboardingState: requestStateProps.isRequired,

    updateTask: PropTypes.func.isRequired,
    updateOnboarding: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: [],
  };

  handleUpdateOnboarding = onboarding => {
    const { draft } = this.props;
    this.props.updateOnboarding(draft.id, onboarding);
  };

  handleUpdateTask = taskForm => {
    const { draft } = this.props;
    this.props.updateTask(draft.id, taskForm);
  };

  render() {
    const { draft, variables } = this.props;
    return (
      <StepsForm
        taskForm={draft.taskForm}
        variables={variables}
        onboarding={draft.onboarding}
        onUpdateTask={this.handleUpdateTask}
        onUpdateOnboarding={this.handleUpdateOnboarding}
      />
    );
  }
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Steps);
