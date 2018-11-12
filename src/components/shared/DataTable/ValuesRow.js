import React from 'react';

import styles from './DataTable.module.styl';

export default function ValuesRow({ children }) {
  return <div className={styles.row}>{children}</div>;
}
