import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  requestStateProps,
  RequestStates,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import { draftProps, taskTemplateProps } from '../../../shared/propTypes';

import { LoadIndicator } from '../Form';

import TemplatesList from './TemplatesList';
import TemplateSettings from './TemplateSettings';

import { hasTemplate } from '../../wizard';
import { selectDraftTemplateStateSelector } from '../../../../selectors/uiStateSelectors';
import { taskTemplatesSelector } from '../../../../selectors/taskTemplatesSelectors';
import { fetchTaskTemplates } from '../../../../sagas/tasksSagas';

const mapStateToProps = state => ({
  submitState: selectDraftTemplateStateSelector(state),
  templates: taskTemplatesSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchTaskTemplates }, dispatch);

class Templates extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    templates: PropTypes.arrayOf(taskTemplateProps),
    submitState: requestStateProps.isRequired,

    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,

    fetchTaskTemplates: PropTypes.func.isRequired,
  };

  static defaultProps = {
    templates: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      draft: props.draft, // eslint-disable-line react/no-unused-state
      step: 0,
      selected: (props.draft && props.draft.templateId) || null,
    };
  }

  static getDerivedStateFromProps({ draft }, state) {
    if (draft !== state.draft) {
      const selected = hasTemplate(draft) ? draft.templateId : state.selected;
      return { draft, selected };
    }
    return null;
  }

  componentDidMount() {
    this.props.fetchTaskTemplates();
  }

  handleSelect = selected => {
    this.setState({ selected });
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
  };

  handleChangeStep = step => {
    this.setState({ step });
  };

  render() {
    const { submitState, onNext, draft, templates } = this.props;
    const { selected, step } = this.state;

    const template =
      templates && selected !== null
        ? templates.find(t => t.id === selected)
        : null;

    return (
      <SubmitStateEffect submitState={submitState} onComplete={onNext}>
        <LoadIndicator
          isLoading={submitState.state === RequestStates.Fetching}
          message="Preparing your task, please wait..."
        >
          {step === 0 && (
            <TemplatesList
              templates={templates}
              selected={selected}
              onSelect={this.handleSelect}
              onBack={this.handleBack}
              onNext={() => this.handleChangeStep(1)}
            />
          )}
          {step === 1 && (
            <TemplateSettings
              draft={draft}
              template={template}
              selected={selected}
              submitState={submitState}
              onBack={() => this.handleChangeStep(0)}
            />
          )}
        </LoadIndicator>
      </SubmitStateEffect>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Templates);
