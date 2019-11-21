import React, { Component } from 'react';

import { Panel } from '@expandorg/components';
import { Navbar } from '@expandorg/components/app';

import I from '../common/I';

import { Page, Sidebar } from '../shared/Page';

import Hero from '../shared/Hero';

import styles from './Stats.module.styl';

export default class Stats extends Component {
  render() {
    const pending = 18;
    const accepted = 20;
    const rejected = 5;

    return (
      <Page title="Stats">
        <Navbar title="Stats" />
        <Sidebar />
        <div className={styles.container}>
          <Panel className={styles.panel}>
            <Hero
              value={pending}
              title={
                <div className={styles.pendingTitle}>
                  Pending
                  <I
                    tooltip="Tasks are pending acceptance."
                    tooltipPosition="right"
                    tooltipOrientation="right"
                    className={styles.i}
                  />
                </div>
              }
              className={styles.item}
            />
            <Hero value={accepted} title="Accepted" className={styles.item} />
            <Hero value={rejected} title="Rejected" className={styles.item} />
          </Panel>
        </div>
      </Page>
    );
  }
}
