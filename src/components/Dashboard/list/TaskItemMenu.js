import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './TaskItemMenu.module.styl';

export default class TaskItemMenu extends Component {
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

  handleDelete = evt => {
    const { onDelete, onHide, canDelete } = this.props;
    if (canDelete) {
      onHide();
      onDelete();
    }
    evt.preventDefault();
  };

  render() {
    const { canDelete, canCopy } = this.props;

    return (
      <div className={styles.container}>
        <button
          onClick={this.handleCopy}
          className={cn(styles.button, { [styles.disabled]: !canCopy })}
          disabled={!canCopy}
        >
          Duplicate Job
        </button>
        <button
          onClick={this.handleDelete}
          className={cn(styles.button, { [styles.disabled]: !canDelete })}
          disabled={!canDelete}
        >
          Remove Job
        </button>
      </div>
    );
  }
}
