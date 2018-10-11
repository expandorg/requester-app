import React from 'react';

import styles from './styles.module.styl';

const FieldSet = ({ children }) => (
  <div className={styles.fieldset}>{children}</div>
);

export default FieldSet;
