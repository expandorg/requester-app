import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Input.module.styl';

class Input extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    error: PropTypes.bool, // eslint-disable-line
    forwardedRef: PropTypes.object, // eslint-disable-line
  };

  static defaultProps = {
    value: undefined,
    forwardedRef: undefined,
    onChange: undefined,
    className: null,
    error: false,
  };

  render() {
    const {
      onChange,
      className,
      value,
      error,
      placeholder,
      forwardedRef,
      ...rest
    } = this.props;

    const classes = cn(styles.container, className, {
      [styles.error]: error,
    });
    /* eslint-disable jsx-a11y/label-has-associated-control */
    /* eslint-disable jsx-a11y/label-has-for */

    return (
      <div className={classes}>
        <input
          className={cn(styles.input, { [styles.filled]: !!value })}
          value={value}
          onChange={onChange}
          ref={forwardedRef}
          {...rest}
        />
        {placeholder && (
          <label className={styles.label} placeholder={placeholder} />
        )}
      </div>
    );
  }
}

export default forwardRef((props, ref) => (
  <Input {...props} forwardedRef={ref} />
));
