import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { Dropdown } from '@gemsorg/components';

import styles from './Select.module.styl';

export default class Select extends Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    ),
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    className: null,
    options: [],
    label: null,
  };

  handleChange = value => {
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { className, options, value, label } = this.props;
    return (
      <Dropdown
        options={options}
        value={value}
        onChange={this.handleChange}
        className={cn(styles.dropdown, className)}
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
