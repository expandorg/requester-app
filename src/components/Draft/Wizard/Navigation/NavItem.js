import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { StatusIcon } from '../Form';

import styles from './Navigation.module.styl';

export default class NavItem extends Component {
  static propTypes = {
    active: PropTypes.bool,
    status: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    active: false,
    disabled: false,
    status: null,
    onClick: Function.prototype,
  };

  handleClick = evt => {
    const { onClick, disabled } = this.props;
    if (!disabled) {
      onClick(evt);
    }
  };

  render() {
    const {
      children,
      onClick: _,
      active,
      status,
      disabled,
      ...rest
    } = this.props;

    const classes = cn(styles.item, {
      [styles.active]: active,
      [styles.disabled]: disabled,
    });

    return (
      <button className={classes} onClick={this.handleClick} {...rest}>
        {children}
        <StatusIcon className={styles.status} status={status} />
      </button>
    );
  }
}
