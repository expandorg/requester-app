import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { StatusIcon } from '../Form';

import styles from './Navigation.module.styl';

export default class NavItem extends Component {
  static propTypes = {
    active: PropTypes.bool,
    status: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    active: false,
    status: null,
    onClick: Function.prototype,
  };

  render() {
    const { children, onClick, active, status, ...rest } = this.props;

    const classes = cn(styles.item, {
      [styles.active]: active,
    });

    return (
      <button className={classes} onClick={onClick} {...rest}>
        {children}
        <StatusIcon className={styles.status} status={status} />
      </button>
    );
  }
}
