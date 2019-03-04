import React from 'react';

import { ErrorMessage } from '@expandorg/components';

import styles from './styles.module.styl';

const ErrorContainer = ({ children, ...rest }) => (
  <div className={styles.field}>
    {children}
    <ErrorMessage {...rest} className={styles.error} />
  </div>
);

export default ErrorContainer;
