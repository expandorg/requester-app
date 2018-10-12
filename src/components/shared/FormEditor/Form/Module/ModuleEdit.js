import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps } from '@gemsorg/modules';

import styles from './styles.module.styl';

export default class ModuleEdit extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { module, className } = this.props;
    return <div className={cn(styles.container, className)}>{module.name}</div>;
  }
}
