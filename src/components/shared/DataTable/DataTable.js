import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { replaceAtIndex } from '@gemsorg/utils/src/immutable';
import { dataProps } from '../propTypes';

import Column from './Column';
import ValuesRow from './ValuesRow';
import Value from './Value';
import Loading from './Loading';

import styles from './DataTable.module.styl';

export default class DataTable extends Component {
  static propTypes = {
    data: dataProps,
    isFetching: PropTypes.bool,
    className: PropTypes.string,
    readOnly: PropTypes.bool,
    onChangeColumns: PropTypes.func,
  };

  static defaultProps = {
    data: null,
    isFetching: false,
    className: null,
    readOnly: false,
    onChangeColumns: Function.prototype,
  };

  handleChangeColumn = (column, index) => {
    const { data, onChangeColumns, readOnly } = this.props;
    if (!readOnly) {
      onChangeColumns(replaceAtIndex(data.columns, index, column));
    }
  };

  render() {
    const { data, className, readOnly, isFetching } = this.props;
    if (!data) {
      return null;
    }

    const { columns, values } = data;

    /* eslint-disable react/no-array-index-key */
    return (
      <div className={cn(styles.table, className)}>
        <div className={styles.header}>
          {columns.map((column, index) => (
            <Column
              column={column}
              key={index}
              readOnly={readOnly}
              index={index}
              onChange={this.handleChangeColumn}
            />
          ))}
        </div>
        <div className={styles.tbody}>
          {!isFetching &&
            values.map((row, i) => (
              <ValuesRow key={i}>
                {row.map((val, j) => (
                  <Value key={j}>{val}</Value>
                ))}
              </ValuesRow>
            ))}
          {isFetching && <Loading columns={columns.length} />}
        </div>
      </div>
    );
  }
}
