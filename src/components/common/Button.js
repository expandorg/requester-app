import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Button.module.styl';

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    theme: PropTypes.string,
    forwardedRef: PropTypes.object, // eslint-disable-line
  };

  static defaultProps = {
    className: null,
    forwardedRef: undefined,
    type: 'button',
    theme: null,
  };

  render() {
    const {
      children,
      type,
      className,
      theme,
      forwardedRef,
      ...rest
    } = this.props;
    const classes = cn(styles.button, styles[theme], className);

    return (
      <button type={type} className={classes} {...rest} ref={forwardedRef}>
        {children}
      </button>
    );
  }
}

/* eslint-disable */
export default forwardRef((props, ref) => (
  <Button {...props} forwardedRef={ref} />
));
