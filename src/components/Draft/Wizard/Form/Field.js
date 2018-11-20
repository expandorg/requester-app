import React from 'react';
import PropTypes from 'prop-types';

import I from '../../../common/I';

import styles from './styles.module.styl';

const Field = ({ children, tooltip, name, errors }) => {
  const error = name && errors && errors[name];
  return (
    <div className={styles.field}>
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
  errors: PropTypes.object, // eslint-disable-line
};

Field.defaultProps = {
  tooltip: null,
  name: null,
  errors: null,
};

export default Field;
