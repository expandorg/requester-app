import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.styl';

const Field = ({ children, name, errors, className }) => {
  const error = name && errors && errors[name];
  return (
    <div className={cn(styles.field, className)}>
      {children}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

Field.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  errors: PropTypes.object, // eslint-disable-line
};

Field.defaultProps = {
  className: null,
  name: null,
  errors: null,
};

export default Field;
