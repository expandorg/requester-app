import React, { Component } from 'react';

import Hero from '../../../shared/Hero';
import { draftProps } from '../../../shared/propTypes';

import styles from './Payout.module.styl';

export default class Payout extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
  };

  render() {
    const { draft } = this.props;
    const pay =
      (draft.logic && draft.logic.funding && draft.logic.funding.requirement) ||
      '--';
    const earned =
      (draft.logic && draft.logic.funding && draft.logic.funding.reward) ||
      '--';
    return (
      <div className={styles.container}>
        <Hero className={styles.hero} value={pay} title="payout" />
        <Hero className={styles.hero} value={earned} title="earned per task" />
      </div>
    );
  }
}
