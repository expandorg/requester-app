import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'date-fns';

import { Table as T } from '@expandorg/components';

import { formatDate } from '../../../model/i18n';

import styles from './Row.module.styl';

export default class Row extends Component {
  static propTypes = {
    report: PropTypes.shape({}).isRequired,
  };

  render() {
    const { report } = this.props;

    return (
      <T.Row>
        <T.Cell className={styles.cell}>{report.worker_id}</T.Cell>
        <T.Cell className={styles.cell}>{report.question}</T.Cell>
        <T.Cell className={styles.cell}>{report.reason}</T.Cell>
        <T.Cell className={styles.cell}>
          {formatDate(parse(report.created_at))}
        </T.Cell>
        <T.Cell className={styles.cell} />
      </T.Row>
    );
  }
}
