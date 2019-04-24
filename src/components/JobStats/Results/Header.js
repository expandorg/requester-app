import React from 'react';
import PropTypes from 'prop-types';

import { Table as T, Switch } from '@expandorg/components';

import styles from './JobResults.module.styl';

export default function Header({ mode, onToggle }) {
  return (
    <T.Header className={styles.header}>
      <T.HeaderCell className={styles.headerCell}>Item Id</T.HeaderCell>
      <T.HeaderCell className={styles.headerCell}>
        <div className={styles.toggleCell}>
          <div>{mode === 'json' ? 'JSON Result' : 'Tabular Result'}</div>
          <Switch
            value={mode === 'json'}
            onChange={() => onToggle(mode === 'json' ? 'table' : 'json')}
          />
        </div>
      </T.HeaderCell>
      <T.HeaderCell className={styles.headerCell}>Worker Id</T.HeaderCell>
      <T.HeaderCell className={styles.headerCell}>Date</T.HeaderCell>
    </T.Header>
  );
}

Header.propTypes = {
  mode: PropTypes.oneOf(['json', 'table']).isRequired,
  onToggle: PropTypes.func.isRequired,
};
