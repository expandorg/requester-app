import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { RequestStates } from '@gemsorg/app-utils';

import styles from './ProgressIndicator.module.styl';

export default class ProgressIndicator extends Component {
  static propTypes = {
    uploadState: PropTypes.string.isRequired,
    progress: PropTypes.number,
    className: PropTypes.string,
  };

  static defaultProps = {
    progress: 0,
    className: null,
  };

  render() {
    const { uploadState, progress, className, children } = this.props;

    const progressClasses = cn(styles.progress, {
      [styles.fetching]: uploadState === RequestStates.Fetching,
      [styles.fetched]: uploadState === RequestStates.Fetched,
      [styles.error]: uploadState === RequestStates.FetchError,
    });

    const width = `${Math.floor(progress * 100)}%`;
    const opacity = Math.min(progress * 10, 1);

    return (
      <div className={cn(styles.container, className)}>
        <div className={progressClasses} style={{ width }}>
          <div className={styles.percent} style={{ opacity }}>
            {Math.ceil(progress * 100)}%
          </div>
        </div>
        {children}
      </div>
    );
  }
}
