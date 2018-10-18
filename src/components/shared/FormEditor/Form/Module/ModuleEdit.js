import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps, Module } from '@gemsorg/modules';

import { ReactComponent as X } from '../../../../assets/x.svg';

import styles from './ModuleEdit.module.styl';

export default class ModuleEdit extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    dimmed: PropTypes.bool.isRequired,
    className: PropTypes.string,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onPreview: PropTypes.func.isRequired,
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
    const { module, className, onPreview, dimmed, controls } = this.props;

    const classes = cn(
      styles.container,
      { [styles.dimmed]: dimmed },
      className
    );

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */

    return (
      <div className={styles.outer}>
        {onPreview(
          <div className={classes}>
            <Module module={module} isSubmitting={false} controls={controls} />
            <div className={styles.edit} onClick={this.handleEditClick} />
          </div>
        )}
        <button className={styles.remove} onClick={this.handleRemoveClick}>
          <X />
        </button>
      </div>
    );
  }
}
