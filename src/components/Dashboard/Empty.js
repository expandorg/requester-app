import React from 'react';

import New from './Item/New';

import styles from './Empty.module.styl';

export default function Empty() {
  return (
    <div className={styles.container}>
      <New />
    </div>
  );
}
