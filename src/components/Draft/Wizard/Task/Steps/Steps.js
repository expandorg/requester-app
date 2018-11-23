import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps } from '@gemsorg/app-utils';

import { draftProps } from '../../../../shared/propTypes';

import StepsForm from './StepsForm';

import { updateTask, updateOnboarding } from '../../../../../sagas/draftsSagas';

import {
  updateDraftTaskStateSelector,
  updateDraftOnboardingStateSelector,
} from '../../../../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  submitTaskState: updateDraftTaskStateSelector(state),
  submitOnboardingState: updateDraftOnboardingStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateTask, updateOnboarding }, dispatch);

class Steps extends Component {
  static propTypes = {
    draft: draftProps.isRequired,

    submitTaskState: requestStateProps.isRequired,
    submitOnboardingState: requestStateProps.isRequired,

    updateTask: PropTypes.func.isRequired,
    updateOnboarding: PropTypes.func.isRequired,
  };

  handleUpdateOnboarding = onboarding => {
    const { draft } = this.props;
    this.props.updateOnboarding(draft.id, onboarding);
  };

  handleUpdateTask = task => {
    const { draft } = this.props;
    this.props.updateTask(draft.id, task);
  };

  render() {
    const { draft, submitTaskState, submitOnboardingState } = this.props;
    console.log(submitTaskState, submitOnboardingState);

    return (
      <StepsForm
        task={draft.task}
        onboarding={draft.onboarding}
        onUpdateTask={this.handleUpdateTask}
        onUpdateOnboarding={this.handleUpdateOnboarding}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Steps);
