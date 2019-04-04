import React, { Component } from 'react';
import cn from 'classnames';

import Hero from '../shared/Hero';
import settings from '../../common/settings';

import { jobStatsProps } from '../shared/propTypes';

import styles from './Stats.module.styl';

export default class Stats extends Component {
  static propTypes = {
    stats: jobStatsProps.isRequired,
  };

  render() {
    const { stats } = this.props;

    const dlClasses = cn(
      'gem-button',
      'gem-button-primary',
      'gem-button-small',
      styles.download
    );
    const dlLink = `${settings.apiUrl}/jobs/${stats.job.id}/responses/csv`;

    return (
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.details}>{stats.job.description}</div>
          <a
            href={dlLink}
            target="_blank"
            rel="noopener noreferrer"
            className={dlClasses}
          >
            Download CSV
          </a>
        </div>
        <div className={styles.stats}>
          <Hero
            className={styles.hero}
            value={stats.accepted}
            title="results"
          />
          <Hero className={styles.hero} value={stats.workers} title="workers" />
          <Hero className={styles.hero} value={0} title="warnings" />
        </div>
      </div>
    );
  }
}
