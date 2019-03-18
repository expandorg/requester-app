import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Table as T, Switch } from '@expandorg/components';

import { columnTypes } from '../../../../../../../model/onboardingData';

import styles from './Value.module.styl';

export default class Value extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]).isRequired,
    type: PropTypes.oneOf(columnTypes),
    columnIndex: PropTypes.number,
    readOnly: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    type: 'text',
    columnIndex: null,
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
    const { value, readOnly, type } = this.props;
    if (value === null) {
      debugger; // eslint-disable-line
    }

    return (
      <T.Cell className={styles.cell}>
        {readOnly && <span className={styles.value}>{value}</span>}
        {!readOnly && type !== 'bool' && (
          <input
            type={type}
            value={value}
            required
            placeholder="value..."
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
