import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Checkbox.module.styl';

export default class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: null,
    value: false,
    name: undefined,
    label: '',
  };

  handleChange = () => {
    const { onChange, value, name } = this.props;
    onChange(!value, name);
  };

  render() {
    const { label, value, className } = this.props;

    /* eslint-disable jsx-a11y/label-has-associated-control */
    /* eslint-disable jsx-a11y/label-has-for */

    return (
      <label className={cn(styles.checkbox, className)}>
        <input
          type="checkbox"
          className={styles.input}
          checked={value}
          onChange={this.handleChange}
        />
        <span className={styles.mark} />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    );
  }
}
