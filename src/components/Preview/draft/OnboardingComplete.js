import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Panel } from '@expandorg/components';

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
      <div className={styles.container}>
        <Panel className={styles.panel}>
          <h1 className={styles.heading}>Great job!</h1>
          <div className={styles.title}>Onboarding Complete</div>
          <div className={styles.description}>
            Continue with the real task and earn some gems!
          </div>
          <div className={styles.actions}>
            <Button className={styles.start} onClick={this.handleSubmit}>
              Start
            </Button>
            <Button
              theme="grey"
              className={styles.back}
              onClick={this.handleClose}
            >
              Not interesting
            </Button>
          </div>
        </Panel>
      </div>
    );
  }
}
