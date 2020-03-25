import React from 'react';

import { Fieldset } from '../controls';
import { draftProps } from '../../shared/propTypes';

import styles from './Whitelist.module.styl';

export default function Whitelist({ draft }) {
  return (
    <div className={styles.container}>
      <Fieldset>
        {draft.whitelist &&
          draft.whitelist.map((condition) => (
            <div key={condition.id} className={styles.condition}>
              <span className={styles.param}>{condition.param}</span>
              <span className={styles.op}>{condition.op}</span>
              <span className={styles.value}>{condition.value}</span>
            </div>
          ))}
      </Fieldset>
    </div>
  );
}

Whitelist.propTypes = {
  draft: draftProps.isRequired,
};
