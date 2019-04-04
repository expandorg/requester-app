import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Upload as UIUpload } from '@expandorg/components/app';

import I from '../I';

import styles from './Upload.module.styl';

export default class Upload extends Component {
  static propTypes = {
    label: PropTypes.string,
    tooltip: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  };

  static defaultProps = {
    label: null,
    tooltip: null,
  };

  render() {
    const { children, tooltip, label, ...rest } = this.props;

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
}
