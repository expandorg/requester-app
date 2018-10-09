import React, { Component } from 'react';

import styles from './Navigation.module.styl';

export default class Navigation extends Component {
  render() {
    const { children } = this.props;
    return <div className={styles.container}>{children}</div>;
  }
}
