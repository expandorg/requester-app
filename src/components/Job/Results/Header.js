import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Table as T, Switch } from '@expandorg/components';

import styles from './Header.module.styl';

export default function Header({ mode, onToggle }) {
  const toggle = useCallback(
    () => onToggle(mode === 'json' ? 'table' : 'json'),
    [mode, onToggle]
  );

  return (
    <T.Header className={styles.header}>
      <T.HeaderCell className={styles.id}>Item Id</T.HeaderCell>
      <T.HeaderCell className={styles.cell}>
        <div className={styles.toggle}>
          <div>{mode === 'json' ? 'JSON Result' : 'Tabular Result'}</div>
          <Switch value={mode === 'json'} onChange={toggle} />
        </div>
      </T.HeaderCell>
      <T.HeaderCell className={styles.cell}>Worker Id</T.HeaderCell>
      <T.HeaderCell className={styles.cell}>Date</T.HeaderCell>
      <T.HeaderCell className={styles.cell}>Status</T.HeaderCell>
    </T.Header>
  );
}

Header.propTypes = {
  mode: PropTypes.oneOf(['json', 'table']).isRequired,
  onToggle: PropTypes.func.isRequired,
};
