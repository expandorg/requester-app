import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps, RequestStates } from '@gemsorg/app-utils';

import { SubmitStateEffect } from '../../../common/submitStateEffect';
import { draftProps } from '../../../shared/propTypes';

import { LoadIndicator } from '../Form';
import SummaryForm from './SummaryForm';
import TaskPublishedDialog from './TaskPublishedDialog';

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

  state = {
    published: false,
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
  };

  handleSubmit = () => {
    const { draft, submitState } = this.props;
    if (submitState.state !== RequestStates.Fetching) {
      this.props.publish(draft.id);
    }
  };

  handlePublishComplete = () => {
    this.setState({ published: true });
  };

  render() {
    const { draft, submitState } = this.props;
    const { published } = this.state;

    return (
      <SubmitStateEffect
        submitState={submitState}
        onComplete={this.handlePublishComplete}
      >
        {!published && (
          <LoadIndicator
            isLoading={submitState.state === RequestStates.Fetching}
            message="Publishing your task, please wait..."
          >
            <SummaryForm
              draft={draft}
              onBack={this.handleBack}
              onSubmit={this.handleSubmit}
            />
          </LoadIndicator>
        )}
        {published && <TaskPublishedDialog submitState={submitState} />}
      </SubmitStateEffect>
    );
  }
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Summary);
