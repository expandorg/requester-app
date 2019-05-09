import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from '@expandorg/components';

import styles from './styles.module.styl';

export default class BoolEditor extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    label: undefined,
  };

  render() {
    const { value, label, onChange } = this.props;
    return (
      <Checkbox
        className={styles.checkbox}
        value={value}
        label={label}
        onChange={onChange}
      />
    );
  }
}
