import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Button.module.styl';

export default class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    theme: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    type: 'button',
    theme: null,
  };

  render() {
    const { children, type, className, theme, ...rest } = this.props;
    const classes = cn(styles.button, styles[theme], className);

    return (
      <button type={type} className={classes} {...rest}>
        {children}
      </button>
    );
  }
}
