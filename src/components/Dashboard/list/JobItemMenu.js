import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { clickOutside } from '@expandorg/components';

import styles from './JobItemMenu.module.styl';

class JobItemMenu extends Component {
  static propTypes = {
    canCopy: PropTypes.bool,
    canDelete: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    forwardedRef: PropTypes.object.isRequired, //eslint-disable-line
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
    const { canDelete, canCopy, forwardedRef } = this.props;

    return (
      <div className={styles.container} ref={forwardedRef}>
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
          Delete
        </button>
      </div>
    );
  }
}

export default clickOutside(JobItemMenu);
