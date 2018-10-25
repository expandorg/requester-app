import React, { Component } from 'react';

import { Fieldset } from '../Form';

import styles from './Settings.module.styl';

export default class Settings extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Fieldset>
          <div className={styles.columns}>
            <div className={styles.thumbnail}>
              <div className={styles.filed}>
                <div className={styles.name}>Thumbnail</div>
                <div className={styles.logo}>
                  <img
                    src="/images/yc.png"
                    className={styles.img}
                    alt="Thumbnail"
                  />
                </div>
              </div>
            </div>
            <div className={styles.settings}>
              <div className={styles.filed}>
                <div className={styles.name}>Start Date</div>
                <div className={styles.value}>29/10/2018</div>
              </div>
              <div className={styles.filed}>
                <div className={styles.name}>End Date</div>
                <div className={styles.value}>30/10/2018</div>
              </div>
              <div className={styles.filed}>
                <div className={styles.name}>HITs</div>
                <div className={styles.value}>200</div>
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.title}>Task Title</div>
            <div className={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </Fieldset>
      </div>
    );
  }
}
