import React from 'react';

import { Table as T } from '@expandorg/components';

import styles from './JobResults.module.styl';

export default function Header() {
  return (
    <T.Header className={styles.header}>
      <T.HeaderCell className={styles.headerCell}>Item Id</T.HeaderCell>
      <T.HeaderCell className={styles.headerCell}>Result</T.HeaderCell>
      <T.HeaderCell className={styles.headerCell}>Worker Id</T.HeaderCell>
      <T.HeaderCell className={styles.headerCell}>Date</T.HeaderCell>
    </T.Header>
  );
}
