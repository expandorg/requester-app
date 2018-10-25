import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { replaceAtIndex } from '@gemsorg/utils/src/immutable';

import Column from './Column';

import styles from './DataTable.module.styl';

export default class DataTable extends Component {
  static propTypes = {
    data: PropTypes.shape({
      columns: PropTypes.arrayOf(PropTypes.object).isRequired,
      values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
    }).isRequired,
    className: PropTypes.string,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    className: null,
    readOnly: false,
    onChange: Function.prototype,
  };

  handleChange = (column, index) => {
    const {
      data: { columns, values },
      onChange,
      readOnly,
    } = this.props;
    if (!readOnly) {
      onChange({ values, columns: replaceAtIndex(columns, index, column) });
    }
  };

  render() {
    const {
      data: { columns, values },
      className,
      readOnly,
    } = this.props;

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
              onChange={this.handleChange}
            />
          ))}
        </div>
        <div className={styles.tbody}>
          {values.map((row, i) => (
            <div key={i} className={styles.row}>
              {row.map((val, j) => (
                <div key={j} className={styles.cell}>
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
