import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Checkmark } from '../../../assets/checkmark.svg';

import styles from './Navigation.module.styl';

export default class NavItem extends Component {
  static propTypes = {
    active: PropTypes.bool,
    done: PropTypes.bool,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    active: false,
    done: false,
    onClick: Function.prototype,
  };

  render() {
    const { children, onClick, active, done, ...rest } = this.props;

    const classes = cn(styles.item, {
      [styles.active]: active,
      [styles.done]: done,
    });

    return (
      <button className={classes} onClick={onClick} {...rest}>
        {children}
        {done && <Checkmark className={styles.checkmark} />}
      </button>
    );
  }
}
