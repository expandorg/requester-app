import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import DayPicker from 'react-day-picker';

import TimePicker from './TimePicker';

import styles from './DateTimePicker.module.styl';

export default class DateTimePicker extends Component {
  static propTypes = {
    className: PropTypes.string,
    onDone: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: null,
  };

  state = {
    value: undefined,
  };

  handleChange = value => {
    this.setState({ value });
  };

  handleDone = evt => {
    const { onDone } = this.props;
    const { value } = this.state;
    if (value) {
      onDone(value);
    }
    evt.preventDefault();
  };

  handleCancel = evt => {
    const { onHide } = this.props;
    onHide();

    evt.preventDefault();
  };

  render() {
    const { className } = this.props;
    const { value } = this.state;

    return (
      <div className={cn(styles.container, className)}>
        <div className={styles.content}>
          <div className={styles.date}>
            <DayPicker selectedDays={value} onDayClick={this.handleChange} />
          </div>
          <div className={styles.time}>
            <TimePicker value={value} onChange={this.handleChange} />
          </div>
        </div>
        <div className={styles.actions}>
          <button
            className={cn(styles.button, styles.cancel)}
            onClick={this.handleCancel}
          >
            cancel
          </button>
          <button className={styles.button} onClick={this.handleDone}>
            done
          </button>
        </div>
      </div>
    );
  }
}
