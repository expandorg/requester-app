import React, { Component } from 'react';
import cn from 'classnames';

import { Navbar } from '@expandorg/components/app';

import styles from './Choice.module.styl';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default class Choice extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Navbar title="Getting Started" theme="dark" top={false} />
        <div className={styles.content}>
          <div className={styles.panel}>
            <div className={styles.header}>Choose a role.</div>
            <div className={styles.options}>
              <a href="#" className={cn('gem-button', styles.link)}>
                Requester
              </a>
              <div className={styles.spacer}>
                <div className={styles.or}>or</div>
              </div>
              <a href="#" className={cn('gem-button', styles.link)}>
                Worker
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
