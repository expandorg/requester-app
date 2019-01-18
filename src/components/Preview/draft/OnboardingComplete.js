import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import styles from './OnboardingComplete.module.styl';

export default class OnboardingComplete extends Component {
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
      <div className={styles.form}>
        <h1 className={styles.heading}>Great job!</h1>
        <p className={styles.description}>You succefully finished onboarding</p>
        <p className={styles.description}>
          Continue with the real task and earn some gems!
        </p>
        <div className={styles.actions}>
          <Button
            size="large"
            theme="white"
            className={styles.back}
            onClick={this.handleClose}
          >
            Not interesting
          </Button>
          <Button
            theme="pink"
            size="large"
            className={styles.start}
            onClick={this.handleSubmit}
          >
            Start
          </Button>
        </div>
      </div>
    );
  }
}
