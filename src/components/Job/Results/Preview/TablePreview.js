import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Table as T } from '@expandorg/components';

import styles from './TablePreview.module.styl';

const Value = (value) => {
  if (typeof value === 'object') {
    return JSON.stringify(value, undefined, 2);
  }
  return value;
};

export default function TablePreview({ value, className }) {
  const keys = Reflect.ownKeys(value);
  return (
    <div className={cn(styles.container, className)}>
      <T.Table>
        <T.Header className={styles.header}>
          {keys.map((key) => (
            <T.HeaderCell key={key} className={styles.headerCell}>
              {key}
            </T.HeaderCell>
          ))}
        </T.Header>
        <T.Row className={styles.row}>
          {keys.map((key) => (
            <T.Cell key={key} className={styles.cell}>
              {Value(value[key])}
            </T.Cell>
          ))}
        </T.Row>
      </T.Table>
    </div>
  );
}

TablePreview.propTypes = {
  value: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
};

TablePreview.defaultProps = {
  className: null,
};
