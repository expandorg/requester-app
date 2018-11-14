import React, { Component } from 'react';

import { Fieldset } from '../Form';
import { draftProps } from '../../../shared/propTypes';

import styles from './Settings.module.styl';

export default class Settings extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
  };

  render() {
    const { draft } = this.props;
    return (
      <div className={styles.container}>
        <Fieldset>
          <div className={styles.columns}>
            <div className={styles.thumbnail}>
              <div className={styles.filed}>
                <div className={styles.name}>Thumbnail</div>
                <div className={styles.logo}>
                  <img
                    src={draft.logoUrl}
                    className={styles.img}
                    alt={draft.title}
                  />
                </div>
              </div>
            </div>
            <div className={styles.settings}>
              <div className={styles.filed}>
                <div className={styles.name}>Start Date</div>
                <div className={styles.value}>
                  {draft.startDate || '--/--/--'}
                </div>
              </div>
              <div className={styles.filed}>
                <div className={styles.name}>End Date</div>
                <div className={styles.value}>
                  {draft.endDate || '--/--/--'}
                </div>
              </div>
              <div className={styles.filed}>
                <div className={styles.name}>HITs</div>
                <div className={styles.value}>200</div>
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.title}>{draft.title}</div>
            <div className={styles.description}>{draft.description}</div>
          </div>
        </Fieldset>
      </div>
    );
  }
}
