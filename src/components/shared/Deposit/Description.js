import React from 'react';
import PropTypes from 'prop-types';

import {
  WITHDRAW_MIN,
  DEPOSIT_MAX,
  DEPOSIT_MIN,
} from '@expandorg/app-gemtokens';

import styles from './Description.module.styl';

const Description = ({ balance }) => (
  <div className={styles.description}>
    <p className={styles.text}>
      In order to submit tasks you will first need to deposit at least{' '}
      {DEPOSIT_MIN} XPN (and at most {DEPOSIT_MAX} XPN) via MetaMask.
    </p>
    <p className={styles.text}>
      You will not lose your deposited XPN even if your tasks are not accepted,
      and you can withdraw them again once your total balance is at least{' '}
      {WITHDRAW_MIN} XPN.
    </p>
    <p className={styles.text}>
      Your currently own
      <span className={styles.balance}>{balance}</span>
      XPN that are available to deposit.
    </p>
  </div>
);

Description.propTypes = {
  balance: PropTypes.number,
};

Description.defaultProps = {
  balance: 0,
};

export default Description;
