/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'date-fns';

import { Table as T } from '@expandorg/components';
import { ReactComponent as JsIcon } from './js.svg';
import { ReactComponent as TableIcon } from './table.svg';

import { formatDate } from '../../../model/i18n';

import styles from './Row.module.styl';

export default class Row extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    response: PropTypes.shape({}).isRequired,
    onSelectValue: PropTypes.func.isRequired,
  };

  state = {
    json: false,
    table: false,
  };

  handleTableOver = () => {
    this.setState({ table: true });
  };

  handleTableOut = () => {
    this.setState({ table: false });
  };

  handleTableClick = () => {
    const { onSelectValue, index } = this.props;
    onSelectValue(index, 'table');
  };

  handleJsonOver = () => {
    this.setState({ json: true });
  };

  handleJsonOut = () => {
    this.setState({ json: false });
  };

  handleJsonClick = () => {
    const { onSelectValue, index } = this.props;
    onSelectValue(index, 'json');
  };

  render() {
    const { response } = this.props;
    const { json, table } = this.state;
    return (
      <T.Row>
        <T.Cell className={styles.cell}>{response.id}</T.Cell>
        <T.Cell className={styles.valueCell}>
          <button
            className={styles.button}
            onMouseOver={this.handleTableOver}
            onMouseOut={this.handleTableOut}
            onClick={this.handleTableClick}
          >
            <TableIcon />
          </button>
          <button
            className={styles.button}
            onMouseOver={this.handleJsonOver}
            onMouseOut={this.handleJsonOut}
            onClick={this.handleJsonClick}
          >
            <JsIcon />
          </button>
          {json && (
            <div className={styles.jsonPreview}>
              {JSON.stringify(response.value, undefined, 2)}
            </div>
          )}
          {table && <div className={styles.tablePreview} />}
        </T.Cell>
        <T.Cell className={styles.cell}>{response.worker_id}</T.Cell>
        <T.Cell className={styles.cell}>
          {formatDate(parse(response.created_at))}
        </T.Cell>
      </T.Row>
    );
  }
}
