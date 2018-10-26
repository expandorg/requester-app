import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Watch from './Watch';

import styles from './TimePicker.module.styl';

export default class TimePicker extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  state = {
    am: false,
    time: 0,
  };

  handleChange = value => {
    const { onChange } = this.props;
    onChange(value);
  };

  handleChangeTime = time => {
    this.setState({ time });
  };

  handleToggle = evt => {
    const am = evt.target.dataset.val === 'am';
    const { am: current } = this.state;
    if (current !== am) {
      this.setState({ am });
    }
  };

  render() {
    const { time, am } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.value}>{`${time}:00 ${am ? 'AM' : 'PM'}`}</div>
        </div>
        <div className={styles.content}>
          <Watch time={time} onChange={this.handleChangeTime} />
        </div>
        <div className={styles.ampm}>
          <button
            type="button"
            className={cn(styles.btn, { [styles.selected]: am })}
            data-val="am"
            onClick={this.handleToggle}
          >
            AM
          </button>
          <button
            type="button"
            className={cn(styles.btn, { [styles.selected]: !am })}
            data-val="pm"
            onClick={this.handleToggle}
          >
            PM
          </button>
        </div>
      </div>
    );
  }
}
