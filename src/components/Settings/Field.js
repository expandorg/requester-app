import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as EditIcon } from '../assets/edit-2.svg';

import styles from './Field.module.styl';

export default class Field extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.any, //  eslint-disable-line react/forbid-prop-types
    placeholder: PropTypes.string,
    onToggle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: null,
    placeholder: null,
  };

  render() {
    const { title, onToggle, value, placeholder } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.field}>
          <div className={styles.title}>{title}</div>
          <div className={styles.value}>{value || placeholder}</div>
        </div>
        <button className={styles.edit} onClick={onToggle}>
          <EditIcon />
        </button>
      </div>
    );
  }
}
