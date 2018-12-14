import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.styl';

const FieldSet = ({ children, className }) => (
  <div className={cn(styles.fieldset, className)}>
    <div className={styles.innerFieldSet}>{children}</div>
  </div>
);

FieldSet.propTypes = {
  className: PropTypes.string,
};

FieldSet.defaultProps = {
  className: null,
};
export default FieldSet;
