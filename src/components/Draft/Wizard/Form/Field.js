import React from 'react';
import PropTypes from 'prop-types';

import I from '../../../common/I';

import styles from './styles.module.styl';

const Field = ({ children, tooltip }) => (
  <div className={styles.field}>
    {children}
    {tooltip && (
      <I
        className={styles.fieldTooltip}
        tooltip={tooltip}
        tooltipOrientation="right"
      />
    )}
  </div>
);

Field.propTypes = {
  tooltip: PropTypes.string,
};

Field.defaultProps = {
  tooltip: null,
};

export default Field;