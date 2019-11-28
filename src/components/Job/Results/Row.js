/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import parse from 'date-fns/parse';

import { Table as T } from '@expandorg/components';

import JsonPreview from './Preview/JsonPreview';
import TablePreview from './Preview/TablePreview';
import { ReactComponent as AcceptedIcon } from './accepted.svg';

import { formatDate } from '../../../model/i18n';

import styles from './Row.module.styl';

export default function Row({ response, mode }) {
  return (
    <T.Row>
      <T.Cell className={cn(styles.cell, styles.id)}>{response.id}</T.Cell>
      <T.Cell className={styles.value}>
        {mode === 'json' && <JsonPreview value={response.value} />}
        {mode === 'table' && <TablePreview value={response.value} />}
      </T.Cell>
      <T.Cell className={styles.cell}>{response.worker_id}</T.Cell>
      <T.Cell className={styles.cell}>
        {formatDate(parse(response.created_at))}
      </T.Cell>
      <T.Cell className={cn(styles.cell, styles.statusCell)}>
        {!response.is_accepted && <AcceptedIcon />}
        {/* <button className={styles.verify}>verify</button> */}
      </T.Cell>
    </T.Row>
  );
}

Row.propTypes = {
  mode: PropTypes.oneOf(['table', 'json']).isRequired,
  response: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.object,
    worker_id: PropTypes.number,
    created_at: PropTypes.string,
    is_accepted: PropTypes.bool,
  }).isRequired,
};
