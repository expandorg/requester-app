import React, { Component } from 'react';
import cn from 'classnames';

import { notificationProps } from '../propTypes';

import styles from './Notification.module.styl';

export default class Notification extends Component {
  static propTypes = {
    notification: notificationProps.isRequired,
  };

  render() {
    const { notification } = this.props;
    return (
      <div className={cn(styles.container, styles[notification.type])}>
        <div className={styles.message}>{notification.message}</div>
      </div>
    );
  }
}
