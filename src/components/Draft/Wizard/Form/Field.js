import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import I from '../../../common/I';

import styles from './styles.module.styl';

const Field = ({ children, tooltip, name, errors, className }) => {
  const error = name && errors && errors[name];
  const classes = cn(styles.field, className);
  return (
    <div className={classes}>
      {children}
      {tooltip && (
        <I
          className={styles.fieldTooltip}
          tooltip={tooltip}
          tooltipOrientation="right"
        />
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

Field.propTypes = {
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  className: PropTypes.string,
  errors: PropTypes.object, // eslint-disable-line
};

Field.defaultProps = {
  tooltip: null,
  className: null,
  name: null,
  errors: null,
};

export default Field;
