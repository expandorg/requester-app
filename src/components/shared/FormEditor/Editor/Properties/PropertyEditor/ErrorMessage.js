import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.styl';

const ErrorMessage = ({ children, name, errors }) => {
  const error = name && errors && errors[name];
  return (
    <div className={styles.field}>
      {children}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

ErrorMessage.propTypes = {
  name: PropTypes.string,
  errors: PropTypes.object, // eslint-disable-line
};

ErrorMessage.defaultProps = {
  name: null,
  errors: null,
};

export default ErrorMessage;
