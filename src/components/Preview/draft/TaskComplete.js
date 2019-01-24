import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog, Button } from '@expandorg/components';

import styles from '../../shared/serviceForms.module.styl';

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
        <div className={styles.container}>
          <div className={styles.inner}>
            <div className={styles.title}>Task Submitted</div>
            <div className={styles.description}>Submission successful!</div>
            <div className={styles.actions}>
              <Button
                theme="secondary"
                className={styles.button}
                onClick={this.handleClose}
              >
                Browse jobs
              </Button>
              <Button className={styles.button} onClick={this.handleSubmit}>
                Start this task
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
