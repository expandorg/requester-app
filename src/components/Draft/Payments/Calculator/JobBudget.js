import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Field from './Field';

import { XPN_USD } from '../../../../common/consts';

import styles from './Calculator.module.styl';

function getTotal(tasks, cost, enabled = true) {
  if (!enabled) {
    return 0;
  }
  const tasksCount = +tasks;
  const taskCost = +cost;
  if (Number.isNaN(tasksCount) || Number.isNaN(taskCost)) {
    return 0;
  }
  return tasksCount * (taskCost / XPN_USD);
}

export default function JobBudget({ verification, visible }) {
  const [workerTasks, setWorkerTasks] = useState('');
  const [workerTaskCost, setWorkerTaskCost] = useState('');

  const [verifierTasks, setVerifierTasks] = useState('');
  const [verifierTaskCost, setVerifierTaskCost] = useState('');

  if (!visible) {
    return null;
  }

  const workerTotal = getTotal(workerTasks, workerTaskCost);
  const verifierTotal = getTotal(verifierTasks, verifierTaskCost, verification);

  return (
    <div className={styles.form}>
      <div className={styles.fields}>
        <Field
          placeholder1="Number of Worker Tasks"
          value1={workerTasks}
          onChange1={setWorkerTasks}
          placeholder2="Task Cost $"
          value2={workerTaskCost}
          onChange2={setWorkerTaskCost}
          total={workerTotal}
        />
        <Field
          placeholder1="Number of Verifier Tasks"
          value1={verifierTasks}
          onChange1={setVerifierTasks}
          placeholder2="Task Cost $"
          value2={verifierTaskCost}
          onChange2={setVerifierTaskCost}
          total={verifierTotal}
          disabled={!verification}
        />
      </div>
      <div className={styles.total}>= {workerTotal + verifierTotal} tokens</div>
    </div>
  );
}

JobBudget.propTypes = {
  verification: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
};
