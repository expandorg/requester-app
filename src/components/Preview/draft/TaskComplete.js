import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog, DialogHeadline, Button } from '@expandorg/components';

import styles from './TaskComplete.module.styl';

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
        <DialogHeadline>Task Submitted</DialogHeadline>
        <div className={styles.container}>
          <div className={styles.heading}>Submission successful!</div>
          <div className={styles.actions}>
            <Button
              theme="white"
              onClick={this.handleClose}
              className={styles.browse}
            >
              Close
            </Button>
            <Button theme="pink" onClick={this.handleSubmit}>
              Start this task
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}
