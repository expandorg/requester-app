import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Dropdown } from '@gemsorg/components';

import styles from './styles.module.styl';

export default class SelectEditor extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    options: [],
    label: null,
  };

  handleChange = value => {
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { value, options, label } = this.props;
    console.log(label);
    return (
      <Dropdown
        options={options}
        value={value}
        onChange={this.handleChange}
        className={styles.dropdown}
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
