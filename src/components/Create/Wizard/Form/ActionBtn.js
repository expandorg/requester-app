import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.styl';

export default class ActionBtn extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { children, className, ...rest } = this.props;
    return (
      <button className={cn(styles.actionBtn, className)} {...rest}>
        {children}
      </button>
    );
  }
}
