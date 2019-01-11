import React, { Component } from 'react';

import Content from '../shared/Content';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';

import Hero from '../shared/Hero';

import styles from './Stats.module.styl';

export default class Stats extends Component {
  render() {
    const pending = 18;
    const accepted = 20;
    const rejected = 5;
    return (
      <Content title="Stats">
        <Navbar title="Stats" />
        <Sidebar />
        <div className={styles.container}>
          <div className={styles.content}>
            <Hero value={pending} title="Pending" className={styles.item} />
            <Hero value={accepted} title="Accepted" className={styles.item} />
            <Hero value={rejected} title="Rejected" className={styles.item} />
          </div>
        </div>
      </Content>
    );
  }
}
