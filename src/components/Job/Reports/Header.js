import React from 'react';

import { Table as T } from '@expandorg/components';

import styles from './Header.module.styl';

export default function Header() {
  return (
    <T.Header className={styles.header}>
      <T.HeaderCell className={styles.cell}>worker Id</T.HeaderCell>
      <T.HeaderCell className={styles.cell}>Question</T.HeaderCell>
      <T.HeaderCell className={styles.cell}>Reason</T.HeaderCell>
      <T.HeaderCell className={styles.cell}>Date</T.HeaderCell>
      <T.HeaderCell className={styles.cell}>Options</T.HeaderCell>
    </T.Header>
  );
}
