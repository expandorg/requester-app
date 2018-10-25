import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { clickOutside } from '@gemsorg/components/hoc';

import Button from '../../../../common/Button';

import styles from './Menu.module.styl';

class Menu extends Component {
  static propTypes = {
    forwardedRef: PropTypes.object.isRequired, // eslint-disable-line
    onPublish: PropTypes.func.isRequired,
    onSchedule: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  timeoutId = null;

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
        <Button className={styles.menuItem} onClick={onSchedule}>
          schedule
        </Button>
        <Button className={styles.menuItem} onClick={onPublish}>
          Publish now
        </Button>
      </div>
    );
  }
}

export default clickOutside(Menu);
