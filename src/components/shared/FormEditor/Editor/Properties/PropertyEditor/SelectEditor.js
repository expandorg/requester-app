import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Dropdown } from '@expandorg/components';

import styles from './styles.module.styl';

export default class SelectEditor extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    formatter: PropTypes.func,
  };

  static defaultProps = {
    value: undefined,
    options: [],
    label: null,
    formatter: undefined,
  };

  handleChange = value => {
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { value, options, label, formatter } = this.props;
    return (
      <Dropdown
        options={options}
        value={value}
        onChange={this.handleChange}
        className={styles.dropdown}
        formatter={formatter}
      >
        {({ formatted }) => (
          <div className={cn(styles.select, { [styles.selectVal]: formatted })}>
            {label && <div className={styles.selectLabel}>{label}</div>}
            {formatted}
          </div>
        )}
      </Dropdown>
    );
  }
}
