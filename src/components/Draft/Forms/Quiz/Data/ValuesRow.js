import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Table as T } from '@expandorg/components';
import { ReactComponent as Remove } from '../../../../../assets/remove_circle.svg';

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
    onChange: PropTypes.func.isRequired,
    onChangeAnswer: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    onDelete: null,
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
    const { row, columns, onDelete, index } = this.props;

    /* eslint-disable react/no-array-index-key */
    return (
      <T.Row className={styles.row}>
        <T.Cell className={styles.leftCell}>
          {onDelete && (
            <button
              className={styles.removeBtn}
              onClick={() => onDelete(index)}
            >
              <Remove />
            </button>
          )}
        </T.Cell>
        {row.values.map((value, ix) => {
          const col = columns[ix];
          return (
            <Value
              key={ix}
              value={value}
              columnIndex={ix}
              type={col.type}
              placeholder={col.name}
              onChange={this.handleChange}
            />
          );
        })}
        <Value
          answer
          placeholder="Answer"
          value={row.answer}
          onChange={this.handleChangeAnswer}
        />
        <td />
      </T.Row>
    );
  }
}
