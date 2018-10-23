import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Column.module.styl';

export default class Column extends Component {
  static propTypes = {
    column: PropTypes.object.isRequired, // eslint-disable-line
  };

  render() {
    return <div className={styles.container} />;
  }
}
