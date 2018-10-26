import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import DayPicker, { DateUtils } from 'react-day-picker';

import format from 'date-fns/format';
import parse from 'date-fns/parse';

import TimePicker from './TimePicker';

import styles from './DateTimePicker.module.styl';

const parseDate = (str, fmt, locale) => {
  const parsed = parse(str, fmt, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
};

const formatDate = (date, fmt, locale) => format(date, fmt, { locale });

export default class DateTimePicker extends Component {
  static propTypes = {
    value: PropTypes.any, // eslint-disable-line
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
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
    const { onChange } = this.props;
    const { value } = this.state;

    onChange(value);

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
            <DayPicker
              selectedDays={value}
              formatDate={formatDate}
              format="MM/DD/YYYY"
              parseDate={parseDate}
              onDayClick={this.handleChange}
            />
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
