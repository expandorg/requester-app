import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Cell } from '../../../../../../common/Table';

import styles from './DataTable.module.styl';

export default class Value extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    column: PropTypes.number.isRequired,
    readOnly: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = ({ target }) => {
    const { onChange, column } = this.props;
    onChange(column, target.value);
  };

  render() {
    const { value, readOnly } = this.props;
    return (
      <Cell className={styles.val}>
        {readOnly && value}
        {!readOnly && (
          <input
            type="text"
            value={value}
            className={cn(styles.input, styles.inputVal)}
            onChange={this.handleChange}
          />
        )}
      </Cell>
    );
  }
}
