import React, { useState } from 'react';
import cn from 'classnames';

import { draftProps } from '../../../shared/propTypes';
import DraftValidator from '../../../../model/DraftValidator';

import WorkerVerfier from './WorkerVerfier';
import JobBudget from './JobBudget';

import styles from './Calculator.module.styl';

export default function Calculator({ draft }) {
  const [active, setActive] = useState(0);
  const hasVerification = DraftValidator.hasVerificationForm(draft);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Estimated Pay Calculator</div>
      <div className={styles.tabs}>
        <button
          className={cn(styles.tab, { [styles.tabActive]: !active })}
          type="button"
          onClick={() => setActive(0)}
        >
          Worker & Verifier Pay
        </button>
        <button
          className={cn(styles.tab, { [styles.tabActive]: active })}
          type="button"
          onClick={() => setActive(1)}
        >
          Job Budget
        </button>
      </div>
      {active === 0 && <WorkerVerfier verification={hasVerification} />}
      {active === 1 && <JobBudget verification={hasVerification} />}
    </div>
  );
}

Calculator.propTypes = {
  draft: draftProps.isRequired,
};
