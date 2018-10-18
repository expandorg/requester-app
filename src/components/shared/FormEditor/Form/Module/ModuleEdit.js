import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps, Module } from '@gemsorg/modules';

import styles from './ModuleEdit.module.styl';

export default class ModuleEdit extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    className: PropTypes.string,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: null,
  };

  handleEditClick = evt => {
    const { onEdit, module } = this.props;
    onEdit(module);

    evt.preventDefault();
  };

  handleRemoveClick = evt => {
    const { onRemove, module } = this.props;
    onRemove(module.name);

    evt.preventDefault();
  };

  render() {
    const { module, className, controls } = this.props;

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */

    return (
      <div className={cn(styles.container, className)}>
        <Module module={module} isSubmitting={false} controls={controls} />
        <div className={styles.edit} onClick={this.handleEditClick} />
      </div>
    );
  }
}
