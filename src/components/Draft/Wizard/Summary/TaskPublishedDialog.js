import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { requestStateProps } from '@gemsorg/app-utils';

import { historyProps } from '../../../shared/propTypes';
import ConfirmationDialog from '../../../shared/ConfirmationDialog';

class Summary extends Component {
  static propTypes = {
    history: historyProps.isRequired,
    submitState: requestStateProps.isRequired,
  };

  handleHide = () => {
    const { history } = this.props;
    history.replace('/');
  };

  handleConfirm = () => {
    const { submitState, history } = this.props;
    const { result, entities } = submitState.payload;
    const draft = entities.drafts[result.draft];
    history.replace(`/task/${draft.taskId}`);
  };

  render() {
    return (
      <ConfirmationDialog
        icon="success"
        title="Success! Your task has been published."
        confirmation="Would you like to view the progress?"
        confirmCaption="view progress"
        hideCaption="take me home"
        onHide={this.handleHide}
        onConfirm={this.handleConfirm}
      />
    );
  }
}

export default withRouter(Summary);
