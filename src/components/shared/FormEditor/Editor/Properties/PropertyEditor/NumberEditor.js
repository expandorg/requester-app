import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../../../../../common/Input';

import styles from './styles.module.styl';

export default class NumberEditor extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    placeholder: undefined,
  };

  handleChange = ({ target }) => {
    const { onChange } = this.props;
    onChange(target.value);
  };

  render() {
    const { value, placeholder } = this.props;

    return (
      <Input
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }
}
