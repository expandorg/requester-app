import React from 'react';

import styles from './styles.module.styl';

const Description = ({ children }) => (
  <div className={styles.description}>{children}</div>
);

export default Description;
