import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { NavLink } from 'react-router-dom';

import { links } from '../../model/dashboard';

import styles from './Navigation.module.styl';

export default class Navigation extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { className } = this.props;

    return (
      <div className={cn(styles.nav, className)}>
        {links.map(({ href, text }) => (
          <NavLink
            key={href}
            className={styles.link}
            activeClassName={styles.active}
            exact
            to={href}
          >
            {text}
          </NavLink>
        ))}
      </div>
    );
  }
}
