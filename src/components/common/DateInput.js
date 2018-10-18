import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';

import format from 'date-fns/format';
import parse from 'date-fns/parse';

import './DateInput.styl';

const parseDate = (str, fmt, locale) => {
  const parsed = parse(str, fmt, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
};

const formatDate = (date, fmt, locale) => format(date, fmt, { locale });

export default class DateInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    placeholder: null,
  };

  render() {
    const { onChange, name, placeholder, value } = this.props;
    return (
      <DayPickerInput
        value={value}
        placeholder={placeholder}
        formatDate={formatDate}
        format="MM/DD/YYYY"
        parseDate={parseDate}
        onDayChange={date => onChange({ target: { name, value: date } })}
      />
    );
  }
}