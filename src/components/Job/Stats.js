import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { JobLogo } from '@expandorg/components/app';
import { Button, useToggle } from '@expandorg/components';

import Hero from '../shared/Hero';

import ShareDialog from './ShareDialog';
import settings from '../../common/settings';

import { jobStatsProps } from '../shared/propTypes';

import styles from './Stats.module.styl';

export default function Stats({ stats, reports, onVerify }) {
  const [share, toggleShare] = useToggle(false);
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.details}>
          <div className={styles.logo}>
            <JobLogo
              name={stats.job.name}
              className={styles.img}
              size="large"
            />
          </div>
          <div className={styles.props}>
            <div className={styles.name}>{stats.job.name}</div>
            <div className={styles.status}>in progress</div>
          </div>
        </div>
        <div className={styles.links}>
          {true && (
            <Button
              className={styles.share}
              size="small"
              theme="white-blue"
              onClick={toggleShare}
            >
              Share
            </Button>
          )}
          <a
            href={`${settings.apiUrl}/jobs/${stats.job.id}/responses/csv`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'gem-button',
              'gem-button-primary',
              'gem-button-small',
              styles.download
            )}
          >
            Download CSV
          </a>
        </div>
      </div>
      <div className={styles.stats}>
        <Hero className={styles.hero} value={stats.accepted} title="results" />
        <Hero className={styles.hero} value={stats.workers} title="workers" />
        <Hero className={styles.hero} value={reports} title="Reports" />
        <Hero
          className={cn(styles.hero, styles.pending)}
          value={stats.pending || 0}
          title="Awaiting verification"
        />
      </div>
      {!!(stats.pending || 0) && (
        <div className={styles.verify}>
          <Button size="small" theme="white-blue" onClick={onVerify}>
            You have {stats.pending} responses awaiting verification for this
            job
          </Button>
        </div>
      )}
      <ShareDialog visible={share} onHide={toggleShare} jobId={stats.job.id} />
    </div>
  );
}

Stats.propTypes = {
  stats: jobStatsProps.isRequired,
  reports: PropTypes.number.isRequired,
  onVerify: PropTypes.func.isRequired,
};
