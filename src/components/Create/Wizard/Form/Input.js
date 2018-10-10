import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.styl';

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
    const { onChange, className, value, forwardedRef, ...rest } = this.props;
    return (
      <input
        className={cn(styles.input, className)}
        value={value}
        onChange={onChange}
        ref={forwardedRef}
        {...rest}
      />
    );
  }
}

export default forwardRef((props, ref) => (
  <Input {...props} forwardedRef={ref} />
));
