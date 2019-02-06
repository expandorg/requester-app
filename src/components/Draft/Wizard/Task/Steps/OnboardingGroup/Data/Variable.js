import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Table as T } from '@expandorg/components';

import styles from './DataTable.module.styl';

export default class Variable extends Component {
  static propTypes = {
    column: PropTypes.shape({
      name: PropTypes.string,
      isAnswer: PropTypes.bool,
    }).isRequired,
    index: PropTypes.number.isRequired,
    readOnly: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = ({ target }) => {
    const { onChange, column, index } = this.props;
    onChange(index, { ...column, name: target.value });
  };

  render() {
    const { column, readOnly } = this.props;
    const readonly = column.isAnswer || readOnly;
    return (
      <T.HeaderCell className={styles.var}>
        {readonly && column.name}
        {!readonly && (
          <input
            type="text"
            value={column.name}
            required
            placeholder="variable name"
            className={cn(styles.input, styles.inputVar)}
            onChange={this.handleChange}
          />
        )}
      </T.HeaderCell>
    );
  }
}
