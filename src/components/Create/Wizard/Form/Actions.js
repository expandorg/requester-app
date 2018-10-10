import React from 'react';

import styles from './styles.module.styl';

const Actions = ({ children }) => (
  <div className={styles.actions}>{children}</div>
);

export default Actions;
