import React, { Component } from 'react';

import styles from './styles.module.styl';

export default class ActionBtn extends Component {
  render() {
    const { children, ...rest } = this.props;
    return (
      <button className={styles.actionBtn} {...rest}>
        {children}
      </button>
    );
  }
}
