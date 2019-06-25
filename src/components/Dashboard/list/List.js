import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './List.module.styl';

export default class List extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { className, children } = this.props;
    return <div className={cn(styles.list, className)}>{children}</div>;
  }
}
