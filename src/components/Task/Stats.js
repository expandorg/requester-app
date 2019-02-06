import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import Hero from '../shared/Hero';

import { taskStatsProps } from '../shared/propTypes';

import { LoadIndicator } from '../Draft/Wizard/Form';

import Title from './Title';

import styles from './Stats.module.styl';

export default class Stats extends Component {
  static propTypes = {
    taskStats: taskStatsProps,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: false,
    taskStats: null,
  };

  render() {
    const { taskStats, isLoading } = this.props;
    const title = (taskStats && taskStats.title) || '';
    return (
      <Page
        title={title}
        sidebar={false}
        navbar={false}
        footer={false}
        className={styles.content}
      >
        <Navbar
          title={<Title stats={taskStats} />}
          top={false}
          logout={false}
        />
        <LoadIndicator isLoading={isLoading}>
          {taskStats && (
            <div className={styles.container}>
              <div className={styles.info}>
                <div className={styles.details}>{taskStats.description}</div>
                <div className={styles.action}>
                  <Button className={styles.button}>Download CSV</Button>
                </div>
              </div>
              <div className={styles.stats}>
                <Hero className={styles.hero} value={1} title="results" />
                <Hero className={styles.hero} value="2h38m" title="deadline" />
                <Hero className={styles.hero} value={918} title="workers" />
                <Hero className={styles.hero} value={2} title="warnings" />
              </div>
            </div>
          )}
        </LoadIndicator>
      </Page>
    );
  }
}
