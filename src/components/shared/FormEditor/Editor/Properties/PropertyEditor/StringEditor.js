import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DraftTextInput from '../../../../../common/DraftTextEditor/DraftTextInput';

import styles from './styles.module.styl';

export default class StringEditor extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    placeholder: undefined,
  };

  handleChange = value => {
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { value, placeholder } = this.props;

    return (
      <DraftTextInput
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }
}
