import React, { Component } from 'react';
import cn from 'classnames';

import { jobStatsProps } from '../shared/propTypes';

import styles from './Title.module.styl';

export default class Title extends Component {
  static propTypes = {
    stats: jobStatsProps,
  };

  static defaultProps = {
    stats: null,
  };

  render() {
    const { stats } = this.props;
    if (!stats) {
      return null;
    }
    return (
      <div className={styles.title}>
        {stats.job.name}
        <span className={cn(styles.state, styles[stats.state])}>
          {'In progress'}
        </span>
      </div>
    );
  }
}
