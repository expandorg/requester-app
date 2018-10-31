import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../../../../../common/Checkbox';

import styles from './styles.module.styl';

export default class BoolEditor extends Component {
  static propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    label: undefined,
  };

  render() {
    const { value, label, onChange } = this.props;
    console.log(this.props);

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
