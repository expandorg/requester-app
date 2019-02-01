import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Cell } from '../../../../../../common/Table';

import styles from './Data.module.styl';

export default class Value extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    column: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = ({ target }) => {
    const { onChange, column } = this.props;
    onChange(column, target.value);
  };

  render() {
    const { value } = this.props;
    return <Cell className={styles.val}>{value}</Cell>;
  }
}
