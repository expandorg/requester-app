import React, { Component } from 'react';

import { JobLogo } from '@expandorg/components/app';
import { Fieldset } from '../controls';
import { draftProps } from '../../shared/propTypes';
import { EndType } from '../../../model/enums';
import { formatDate /* EndWhenTitles */ } from '../../../model/i18n';

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
                  <JobLogo
                    src={draft.logo}
                    className={styles.img}
                    size="large"
                    name={draft.name}
                  />
                </div>
              </div>
            </div>
            <div className={styles.settings}>
              {/* <div className={styles.filed}>
                <div className={styles.name}>End when</div>
                <div className={styles.value}>
                  {EndWhenTitles[draft.endWhen]}
                </div>
              </div> */}
              {draft.endWhen === EndType.Date && (
                <div className={styles.filed}>
                  <div className={styles.name}>End Date</div>
                  <div className={styles.value}>
                    {formatDate(draft.endDate)}
                  </div>
                </div>
              )}
              {draft.endWhen === EndType.ResultCount && (
                <div className={styles.filed}>
                  <div className={styles.name}>End Result Count</div>
                  <div className={styles.value}>{draft.endResultCount}</div>
                </div>
              )}
              {/* <div className={styles.filed}>
                <div className={styles.name}>HITs</div>
                <div className={styles.value}>200</div>
              </div> */}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.title}>{draft.name}</div>
            <div className={styles.description}>{draft.description}</div>
          </div>
        </Fieldset>
      </div>
    );
  }
}
