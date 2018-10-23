import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Column from './Column';

import styles from './Table.module.styl';

export default class Table extends Component {
  static propTypes = {
    data: PropTypes.shape({
      columns: PropTypes.arrayOf(PropTypes.object).isRequired,
      values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
    }).isRequired,
  };

  render() {
    const {
      data: { columns, values },
    } = this.props;

    /* eslint-disable react/no-array-index-key */

    return (
      <div className={styles.table}>
        <div className={styles.header}>
          {columns.map((column, index) => (
            <Column column={column} key={index} />
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
