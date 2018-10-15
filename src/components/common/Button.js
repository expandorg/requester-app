import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Button.module.styl';

export default class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    theme: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    theme: null,
  };

  render() {
    const { children, className, theme, ...rest } = this.props;
    return (
      <button className={cn(styles.button, styles[theme], className)} {...rest}>
        {children}
      </button>
    );
  }
}
