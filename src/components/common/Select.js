import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { Dropdown } from '@gemsorg/components';

import styles from './Select.module.styl';

export default class Select extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { className, children, ...rest } = this.props;

    const classes = cn(styles.dropdown, className);

    return (
      <Dropdown className={classes} {...rest}>
        {children}
      </Dropdown>
    );
  }
}
