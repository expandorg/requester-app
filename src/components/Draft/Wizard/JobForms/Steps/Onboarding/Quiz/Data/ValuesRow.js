import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Table as T, Checkbox } from '@expandorg/components';

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
    selected: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeAnswer: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  handlSelect = () => {
    const { onSelect, index } = this.props;
    onSelect(index);
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
    const { row, columns, selected } = this.props;

    /* eslint-disable react/no-array-index-key */
    return (
      <T.Row className={styles.row}>
        <T.Cell className={styles.leftCell}>
          <Checkbox value={selected} onChange={this.handlSelect} />
        </T.Cell>
        {row.values.map((value, index) => {
          const col = columns[index];
          return (
            <Value
              key={index}
              value={value}
              columnIndex={index}
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
