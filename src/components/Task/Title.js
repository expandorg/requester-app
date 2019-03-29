import React, { Component } from 'react';
import cn from 'classnames';

import { taskStatsProps } from '../shared/propTypes';
import { DraftStatusTitles } from '../../model/i18n';

import styles from './Title.module.styl';

export default class Title extends Component {
  static propTypes = {
    stats: taskStatsProps,
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
        {stats.title}
        <span className={cn(styles.state, styles[stats.state])}>
          {DraftStatusTitles[stats.state]}
        </span>
      </div>
    );
  }
}
