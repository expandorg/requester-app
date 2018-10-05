import React, { Component } from 'react';

import Content from '../shared/Content';

import styles from './Dashboard.module.styl';

export default class Dashboard extends Component {
  render() {
    return (
      <Content title="Dashboard">
        <div className={styles.container}>Dashboard</div>
      </Content>
    );
  }
}
