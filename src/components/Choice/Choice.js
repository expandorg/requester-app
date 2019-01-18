import React, { Component } from 'react';
import cn from 'classnames';

import { ReactComponent as Icon } from '../assets/preview.svg';

import Navbar from '../shared/Navbar';

import styles from './Choice.module.styl';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default class Choice extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Navbar
          title="Getting Started"
          theme="dark"
          logout={false}
          top={false}
        />
        <div className={styles.content}>
          <div className={styles.panel}>
            <div className={styles.header}>Choose a role.</div>
            <div className={styles.options}>
              <div className={styles.option}>
                <div className={styles.icon}>
                  <Icon width="144" height="144" viewBox="0 0 64 48" />
                </div>
                <div className={styles.actions}>
                  <a href="#" className={cn('gem-button', styles.link)}>
                    Requester
                  </a>
                </div>
              </div>
              <div className={styles.option}>
                <div className={styles.icon}>
                  <Icon width="144" height="144" viewBox="0 0 64 48" />
                </div>
                <div className={styles.actions}>
                  <a href="#" className={cn('gem-button', styles.link)}>
                    Worker
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
