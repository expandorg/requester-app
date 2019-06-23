import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ContextMenu, ContextMenuItem } from '../../common/ContextMenu';

import styles from './JobItemMenu.module.styl';

export default class JobItemMenu extends Component {
  static propTypes = {
    canCopy: PropTypes.bool,
    canDelete: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  static defaultProps = {
    canDelete: true,
    canCopy: true,
  };

  handleCopy = evt => {
    const { onCopy, onHide, canCopy } = this.props;
    if (canCopy) {
      onHide();
      onCopy();
    }
    evt.preventDefault();
  };

  handleClickOutside = () => {
    const { onHide } = this.props;
    onHide();
  };

  handleDelete = evt => {
    const { onDelete, onHide, canDelete } = this.props;
    if (canDelete) {
      onHide();
      onDelete();
    }
    evt.preventDefault();
  };

  render() {
    const { canDelete, canCopy, onHide } = this.props;

    return (
      <ContextMenu onHide={onHide}>
        <ContextMenuItem
          onClick={this.handleCopy}
          className={cn(styles.button, { [styles.disabled]: !canCopy })}
          disabled={!canCopy}
        >
          Duplicate Job
        </ContextMenuItem>
        <ContextMenuItem
          onClick={this.handleDelete}
          className={cn(styles.button, { [styles.disabled]: !canDelete })}
          disabled={!canDelete}
        >
          Delete
        </ContextMenuItem>
      </ContextMenu>
    );
  }
}
