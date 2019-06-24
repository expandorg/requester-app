import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { historyProps } from '@expandorg/app-utils';

import ConfirmationDialog from '../../shared/ConfirmationDialog';
// import { draftProps } from '../../../shared/propTypes';

class Summary extends Component {
  static propTypes = {
    history: historyProps.isRequired,
    // draft: draftProps.isRequired,
  };

  handleHide = () => {
    const { history } = this.props;
    history.replace('/');
  };

  handleConfirm = () => {
    const { history } = this.props;
    history.replace(`/`);
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
