import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Content from '../shared/Content';
import Navbar from '../shared/Navbar';
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
      <Content
        title={title}
        sidebar={false}
        navbar={false}
        className={styles.content}
      >
        <Navbar title={<Title stats={taskStats} />} top={false} />
        <LoadIndicator isLoading={isLoading}>
          <div />
        </LoadIndicator>
      </Content>
    );
  }
}
