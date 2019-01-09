import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { replaceAtIndex } from '@expandorg/utils';
import { dataProps } from '../propTypes';

import Column from './Column';
import ValuesRow from './ValuesRow';
import Value from './Value';

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

  constructor(props) {
    super(props);

    this.state = {
      original: props.data,
    };
  }

  static getDerivedStateFromProps({ data, isFetching }, state) {
    if (!isFetching && data && data.values.length && data !== state.original) {
      return {
        original: data,
      };
    }
    return null;
  }

  handleChangeColumn = (column, index, isSkip) => {
    const { data, onChangeColumns, readOnly } = this.props;
    if (!readOnly) {
      onChangeColumns(replaceAtIndex(data.columns, index, column), isSkip);
    }
  };

  render() {
    const { data, className, readOnly, isFetching } = this.props;
    const { original } = this.state;
    if (!data) {
      return null;
    }

    const { columns, values } = data;

    const array = isFetching && !values.length ? original.values : values;

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
          {array.map((row, i) => (
            <ValuesRow
              key={i}
              className={cn({
                [styles.fetching]: isFetching && !values.length,
              })}
            >
              {row.map((val, j) => (
                <Value key={j}>{val}</Value>
              ))}
            </ValuesRow>
          ))}
        </div>
      </div>
    );
  }
}
