import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import styles from './Portal.module.styl';

export default class Portal extends Component {
  portal = document.getElementById('portal');
  el = document.createElement('div');

  componentDidMount() {
    this.portal.appendChild(this.el);
  }

  componentWillUnmount() {
    this.portal.removeChild(this.el);
  }

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={styles.portal}>{children}</div>,
      this.el
    );
  }
}
