import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { requestStateProps, historyProps } from '@expandorg/app-utils';

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
        icon="review"
        title="Great! Your task has been sent for review."
        confirmation="It typically takes up to 24 hours."
        confirmCaption="review draft"
        hideCaption="take me home"
        onHide={this.handleHide}
        onConfirm={this.handleConfirm}
      />
    );
  }
}

export default withRouter(Summary);
