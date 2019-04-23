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
    response: PropTypes.shape({}).isRequired,
  };

  state = {
    json: false,
  };

  handleJsonOver = () => {
    this.setState({ json: true });
  };

  handleJsonOut = () => {
    this.setState({ json: false });
  };

  render() {
    const { response } = this.props;
    const { json } = this.state;
    return (
      <T.Row>
        <T.Cell className={styles.cell}>{response.id}</T.Cell>
        <T.Cell className={styles.valueCell}>
          <button className={styles.button} onClick={this.handleToggleTable}>
            <TableIcon />
          </button>
          <button
            className={styles.button}
            onMouseOver={this.handleJsonOver}
            onMouseOut={this.handleJsonOut}
          >
            <JsIcon />
          </button>
          {json && (
            <div className={styles.jsonPreview}>
              {JSON.stringify(response.value, undefined, 2)}
            </div>
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
