import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import { requestStateProps } from '@expandorg/app-utils';

import { draftProps } from '../../../../shared/propTypes';

import StepsForm from './StepsForm';

import {
  updateTaskForm,
  updateOnboarding,
  updateVerificationForm,
} from '../../../../../sagas/draftsSagas';
import { fetch as fetchData } from '../../../../../sagas/dataSagas';

import {
  makeDataColumnNamesSelector,
  makeDataVarsSampleSelector,
} from '../../../../../selectors/dataSelectors';

const makeMapStateToProps = () => {
  const dataVariablesSelector = makeDataColumnNamesSelector();
  const varsSampleSelector = makeDataVarsSampleSelector();

  return (state, props) => ({
    variables: dataVariablesSelector(state, props.draft.dataId),
    varsSample: varsSampleSelector(state, props.draft.dataId),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { updateTaskForm, updateVerificationForm, updateOnboarding, fetchData },
    dispatch
  );

class Steps extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    variables: PropTypes.arrayOf(PropTypes.string),
    varsSample: PropTypes.object, // eslint-disable-line

    updateTaskForm: PropTypes.func.isRequired,
    updateVerificationForm: PropTypes.func.isRequired,
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

  handleUpdateVerification = verificationForm => {
    const { draft } = this.props;
    this.props.updateVerificationForm(draft.id, verificationForm);
  };

  handleUpdateTask = taskForm => {
    const { draft } = this.props;
    this.props.updateTaskForm(draft.id, taskForm);
  };

  render() {
    const { draft, variables, varsSample } = this.props;
    console.log(draft);
    return (
      <StepsForm
        taskForm={draft.taskForm}
        verificationForm={draft.verificationForm}
        variables={variables}
        varsSample={varsSample}
        onboarding={draft.onboarding}
        onUpdateOnboarding={this.handleUpdateOnboarding}
        onUpdateTask={this.handleUpdateTask}
        onUpdateVerification={this.handleUpdateVerification}
      />
    );
  }
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Steps);
