import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Logo } from '@expandorg/uikit/assets/logo.svg';

import styles from './LoadIndicator.module.styl';

export default function LoadIndicator({
  message,
  className,
  isLoading,
  children,
}) {
  if (!isLoading) {
    return children || null;
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

LoadIndicator.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  className: PropTypes.string,
  message: PropTypes.string,
};

LoadIndicator.defaultProps = {
  className: null,
  message: null,
};
