import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { clickOutside, Button } from '@expandorg/components';

import styles from './styles.module.styl';

class Menu extends Component {
  timeoutId = null;

  static propTypes = {
    forwardedRef: PropTypes.object.isRequired, // eslint-disable-line
    onPublish: PropTypes.func.isRequired,
    onSchedule: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }
  }

  handleClickOutside = () => {
    this.timeoutId = setTimeout(() => {
      this.timeoutId = null;
      const { onToggle } = this.props;
      onToggle();
    });
  };

  render() {
    const { forwardedRef, onPublish, onSchedule } = this.props;

    return (
      <div className={styles.menu} ref={forwardedRef}>
        <Button className={styles.menuItem} onClick={onSchedule} role="button">
          schedule
        </Button>
        <Button className={styles.menuItem} onClick={onPublish} role="button">
          Publish now
        </Button>
      </div>
    );
  }
}

export default clickOutside(Menu);
