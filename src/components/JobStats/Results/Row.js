/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import parse from 'date-fns/parse';

import { Table as T } from '@expandorg/components';

import JsonPreview from './Preview/JsonPreview';
import TablePreview from './Preview/TablePreview';
import { formatDate } from '../../../model/i18n';

import styles from './Row.module.styl';

export default class Row extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(['table', 'json']).isRequired,
    response: PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.array,
      worker_id: PropTypes.number,
      created_at: PropTypes.string,
    }).isRequired,
  };

  render() {
    const { response, mode } = this.props;
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
      </T.Row>
    );
  }
}
