import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import { requestStateProps } from '@expandorg/app-utils';

import { draftProps } from '../../../../shared/propTypes';

import StepsForm from './StepsForm';

import { updateTask, updateOnboarding } from '../../../../../sagas/draftsSagas';
import { fetch as fetchData } from '../../../../../sagas/dataSagas';

import {
  makeDataColumnNamesSelector,
  makeDataVarsSampleSelector,
} from '../../../../../selectors/dataSelectors';
import {
  updateDraftTaskStateSelector,
  updateDraftOnboardingStateSelector,
} from '../../../../../selectors/uiStateSelectors';

const makeMapStateToProps = () => {
  const dataVariablesSelector = makeDataColumnNamesSelector();
  const varsSampleSelector = makeDataVarsSampleSelector();

  return (state, props) => ({
    submitTaskState: updateDraftTaskStateSelector(state),
    variables: dataVariablesSelector(state, props.draft.dataId),
    varsSample: varsSampleSelector(state, props.draft.dataId),
    submitOnboardingState: updateDraftOnboardingStateSelector(state),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateTask, updateOnboarding, fetchData }, dispatch);

class Steps extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    variables: PropTypes.arrayOf(PropTypes.string),
    varsSample: PropTypes.object, // eslint-disable-line
    // submitTaskState: requestStateProps.isRequired,
    // submitOnboardingState: requestStateProps.isRequired,

    updateTask: PropTypes.func.isRequired,
    updateOnboarding: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: [],
    varsSample: null,
  };

  componentDidMount() {
    const { draft } = this.props;
    if (draft.dataId) {
      this.props.fetchData(draft.id, draft.dataId, 0);
    }
  }

  handleUpdateOnboarding = onboarding => {
    const { draft } = this.props;
    this.props.updateOnboarding(draft.id, onboarding);
  };

  handleUpdateTask = taskForm => {
    const { draft } = this.props;
    this.props.updateTask(draft.id, taskForm);
  };

  render() {
    const { draft, variables, varsSample } = this.props;
    return (
      <StepsForm
        taskForm={draft.taskForm}
        variables={variables}
        varsSample={varsSample}
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
