import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Table.module.styl';

export default class HeaderCell extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { children, className } = this.props;

    return <th className={cn(styles.headerCell, className)}>{children}</th>;
  }
}
