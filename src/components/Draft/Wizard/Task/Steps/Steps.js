import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { draftProps } from '../../../../shared/propTypes';

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

import FormEditorToggle from './FormEditor/FormEditorToggle';
import OnboardingSteps from './Onboarding/OnboardingSteps';

import { validationTaskFormProps } from '../../../../shared/FormEditor/model/validation';
import { DraftManager } from '../../../../../model/draft';

import styles from './Steps.module.styl';

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
    return (
      <div className={styles.container}>
        <div className={styles.list}>
          <OnboardingSteps
            onboarding={draft.onboarding}
            onUpdateOnboarding={this.handleUpdateOnboarding}
          />
          <FormEditorToggle
            form={draft.taskForm}
            checked={DraftManager.isTaskFormReviewed(draft)}
            title="Task"
            variables={variables}
            varsSample={varsSample}
            validateForm={validationTaskFormProps}
            onUpdate={this.handleUpdateTask}
          />
          {DraftManager.shouldUseVerificationForm(draft) && (
            <FormEditorToggle
              form={draft.verificationForm}
              checked={DraftManager.isVerificationFormReviewed(draft)}
              title="Verification"
              variables={variables}
              varsSample={varsSample}
              validateForm={validationTaskFormProps}
              onUpdate={this.handleUpdateVerification}
            />
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Steps);
