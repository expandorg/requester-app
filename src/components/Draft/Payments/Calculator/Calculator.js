/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from 'react';
import cn from 'classnames';

import { draftProps } from '../../../shared/propTypes';
import DraftValidator from '../../../../model/DraftValidator';

import WorkerVerfier from './WorkerVerfier';
import JobBudget from './JobBudget';
import XPNValue from './XPNValue';

import styles from './Calculator.module.styl';

export default function Calculator({ draft }) {
  const [active, setActive] = useState(0);
  const [visible, setToggle] = useState(false);

  const toggle = useCallback(
    evt => {
      evt.preventDefault();
      setToggle(!visible);
    },
    [visible]
  );

  const hasVerification = DraftValidator.hasVerificationForm(draft);

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={toggle}>
        <div className={styles.title}>Estimated Pay Calculator</div>
        <div className={cn(styles.toggle, { [styles.visible]: visible })} />
      </div>
      {visible && (
        <>
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
          <WorkerVerfier
            verification={hasVerification}
            visible={active === 0}
          />
          <JobBudget verification={hasVerification} visible={active === 1} />
          <XPNValue />
        </>
      )}
    </div>
  );
}

Calculator.propTypes = {
  draft: draftProps.isRequired,
};
