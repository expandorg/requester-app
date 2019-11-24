import React, { Component } from 'react';
import PropTypes from 'prop-types';

import parse from 'date-fns/parse';

import { Table as T } from '@expandorg/components';

import { formatDate } from '../../../model/i18n';

import styles from './Row.module.styl';

export default class Row extends Component {
  static propTypes = {
    report: PropTypes.shape({
      userId: PropTypes.string,
      message: PropTypes.string,
      reason: PropTypes.string,
      createdAt: PropTypes.string,
    }).isRequired,
  };

  render() {
    const { report } = this.props;

    return (
      <T.Row>
        <T.Cell className={styles.cell}>{report.userId}</T.Cell>
        <T.Cell className={styles.cell}>{report.message}</T.Cell>
        <T.Cell className={styles.cell}>{report.reason}</T.Cell>
        <T.Cell className={styles.cell}>
          {formatDate(parse(report.createdAt))}
        </T.Cell>
        <T.Cell className={styles.cell} />
      </T.Row>
    );
  }
}
