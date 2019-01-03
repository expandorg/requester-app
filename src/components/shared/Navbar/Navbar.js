import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import Logout from './Logout';

import styles from './Navbar.module.styl';

export default class Navbar extends Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    className: PropTypes.string,
    top: PropTypes.bool,
    logout: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    title: '',
    top: true,
    logout: true,
  };

  render() {
    const { children, title, top, logout, className } = this.props;
    return (
      <div className={cn(styles.header, { [styles.top]: top }, className)}>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.nav}>{children}</div>
        {logout && <Logout />}
      </div>
    );
  }
}
