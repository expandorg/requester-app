import React from 'react';

import NewTask from './NewTask';
import styles from './Empty.module.styl';

export default function Empty() {
  return (
    <div className={styles.container}>
      <NewTask />
    </div>
  );
}
