import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { HeaderCell } from '../../../../../../common/Table';

import styles from './DataTable.module.styl';

export default class Variable extends Component {
  static propTypes = {
    column: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    readOnly: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = ({ target }) => {
    const { onChange, index } = this.props;
    onChange(index, target.value);
  };

  render() {
    const { column, readOnly } = this.props;
    return (
      <HeaderCell className={styles.var}>
        {readOnly && column}
        {!readOnly && (
          <input
            type="text"
            value={column}
            className={cn(styles.input, styles.inputVar)}
            onChange={this.handleChange}
          />
        )}
      </HeaderCell>
    );
  }
}
