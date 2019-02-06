import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.styl';

const Fieldset = ({ children, className }) => (
  <div className={cn(styles.fieldset, className)}>
    <div className={styles.innerFieldSet}>{children}</div>
  </div>
);

Fieldset.propTypes = {
  className: PropTypes.string,
};

Fieldset.defaultProps = {
  className: null,
};

export default Fieldset;
