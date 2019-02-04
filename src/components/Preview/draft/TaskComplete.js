import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog, Button, DialogForm as DF } from '@expandorg/components';

export default class TaskComplete extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { onSubmit } = this.props;
    onSubmit();
  };

  handleClose = () => {
    window.close();
  };

  render() {
    return (
      <Dialog visible hideButton contentLabel="submit task">
        <DF.Container>
          <DF.Title>Task Submitted</DF.Title>
          <DF.Description>Submission successful!</DF.Description>
          <DF.Actions>
            <Button
              theme="secondary"
              className="gem-dialogform-button"
              onClick={this.handleClose}
            >
              Browse jobs
            </Button>
            <Button
              className="gem-dialogform-button"
              onClick={this.handleSubmit}
            >
              Start this task
            </Button>
          </DF.Actions>
        </DF.Container>
      </Dialog>
    );
  }
}
