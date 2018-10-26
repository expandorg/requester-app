import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './TimePicker.module.styl';

export default class TimePicker extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  handleChange = value => {
    const { onChange } = this.props;
    onChange(value);
  };

  handleToggle = () => {};

  render() {
    const am = true;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.value}>12:00</div>
        </div>
        <div className={styles.content}>
          <div className={styles.watch} />
        </div>
        <div className={styles.ampm}>
          <button
            className={cn(styles.btn, { [styles.selected]: am })}
            onClick={this.handleToggle}
          >
            AM
          </button>
          <button
            className={cn(styles.btn, { [styles.selected]: !am })}
            onClick={this.handleToggle}
          >
            PM
          </button>
        </div>
      </div>
    );
  }
}
