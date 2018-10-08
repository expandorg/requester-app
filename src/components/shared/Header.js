import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Header.module.styl';

export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { children, title, className } = this.props;
    return (
      <div className={cn(styles.header, className)}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.nav}>{children}</div>
      </div>
    );
  }
}
