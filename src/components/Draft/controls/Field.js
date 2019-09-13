import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import I from '../../common/I';

import styles from './styles.module.styl';

const Field = ({
  children,
  tooltip,
  tooltipOrientation,
  tooltipPosition,
  name,
  errors,
  className,
}) => {
  const error = name && errors && errors[name];
  return (
    <div className={cn(styles.field, className)}>
      {children}
      {tooltip && (
        <I
          className={styles.fieldTooltip}
          tooltip={tooltip}
          tooltipPosition={tooltipPosition}
          tooltipOrientation={tooltipOrientation}
        />
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

Field.propTypes = {
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  tooltipOrientation: PropTypes.string,
  tooltipPosition: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  errors: PropTypes.object, // eslint-disable-line
};

Field.defaultProps = {
  tooltip: null,
  tooltipOrientation: 'right',
  tooltipPosition: 'center',
  className: null,
  name: null,
  errors: null,
};

export default Field;
