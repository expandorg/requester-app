import React, { Component } from 'react';

import { connect } from 'react-redux';

import Notification from './Notification';

import { notificationSelector } from '../../../selectors/uiStateSelectors';

import { notificationProps } from '../propTypes';

import styles from './Notifications.module.styl';

const mapStateToProps = state => ({
  notification: notificationSelector(state),
});

class Notifications extends Component {
  static propTypes = {
    notification: notificationProps,
  };

  static defaultProps = {
    notification: null,
  };

  render() {
    const { notification } = this.props;
    if (!notification) {
      return null;
    }
    return (
      <div className={styles.container}>
        <Notification notification={notification} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Notifications);
