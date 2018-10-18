import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Input.module.styl';

class Input extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    forwardedRef: PropTypes.object, // eslint-disable-line
  };

  static defaultProps = {
    value: undefined,
    forwardedRef: undefined,
    onChange: undefined,
    className: null,
  };

  render() {
    const {
      onChange,
      className,
      value,
      placeholder,
      forwardedRef,
      ...rest
    } = this.props;

    /* eslint-disable jsx-a11y/label-has-associated-control */
    /* eslint-disable jsx-a11y/label-has-for */

    return (
      <div className={cn(styles.container, className)}>
        <input
          className={styles.input}
          value={value}
          onChange={onChange}
          ref={forwardedRef}
          required
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
