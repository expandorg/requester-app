import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Table as T } from '@expandorg/components';

import Value from './Value';

import styles from './DataTable.module.styl';

export default class ValuesRow extends PureComponent {
  static propTypes = {
    row: PropTypes.shape({
      answer: PropTypes.string,
      values: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool,
        ])
      ),
    }).isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    index: PropTypes.number.isRequired,
    readOnly: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeAnswer: PropTypes.func.isRequired,
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

  handleChangeAnswer = (_, value) => {
    const { onChangeAnswer, index } = this.props;
    onChangeAnswer(index, value);
  };

  render() {
    const { row, readOnly, columns } = this.props;

    /* eslint-disable react/no-array-index-key */
    return (
      <T.Row className={styles.row}>
        {row.values.map((value, index) => (
          <Value
            key={index}
            value={value}
            columnIndex={index}
            type={columns[index].type}
            readOnly={readOnly}
            onChange={this.handleChange}
          />
        ))}
        <Value
          readOnly={readOnly}
          value={row.answer}
          onChange={this.handleChangeAnswer}
        />
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
