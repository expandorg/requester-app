import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Tooltip } from '@gemsorg/components';
import { moduleProps, Module } from '@gemsorg/modules';

import { ReactComponent as EditIcon } from '../../../../assets/edit.svg';

import styles from './styles.module.styl';

const EditButton = Tooltip(({ children, ...rest }) => (
  <button className={styles.edit} {...rest}>
    {children}
  </button>
));

export default class ModuleEdit extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    className: PropTypes.string,
    onEdit: PropTypes.func,
  };

  static defaultProps = {
    className: null,
    onEdit: Function.prototype,
  };

  handleEditClick = evt => {
    const { onEdit, module } = this.props;
    onEdit(module);

    evt.preventDefault();
  };

  render() {
    const { module, className, controls } = this.props;
    return (
      <div className={cn(styles.container, className)}>
        <Module module={module} isSubmitting={false} controls={controls} />
        <EditButton onClick={this.handleEditClick} tooltip="Edit">
          <EditIcon />
        </EditButton>
      </div>
    );
  }
}
