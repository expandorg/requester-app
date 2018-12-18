import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import I from '../../../common/I';

import styles from './styles.module.styl';

const Field = ({ children, tooltip, name, errors, className }) => {
  const error = name && errors && errors[name];
  return (
    <div className={cn(styles.field, className)}>
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
  tooltip: PropTypes.string,
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
