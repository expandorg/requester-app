import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';

import { jobStatsProps } from '../shared/propTypes';

import { LoadIndicator } from '../Draft/Wizard/Form';

import Title from './Title';

import styles from './Stats.module.styl';

export default class Stats extends Component {
  static propTypes = {
    stats: jobStatsProps,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: false,
    stats: null,
  };

  render() {
    const { stats, isLoading } = this.props;
    const title = (stats && stats.job.name) || '';
    return (
      <Page
        title={title}
        sidebar={false}
        navbar={false}
        footer={false}
        className={styles.content}
      >
        <Navbar title={<Title stats={stats} />} top={false} logout={false} />
        <LoadIndicator isLoading={isLoading}>
          {stats && (
            <div className={styles.container}>
              <div className={styles.info}>
                <div className={styles.details}>{stats.job.description}</div>
                <div className={styles.action}>
                  <Button className={styles.button}>Download CSV</Button>
                </div>
              </div>
              <div className={styles.stats}>
                <Hero
                  className={styles.hero}
                  value={stats.accepted}
                  title="results"
                />
                <Hero
                  className={styles.hero}
                  value={stats.workers}
                  title="workers"
                />
                <Hero className={styles.hero} value={0} title="warnings" />
              </div>
            </div>
          )}
        </LoadIndicator>
      </Page>
    );
  }
}
