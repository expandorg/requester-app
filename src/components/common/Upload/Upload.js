import React from 'react';
import PropTypes from 'prop-types';

import { Upload as UIUpload } from '@expandorg/components/app';

import I from '../I';

import styles from './Upload.module.styl';

export default function Upload({ children, tooltip, label, ...rest }) {
  return (
    <div className={styles.container}>
      {label && (
        <div className={styles.label}>
          <span>{label}</span>
          {tooltip && (
            <I
              className={styles.tooltip}
              tooltip={tooltip}
              tooltipOrientation="right"
            />
          )}
        </div>
      )}
      <UIUpload {...rest}>{children}</UIUpload>
    </div>
  );
}

Upload.propTypes = {
  label: PropTypes.string,
  tooltip: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

Upload.defaultProps = {
  label: null,
  tooltip: null,
};
