import React from 'react';

import NewJob from './NewJob';

import styles from './Empty.module.styl';

export default function Empty() {
  return (
    <div className={styles.container}>
      <NewJob />
    </div>
  );
}
