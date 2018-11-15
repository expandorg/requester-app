import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Transition, animated } from 'react-spring';

import Notification from './Notification';

import { clearNotification } from '../../../sagas/notificationsSagas';
import { notificationSelector } from '../../../selectors/uiStateSelectors';
import { notificationProps } from '../propTypes';

import styles from './Notifications.module.styl';

const from = { right: -200, opacity: 0 };
const enter = { right: 25, opacity: 1 };
const leave = { right: -200, pointerEvents: 'none', opacity: 0 };

const mapStateToProps = state => ({
  notification: notificationSelector(state),
});

const mapdDispatchToProps = dispatch =>
  bindActionCreators({ clearNotification }, dispatch);

class Notifications extends Component {
  static propTypes = {
    notification: notificationProps,
    clearNotification: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notification: null,
  };

  render() {
    const { notification } = this.props;
    return (
      <Transition items={notification} from={from} enter={enter} leave={leave}>
        {n =>
          n &&
          (style => (
            <animated.div style={style} className={styles.container}>
              <Notification
                notification={notification}
                onClear={this.props.clearNotification}
              />
            </animated.div>
          ))
        }
      </Transition>
    );
  }
}

export default connect(
  mapStateToProps,
  mapdDispatchToProps
)(Notifications);
