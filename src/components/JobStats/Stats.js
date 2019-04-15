import React, { Component } from 'react';
import cn from 'classnames';

import { JobLogo } from '@expandorg/components/app';

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
      'gem-button-me',
      styles.download
    );
    const dlLink = `${settings.apiUrl}/jobs/${stats.job.id}/responses/csv`;
    console.log(stats);

    return (
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.details}>
            <div className={styles.logo}>
              <JobLogo
                src={stats.job.logo}
                className={styles.img}
                size="large"
                name={stats.job.name}
              />
            </div>
            <div className={styles.props}>
              <div className={styles.name}>{stats.job.name}</div>
              <div className={styles.descriptions}>{stats.job.description}</div>
              <div className={styles.status}>in progress</div>
            </div>
          </div>
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
