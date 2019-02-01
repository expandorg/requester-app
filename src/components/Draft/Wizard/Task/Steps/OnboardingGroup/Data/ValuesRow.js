import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Row, Cell } from '../../../../../../common/Table';

import Value from './Value';

import styles from './Data.module.styl';

export default class ValuesRow extends PureComponent {
  static propTypes = {
    row: PropTypes.arrayOf(
      PropTypes.oneOfType(PropTypes.string, PropTypes.number)
    ).isRequired,
    index: PropTypes.number.isRequired,
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
    const { row } = this.props;
    return (
      <Row classname={styles.row}>
        {row.map((value, index) => (
          <Value value={value} column={index} onChange={this.handleChange} />
        ))}
        <Cell className={styles.cellDelete}>
          <button className={styles.delete} onClick={this.handleDelete}>
            ✕
          </button>
        </Cell>
      </Row>
    );
  }
}
