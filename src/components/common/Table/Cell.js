import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Table.module.styl';

export default class Header extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { children, className, ...rest } = this.props;

    return (
      <tr className={cn(styles.cell, className)} {...rest}>
        {children}
      </tr>
    );
  }
}
