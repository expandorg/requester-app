import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Field from './Field';
import { XPN_USD } from '../../../../common/consts';

import styles from './Calculator.module.styl';

function workerPayment(mins, hourly, enabled = true) {
  if (!enabled) {
    return 0;
  }
  const minsPerTask = +mins;
  const hourlyRate = +hourly;
  if (Number.isNaN(minsPerTask) || Number.isNaN(hourlyRate)) {
    return 0;
  }

  const xpnHourlyRate = hourlyRate / XPN_USD;
  return +(minsPerTask * (xpnHourlyRate / 60)).toFixed(3);
}

export default function WorkerVerfier({ verification, visible }) {
  const [minsPerWorker, setMinsPerWorker] = useState('');
  const [workerRate, setWorkerRate] = useState('');

  const [minsPerVerifier, setMinsPerVerifier] = useState('');
  const [verifierRate, setVerifierRate] = useState('');

  if (!visible) {
    return null;
  }

  const workerTotal = workerPayment(minsPerWorker, workerRate);
  const verifierTotal = workerPayment(
    minsPerVerifier,
    verifierRate,
    verification
  );

  return (
    <div className={styles.form}>
      <div className={styles.fields}>
        <Field
          placeholder1="Mins per Task for Worker"
          value1={minsPerWorker}
          onChange1={setMinsPerWorker}
          placeholder2="Hourly Rate $"
          value2={workerRate}
          onChange2={setWorkerRate}
          total={workerTotal}
        />
        <Field
          placeholder1="Mins per Task for Verifier"
          value1={minsPerVerifier}
          onChange1={setMinsPerVerifier}
          placeholder2="Hourly Rate $"
          value2={verifierRate}
          onChange2={setVerifierRate}
          total={verifierTotal}
          disabled={!verification}
        />
      </div>
      <div className={styles.total}>= {workerTotal + verifierTotal} tokens</div>
    </div>
  );
}

WorkerVerfier.propTypes = {
  verification: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
};
