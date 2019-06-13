import React from 'react';

import { Topbar } from '../../../../shared/FormEditor/Layout';
import { draftProps } from '../../../../shared/propTypes';

import styles from './Navigation.module.styl';

export default function Navigation({ draft }) {
  console.log(draft);

  return (
    <Topbar>
      <button className={styles.add}>+</button>
      <div className={styles.menu}>
        <div className={styles.item}>Welcome →</div>
        <div className={styles.item}>Instructions →</div>
        <div className={styles.item}>NDA →</div>
        <div className={styles.item}>Quiz →</div>
        <div className={styles.item}>Task →</div>
        <div className={styles.item}>Verification →</div>
      </div>
    </Topbar>
  );
}

Navigation.propTypes = {
  draft: draftProps.isRequired,
};
