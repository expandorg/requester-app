import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Switch from '../../../common/Switch';

import styles from './Toggle.module.styl';

export default class Toggle extends Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: false,
    className: null,
    name: undefined,
  };

  render() {
    const { label, name, ...rest } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.label}>{label}</div>
        <Switch name={name} {...rest} />
      </div>
    );
  }
}
