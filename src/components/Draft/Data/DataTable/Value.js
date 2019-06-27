import React from 'react';

import styles from './DataTable.module.styl';

export default function Value({ children }) {
  return (
    <div className={styles.cell}>
      <span className={styles.cellContent}>{children}</span>
    </div>
  );
}
