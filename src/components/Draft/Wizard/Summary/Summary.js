import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps, RequestStates } from '@gemsorg/app-utils';

import { SubmitStateEffect } from '../../../common/submitStateEffect';
import { LoadIndicator } from '../Form';

import SummaryForm from './SummaryForm';
import { draftProps } from '../../../shared/propTypes';

import { publish } from '../../../../sagas/draftsSagas';
import { publishDraftStateSelector } from '../../../../selectors/uiStateSelectors';

const mapsStateToProps = state => ({
  submitState: publishDraftStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ publish }, dispatch);

class Summary extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    submitState: requestStateProps.isRequired,
    publish: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
  };

  handleSubmit = time => {
    const { draft, submitState } = this.props;
    if (submitState.state !== RequestStates.Fetching) {
      this.props.publish(draft.id, time);
    }
  };

  handlePublishComplete = () => {};

  render() {
    const { draft, submitState } = this.props;
    const isSubmitting = submitState.state === RequestStates.Fetching;
    return (
      <SubmitStateEffect
        submitState={submitState}
        onComplete={this.handlePublishComplete}
      >
        <LoadIndicator
          isLoading={isSubmitting}
          message="Publishing your task, please wait..."
        >
          <SummaryForm
            draft={draft}
            onBack={this.handleBack}
            onSubmit={this.handleSubmit}
          />
        </LoadIndicator>
      </SubmitStateEffect>
    );
  }
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Summary);
