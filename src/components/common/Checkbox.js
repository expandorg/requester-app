import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Checkbox.module.styl';

export default class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: null,
    value: false,
    label: '',
  };

  handleChange = () => {
    const { onChange, value } = this.props;
    onChange(!value);
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
