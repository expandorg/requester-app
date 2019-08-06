import React from 'react';
import PropTypes from 'prop-types';

import { Switch } from '@expandorg/components';
import I from '../../common/I';

import styles from './Toggle.module.styl';

export default function Toggle({ label, name, tooltip, ...rest }) {
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {label}
        {tooltip && (
          <I
            className={styles.fieldTooltip}
            tooltip={tooltip}
            tooltipOrientation="right"
          />
        )}
      </div>
      <Switch name={name} {...rest} />
    </div>
  );
}

Toggle.propTypes = {
  className: PropTypes.string,
  value: PropTypes.bool,
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Toggle.defaultProps = {
  value: false,
  tooltip: null,
  label: null,
  className: null,
  name: undefined,
};
