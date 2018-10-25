import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './TableContainer.module.styl';

export default class TableContainer extends Component {
  static propTypes = {
    footer: PropTypes.any, // eslint-disable-line
  };

  render() {
    const { children, footer } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.table}>{children}</div>
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    );
  }
}
