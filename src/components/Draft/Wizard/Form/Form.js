import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.styl';

export default class Form extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    onSubmit: Function.prototype,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { onSubmit } = this.props;
    onSubmit();
  };

  render() {
    const { children, className } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className={cn(styles.form, className)}>
        {children}
      </form>
    );
  }
}
