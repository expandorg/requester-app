import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Table as T, Switch } from '@expandorg/components';

import { columnTypes } from '../../../../../../../../model/onboardingData';

import styles from './Value.module.styl';

export default class Value extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]).isRequired,
    type: PropTypes.oneOf(columnTypes),
    placeholder: PropTypes.string.isRequired,
    columnIndex: PropTypes.number,
    answer: PropTypes.bool,
    readOnly: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    type: 'text',
    columnIndex: null,
    answer: false,
  };

  handleChange = value => {
    const { onChange, type, columnIndex } = this.props;
    let adjusted = value;
    if (type === 'number') {
      adjusted = Number.isNaN(+value) ? '0' : value;
    }
    if (type === 'bool') {
      adjusted = value ? 'true' : '';
    }
    onChange(columnIndex, adjusted);
  };

  render() {
    const { value, readOnly, type, placeholder, answer } = this.props;

    return (
      <T.Cell className={cn(styles.cell, { [styles.answer]: answer })}>
        {readOnly && <span className={styles.value}>{value}</span>}
        {!readOnly && type !== 'bool' && (
          <input
            type={type}
            value={value}
            required
            placeholder={placeholder}
            className={styles.input}
            onChange={({ target }) => this.handleChange(target.value)}
          />
        )}
        {!readOnly && type === 'bool' && (
          <Switch
            value={!!value}
            className={styles.switch}
            onChange={this.handleChange}
          />
        )}
      </T.Cell>
    );
  }
}
