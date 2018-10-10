import React, { Component } from 'react';

import styles from './styles.module.styl';

export default class Submit extends Component {
  render() {
    const { children, ...rest } = this.props;
    return (
      <button className={styles.submit} {...rest}>
        {children}
      </button>
    );
  }
}
