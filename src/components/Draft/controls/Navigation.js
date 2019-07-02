import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

export default class Navigation extends Component {
  static propTypes = {
    active: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    active: null,
    onChange: Function.prototype,
  };

  render() {
    const { children, active, onChange } = this.props;
    return (
      <>
        {Children.map(children, (item, index) =>
          cloneElement(item, {
            active: active === index,
            onClick: () => onChange(index),
          })
        )}
      </>
    );
  }
}
