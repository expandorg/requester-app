import React, { Component } from 'react';

import Hero from '../../../shared/Hero';

import styles from './Payout.module.styl';

export default class Payout extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Hero className={styles.hero} value={200} title="payout" />
        <Hero className={styles.hero} value={0.15} title="earned per task" />
      </div>
    );
  }
}
