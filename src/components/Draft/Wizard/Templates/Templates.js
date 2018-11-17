import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { requestStateProps, RequestStates } from '@gemsorg/app-utils';
import { SubmitStateEffect } from '../../../common/submitStateEffect';

import { draftProps } from '../../../shared/propTypes';

import { LoadIndicator } from '../Form';

import TemplatesList from './TemplatesList';
import TemplateSettings from './TemplateSettings';

import { hasTemplate } from '../../wizard';
import { selectDraftTemplateStateSelector } from '../../../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  submitState: selectDraftTemplateStateSelector(state),
});

class Templates extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    submitState: requestStateProps.isRequired,

    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
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
    const { submitState, onNext, draft } = this.props;
    const { selected, step } = this.state;
    return (
      <SubmitStateEffect submitState={submitState} onComplete={onNext}>
        <LoadIndicator
          isLoading={submitState.state === RequestStates.Fetching}
          message="Preparing your task, please wait..."
        >
          {step === 0 && (
            <TemplatesList
              selected={selected}
              onSelect={this.handleSelect}
              onBack={this.handleBack}
              onNext={() => this.handleChangeStep(1)}
            />
          )}
          {step === 1 && (
            <TemplateSettings
              draft={draft}
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

export default connect(mapStateToProps)(Templates);
