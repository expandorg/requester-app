import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Table as T } from '@expandorg/components';

import Value from './Value';

import styles from './DataTable.module.styl';

export default class ValuesRow extends PureComponent {
  static propTypes = {
    row: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired,
    index: PropTypes.number.isRequired,
    readOnly: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  handleDelete = () => {
    const { onDelete, index } = this.props;
    onDelete(index);
  };

  handleChange = (column, value) => {
    const { onChange, index } = this.props;
    onChange(index, column, value);
  };

  render() {
    const { row, readOnly } = this.props;

    /* eslint-disable react/no-array-index-key */
    return (
      <T.Row className={styles.row}>
        {row.map((value, index) => (
          <Value
            key={index}
            value={value}
            column={index}
            readOnly={readOnly}
            onChange={this.handleChange}
          />
        ))}
        {!readOnly && (
          <T.Cell className={styles.cellDelete}>
            <button className={styles.delete} onClick={this.handleDelete}>
              ✕
            </button>
          </T.Cell>
        )}
      </T.Row>
    );
  }
}
