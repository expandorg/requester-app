import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../assets/logo.svg';

import styles from './Navbar.module.styl';

export default class Navbar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    top: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    top: true,
  };

  render() {
    const { children, title, top, className } = this.props;
    return (
      <div className={cn(styles.header, { [styles.top]: top }, className)}>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.nav}>{children}</div>
      </div>
    );
  }
}
