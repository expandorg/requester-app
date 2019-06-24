import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Logo } from '@expandorg/uikit/assets/logo.svg';

import styles from './LoadIndicator.module.styl';

export default class LoadIndicator extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    className: PropTypes.string,
    message: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    message: null,
  };

  render() {
    const { message, className, isLoading, children } = this.props;
    if (!isLoading) {
      return children;
    }
    return (
      <div className={cn(styles.container, className)}>
        <div className={styles.info}>
          <Logo
            className={styles.logo}
            width={100}
            height={100}
            viewBox="0 0 50 50"
          />
          {message && <div className={styles.message}>{message}</div>}
        </div>
      </div>
    );
  }
}
