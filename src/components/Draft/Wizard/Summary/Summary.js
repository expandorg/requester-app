import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  requestStateProps,
  RequestStates,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import { userProps } from '@expandorg/app-auth';
import { userSelector } from '@expandorg/app-auth/selectors';

import { draftProps } from '../../../shared/propTypes';

import { LoadIndicator } from '../Form';
import SummaryForm from './SummaryForm';
import TaskPublishedDialog from './TaskPublishedDialog';

import { publish } from '../../../../sagas/draftsSagas';
import { publishDraftStateSelector } from '../../../../selectors/uiStateSelectors';

const mapsStateToProps = state => ({
  user: userSelector(state),
  submitState: publishDraftStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ publish }, dispatch);

class Summary extends Component {
  static propTypes = {
    user: userProps.isRequired,
    draft: draftProps.isRequired,
    submitState: requestStateProps.isRequired,
    publish: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  state = {
    published: false,
    errors: null,
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
  };

  handleSubmit = schedule => {
    const { draft, submitState } = this.props;
    if (submitState.state !== RequestStates.Fetching) {
      this.props.publish(draft.id, schedule);
    }
  };

  handlePublishComplete = () => {
    this.setState({ published: true });
  };

  handlePublishFailed = ({ error }) => {
    this.setState({ errors: error });
  };

  render() {
    const { draft, user, submitState } = this.props;
    const { published, errors } = this.state;

    return (
      <SubmitStateEffect
        submitState={submitState}
        onComplete={this.handlePublishComplete}
        onFailed={this.handlePublishFailed}
      >
        {!published && (
          <LoadIndicator
            isLoading={submitState.state === RequestStates.Fetching}
            message="Publishing your task, please wait..."
          >
            <SummaryForm
              user={user}
              draft={draft}
              errors={errors}
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
