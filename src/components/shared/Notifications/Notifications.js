import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Transition, animated } from 'react-spring';

import Notification from './Notification';

import { notificationSelector } from '../../../selectors/uiStateSelectors';
import { notificationProps } from '../propTypes';

import styles from './Notifications.module.styl';

const from = { right: -200, opacity: 0 };
const enter = { right: 25, opacity: 1 };
const leave = { right: -200, pointerEvents: 'none', opacity: 0 };

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
    return (
      <Transition from={from} enter={enter} leave={leave}>
        {notification &&
          (style => (
            <animated.div style={style} className={styles.container}>
              <Notification notification={notification} />
            </animated.div>
          ))}
      </Transition>
    );
  }
}

export default connect(mapStateToProps)(Notifications);
