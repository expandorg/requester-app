/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'date-fns';

import { Table as T } from '@expandorg/components';
import { ReactComponent as JsIcon } from './js.svg';
import { ReactComponent as TableIcon } from './table.svg';

import JsonPreview from './JsonPreview';
import TablePreview from './TablePreview';
import { formatDate } from '../../../model/i18n';

import styles from './Row.module.styl';

export default class Row extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    preview: PropTypes.bool,
    mode: PropTypes.oneOf(['table', 'json']).isRequired,
    response: PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.array,
      worker_id: PropTypes.number,
      created_at: PropTypes.string,
    }).isRequired,
    onSelectValue: PropTypes.func,
  };

  static defaultProps = {
    preview: true,
    onSelectValue: Function.prototype,
  };

  state = {
    json: false,
    table: false,
  };

  handleTableOver = () => {
    const { preview } = this.props;
    if (preview) {
      this.setState({ table: true });
    }
  };

  handleTableOut = () => {
    const { preview } = this.props;
    if (preview) {
      this.setState({ table: false });
    }
  };

  handleJsonOver = () => {
    const { preview } = this.props;
    if (preview) {
      this.setState({ json: true });
    }
  };

  handleJsonOut = () => {
    const { preview } = this.props;
    if (preview) {
      this.setState({ json: false });
    }
  };

  handleValueClick = () => {
    const { onSelectValue, index } = this.props;
    if (onSelectValue) {
      onSelectValue(index);
    }
  };

  render() {
    const { response, mode } = this.props;
    const { json, table } = this.state;
    return (
      <T.Row>
        <T.Cell className={styles.cell}>{response.id}</T.Cell>
        <T.Cell className={styles.valueCell}>
          {mode === 'table' && (
            <button
              className={styles.button}
              onMouseOver={this.handleTableOver}
              onMouseOut={this.handleTableOut}
              onClick={this.handleValueClick}
            >
              <TableIcon />
            </button>
          )}
          {mode === 'json' && (
            <button
              className={styles.button}
              onMouseOver={this.handleJsonOver}
              onMouseOut={this.handleJsonOut}
              onClick={this.handleValueClick}
            >
              <JsIcon />
            </button>
          )}
          {json && (
            <JsonPreview
              value={response.value}
              className={styles.jsonPreview}
            />
          )}
          {table && (
            <TablePreview
              value={response.value}
              className={styles.tablePreview}
            />
          )}
        </T.Cell>
        <T.Cell className={styles.cell}>{response.worker_id}</T.Cell>
        <T.Cell className={styles.cell}>
          {formatDate(parse(response.created_at))}
        </T.Cell>
      </T.Row>
    );
  }
}
