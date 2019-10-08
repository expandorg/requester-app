import React from 'react';
import PropTypes from 'prop-types';

import { Button, Panel } from '@expandorg/components';

import styles from './OnboardingComplete.module.styl';

export default function OnboardingComplete({ onSubmit }) {
  return (
    <div className={styles.container}>
      <Panel className={styles.panel}>
        <h1 className={styles.heading}>Great job!</h1>
        <div className={styles.title}>Onboarding Complete</div>
        <div className={styles.description}>
          Continue with the real task and earn some gems!
        </div>
        <div className={styles.actions}>
          <Button className={styles.start} onClick={onSubmit}>
            Start
          </Button>
          <Button
            theme="grey"
            className={styles.back}
            onClick={() => window.close()}
          >
            Not interested
          </Button>
        </div>
      </Panel>
    </div>
  );
}

OnboardingComplete.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
