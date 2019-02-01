import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { HeaderCell } from '../../../../../../common/Table';

import styles from './Data.module.styl';

export default class Variable extends Component {
  static propTypes = {
    column: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = ({ target }) => {
    const { onChange, index } = this.props;
    onChange(index, target.value);
  };

  render() {
    const { column } = this.props;
    return <HeaderCell className={styles.var}>{column}</HeaderCell>;
  }
}
