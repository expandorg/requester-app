import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps, Module } from '@gemsorg/modules';

import styles from './styles.module.styl';

export default class ModuleEdit extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { module, className, controls } = this.props;
    return (
      <div className={cn(styles.container, className)}>
        <Module module={module} isSubmitting={false} controls={controls} />
      </div>
    );
  }
}
