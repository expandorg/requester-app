import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../assets/logo.svg';

import styles from './Header.module.styl';

export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    logo: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    logo: false,
  };

  render() {
    const { children, title, logo, className } = this.props;
    return (
      <div
        className={cn(styles.header, className, { [styles.withLogo]: logo })}
      >
        {logo && (
          <Link to="/" className={styles.logo}>
            <Logo />
          </Link>
        )}
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.nav}>{children}</div>
      </div>
    );
  }
}
