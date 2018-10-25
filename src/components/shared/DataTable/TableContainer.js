import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './TableContainer.module.styl';

export default class TableContainer extends Component {
  static propTypes = {
    footer: PropTypes.any, // eslint-disable-line
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { children, className, footer } = this.props;
    return (
      <div className={cn(styles.container, className)}>
        <div className={styles.inner}>
          <div className={styles.table}>{children}</div>
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    );
  }
}
